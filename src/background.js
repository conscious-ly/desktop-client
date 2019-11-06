/* global __static */
import {
  app, protocol, BrowserWindow, ipcMain,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { RESET_STATE, UPDATE_CURRENT_TABS } from './store/action-types';
import {
  COMPLETE_DISTRACTION_MODE, COMPLETE_MODE, DISTRACTION_MODE, WIDGET_MODE,
} from './event-types';
import store from './store';

const isDevelopment = process.env.NODE_ENV !== 'production';

// eslint-disable-next-line
const urlRegexPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

const homeDir = os.homedir();
let pathToCurrentSession = homeDir;
switch (process.platform) {
  case 'darwin':
    pathToCurrentSession = `${homeDir}/Library/Application Support/Google/Chrome/User Data/Default/Current Session`;
    break;
  case 'linux':
    pathToCurrentSession = `${homeDir}/.config/google-chrome/Default/Current Session`;
    break;
  case 'win32':
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
  .on('all', (event, pathToWatch) => {
    if (event === 'change') {
      getOpenTabs(urlRegexPattern, pathToWatch);
    }
  });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    acceptFirstMouse: true,
    center: true,
    darkTheme: true,
    frame: store.state.isMoveable || false,
    height: 728,
    icon: path.join(__static, 'icon.png'),
    title: 'Conscious.ly',
    transparent: false,
    useContentSize: true,
    width: 1024,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html');
    autoUpdater.checkForUpdatesAndNotify();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  store.dispatch(RESET_STATE);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
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
ipcMain.on(WIDGET_MODE, (event, args) => {
  mainWindow.setBounds({
    x: 0, y: 0, width: 200, height: 200,
  }, true);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
