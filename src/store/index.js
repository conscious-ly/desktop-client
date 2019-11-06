/* global __static */
/* eslint-disable no-shadow */
import Vue from 'vue';
import Vuex from 'vuex';
import { createPersistedState, createSharedMutations } from 'vuex-electron';
import { Notification } from 'electron';
import { sleep } from '../util';
import {
  DECREMENT_TIMER,
  RESET_TASK,
  SENT_HALF_TIME_NOTIFICATION,
  SET_ABOUT_TO_BE_DISTRACTED,
  SET_ACTIVE,
  SET_BLOCKED_SITES,
  SET_DISTRACTED,
  SET_EXPECTED_TIME,
  SET_FRESH_STATE,
  SET_IS_MOVEABLE,
  SET_OPEN_TABS,
  SET_TASK,
  SET_TIME_REMAINING,
} from './mutation-types';

import {
  ENTER_DISTRACTED_MODE,
  NOTIFY_HALF_TIME,
  NOTIFY_TIME_UP,
  RESET_STATE,
  START_TIMER,
  UPDATE_ABOUT_TO_BE_DISTRACTED,
  UPDATE_BLOCKED_SITES,
  UPDATE_CURRENT_TABS,
  UPDATE_IS_MOVEABLE,
  UPDATE_TASK,
  UPDATE_TIME_REMAINING,
} from './action-types';

Vue.use(Vuex);

const state = {
  aboutToBeDistracted: false,
  active: false,
  blockedSites: [
    'https://www.facebook.com/',
    'https://www.youtube.com/',
    'https://www.instagram.com/',
  ],
  blockedApps: [],
  currentTask: {
    id: '',
    name: '',
    expectedTimeInMin: 0,
  },
  distractedMode: false,
  halfTimeNotifcationSent: false,
  isMoveable: false,
  minutesRemainingInTask: 0,
  openTabs: [],
  taskList: [
    {
      id: '1',
      name: '',
      expectedTimeInMin: 0,
    },
    {
      id: '2',
      name: 'Write an email',
      expectedTimeInMin: 0,
    },
    {
      id: '3',
      name: 'Write an essay',
      expectedTimeInMin: 0,
    },
    {
      id: '4',
      name: 'Nothing',
      expectedTimeInMin: 0,
    },
  ],
};

const getters = {
  currentTaskName: state => state.currentTask.name,
  timeLeftRatio: state => state.minutesRemainingInTask / state.currentTask.expectedTimeInMin,
};

const mutations = {
  [DECREMENT_TIMER](state) {
    state.minutesRemainingInTask -= 1;
  },
  [RESET_TASK](state) {
    state.active = false;
    state.minutesRemainingInTask = 0;
    state.task = {
      id: '',
      expectedTimeInMin: 0,
      name: '',
    };
  },
  [SET_ABOUT_TO_BE_DISTRACTED](state, isAboutToBeDistracted) {
    state.aboutToBeDistracted = isAboutToBeDistracted;
  },
  [SET_ACTIVE](state, isActive) {
    state.active = isActive;
  },
  [SET_BLOCKED_SITES](state, blockedSites) {
    state.blockedSites = blockedSites;
  },
  [SET_DISTRACTED](state, isDistracted) {
    state.distractedMode = isDistracted;
  },
  [SET_EXPECTED_TIME](state, expectedTime) {
    state.currentTask.expectedTimeInMin = expectedTime;
  },
  [SET_FRESH_STATE](state) {
    state.aboutToBeDistracted = false;
    state.active = false;
    state.currentTask = {
      id: '',
      name: '',
      expectedTimeInMin: 0,
    };
    state.distractedMode = false;
    state.halfTimeNotifcationSent = false;
    state.minutesRemainingInTask = 0;
    state.openTabs = [];
    state.taskList = [
      {
        id: '1',
        name: '',
        expectedTimeInMin: 0,
      },
      {
        id: '2',
        name: 'Write an email',
        expectedTimeInMin: 0,
      },
      {
        id: '3',
        name: 'Write an essay',
        expectedTimeInMin: 0,
      },
      {
        id: '4',
        name: 'Nothing',
        expectedTimeInMin: 0,
      },
    ];
  },
  [SET_IS_MOVEABLE](state, isMoveable) {
    state.isMoveable = isMoveable;
  },
  [SET_OPEN_TABS](state, openTabs) {
    state.openTabs = openTabs;
  },
  [SET_TASK](state, task) {
    state.currentTask = task;
  },
  [SET_TIME_REMAINING](state, timeRemaining) {
    state.minutesRemainingInTask = timeRemaining;
  },
  [SENT_HALF_TIME_NOTIFICATION](state, isSent) {
    state.halfTimeNotifcationSent = isSent;
  },
};

const actions = {
  [ENTER_DISTRACTED_MODE]({ commit }) {
    commit(SET_DISTRACTED, true);
  },
  [NOTIFY_HALF_TIME]({ state, commit }) {
    const halftimeNotification = new Notification({
      title: 'Woaaah, we\'re halfway there',
      subtitle: `${state.currentTask.name} is almost complete!`,
      body: `${state.currentTask.name} is almost complete!`,
      icon: `${__static}/icon.png`,
    });
    halftimeNotification.show();

    commit(SENT_HALF_TIME_NOTIFICATION, true);
  },
  [NOTIFY_TIME_UP]() {
    const timeUpNotification = new Notification({
      title: 'Time is up!',
      body: 'Click here to start a new task or keep working on the same one',
      icon: `${__static}/icon.png`,
    });
    timeUpNotification.show();
  },
  [RESET_STATE]({ commit }) {
    commit(SET_FRESH_STATE);
  },
  async [START_TIMER]({ commit, state }, expectedTime) {
    commit(SET_TIME_REMAINING, expectedTime);
    commit(SET_EXPECTED_TIME, expectedTime);
    commit(SET_ABOUT_TO_BE_DISTRACTED, false);
    commit(SENT_HALF_TIME_NOTIFICATION, false);
    commit(SET_ACTIVE, true);

    while (state.minutesRemainingInTask !== 0) {
      // Change the sleep-time to make the timer tick faster
      // recommended is 500 for testing, 60000 (i.e a minute) for production
      const delay = process.env.NODE_ENV !== 'development' ? 60000 : 500;
      // eslint-disable-next-line no-await-in-loop
      await sleep(delay);
      commit(DECREMENT_TIMER);
    }

    commit(SET_ACTIVE, false);
  },
  [UPDATE_ABOUT_TO_BE_DISTRACTED]({ commit }, isAboutToBeDistracted) {
    commit(SET_ABOUT_TO_BE_DISTRACTED, isAboutToBeDistracted);
  },
  [UPDATE_BLOCKED_SITES]({ commit }, sites) {
    commit(SET_BLOCKED_SITES, sites);
  },
  [UPDATE_CURRENT_TABS]({ commit, state }, allTabs) {
    const newTabs = new Set();
    allTabs.forEach((tab) => {
      if (state.blockedSites.includes(tab)
        && !state.openTabs.includes(tab)) {
        newTabs.add(tab);
        commit(SET_ABOUT_TO_BE_DISTRACTED, true);
      }
    });
    if (newTabs.size !== 0) {
      commit(SET_OPEN_TABS, Array.from(newTabs));
    }
  },
  [UPDATE_IS_MOVEABLE]({ commit }, isMoveable) {
    commit(SET_IS_MOVEABLE, isMoveable);
  },
  [UPDATE_TASK]({ commit }, task) {
    commit(SET_TASK, task);
  },
  [UPDATE_TIME_REMAINING]({ commit }, timeRemaining) {
    commit(SET_TIME_REMAINING, timeRemaining);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [
    createSharedMutations(),
    createPersistedState(),
  ],
  strict: process.env.NODE_ENV !== 'production',
});
