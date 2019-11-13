/* global __static */
import {
  app, protocol, BrowserWindow, ipcMain,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';
import * as AutoLaunch from 'auto-launch';
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SIGTERM } from 'constants';
import { RESET_STATE, UPDATE_CURRENT_TABS } from './store/action-types';
import {
  ACTIVATE,
  ALL,
  CHANGE,
  CLOSE,
  CLOSED,
  COMPLETE_DISTRACTION_MODE,
  COMPLETE_MODE,
  DID_FINISH_LOAD,
  DISTRACTION_MODE,
  MESSAGE,
  READY,
  SECOND_INSTANCE,
  WIDGET_MODE,
  WINDOW_ALL_CLOSED,
  NOTIFICATION_TRAY_ICON,
  NORMAL_TRAY_ICON,
} from './event-types';
import {
  OS_MAC,
  OS_LINUX,
  OS_WIN,
} from './os-types';
import store from './store';

const isDevelopment = process.env.NODE_ENV !== 'production';
// Change this to true load Vuex and other devtools
const enableDevtools = false;

const appLauncher = new AutoLaunch({
  name: 'Conscious.ly',
});

// eslint-disable-next-line
const urlRegexPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

const homeDir = os.homedir();
let pathToCurrentSession = homeDir;
switch (process.platform) {
  case OS_MAC:
    pathToCurrentSession = `${homeDir}/Library/Application Support/Google/Chrome/User Data/Default/Current Session`;
    break;
  case OS_LINUX:
    pathToCurrentSession = `${homeDir}/.config/google-chrome/Default/Current Session`;
    break;
  case OS_WIN:
    pathToCurrentSession = `${homeDir}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Current Session`;
    break;
  default:
}

function getOpenTabs(regexPattern, pathToCurrSession) {
  const data = fs.readFileSync(pathToCurrSession, 'utf16le');
  const openTabs = data.match(regexPattern);
  if (openTabs) {
    store.dispatch(UPDATE_CURRENT_TABS, openTabs);
  }
}

chokidar.watch(pathToCurrentSession, { usePolling: true })
  .on(ALL, (event, pathToWatch) => {
    if (event === CHANGE) {
      getOpenTabs(urlRegexPattern, pathToWatch);
    }
  });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const isQuitting = false;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    alwaysOnTop: !isDevelopment,
    acceptFirstMouse: true,
    center: true,
    darkTheme: true,
    frame: store.state.isMoveable || false,
    height: 728,
    icon: path.join(__static, 'icon.png'),
    title: 'Conscious.ly',
    useContentSize: true,
    width: 1024,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (enableDevtools) mainWindow.webContents.openDevTools({ activate: false });
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html');
    autoUpdater.checkForUpdatesAndNotify();
  }

  // Enable auto-launcher if not in development mode
  if (!isDevelopment) {
    appLauncher.enable();

    appLauncher.isEnabled()
      .then((isEnabled) => {
        if (isEnabled) {
          return;
        }
        appLauncher.enable();
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        // handle error
      });
  }

  // Prevent flash on startup when in dark-mode
  mainWindow.webContents.on(DID_FINISH_LOAD, () => {
    setTimeout(() => {
      mainWindow.show();
    }, 60);
  });

  mainWindow.on(CLOSE, (e) => {
    if (!isQuitting) {
      e.preventDefault();

      if (process.platform === OS_MAC) {
        app.hide();
      } else {
        mainWindow.hide();
      }
    }
  });

  mainWindow.on(CLOSED, () => {
    mainWindow = null;
  });

  store.dispatch(RESET_STATE);
}

// Makes it so that only a single instance of consciously can run at a time
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  // Protocol must be registered - standard electron boilerlplate
  protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

  // eslint-disable-next-line no-unused-vars
  app.on(SECOND_INSTANCE, (event, commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });

  // Quit when all windows are closed.
  app.on(WINDOW_ALL_CLOSED, () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== OS_MAC) {
      app.quit();
    }
  });

  app.on(ACTIVATE, () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on(READY, async () => {
    if (isDevelopment && enableDevtools) {
      // Install Vue Devtools
      // Devtools extensions are broken in Electron 6.0.0 and greater
      // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
      // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
      // If you are not using Windows 10 dark mode, you may uncomment these lines
      // In addition, if the linked issue is closed, you can upgrade electron and
      // uncomment these lines
      try {
        await installVueDevtools();
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString());
      }
    }
    createWindow();
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on(COMPLETE_DISTRACTION_MODE, (event, args) => {
    mainWindow.minimize();
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on(COMPLETE_MODE, (event, args) => {
    mainWindow.setSize(1024, 728, true);
    mainWindow.center();
    mainWindow.show();
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on(DISTRACTION_MODE, (event, args) => {
    mainWindow.setSize(1024, 728, true);
    mainWindow.center();
    mainWindow.show();
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on(NOTIFICATION_TRAY_ICON, (event, args) => {
    mainWindow.setIcon(path.join(__static, 'logo-red.png'));
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on(NORMAL_TRAY_ICON, (event, args) => {
    mainWindow.setIcon(path.join(__static, 'icon.png'));
  });

  // eslint-disable-next-line no-unused-vars
  ipcMain.on(WIDGET_MODE, (event, args) => {
    mainWindow.setBounds({
      x: 0, y: 0, width: 300, height: 300,
    }, true);
  });

  // Exit cleanly on request from parent process in development mode.
  if (isDevelopment) {
    if (process.platform === OS_WIN) {
      process.on(MESSAGE, (data) => {
        if (data === 'graceful-exit') {
          app.quit();
        }
      });
    } else {
      process.on(SIGTERM, () => {
        app.quit();
      });
    }
  }
}
