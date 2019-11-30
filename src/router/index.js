import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  DISTRACTION_PAGE_ROUTE,
  HELP_PAGE_ROUTE,
  POSITIVE_REINFORCEMENT_PAGE_ROUTE,
  SETTINGS_PAGE_ROUTE,
  TIME_UP_PAGE_ROUTE,
  WIDGET_PAGE_ROUTE,
  TUTORIAL_PAGE_ONE_ROUTE,
  TUTORIAL_PAGE_TWO_ROUTE,
  TUTORIAL_PAGE_THREE_ROUTE,
  TUTORIAL_PAGE_FOUR_ROUTE,
} from './routes';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home-view',
    component: Home,
  },
  {
    path: DISTRACTION_PAGE_ROUTE,
    name: DISTRACTION_PAGE_ROUTE.substring(1),
    component: () => import('@/views/Distraction'),
  },
  {
    path: HELP_PAGE_ROUTE,
    name: HELP_PAGE_ROUTE.substring(1),
    component: () => import('@/views/Help'),
  },
  {
    path: POSITIVE_REINFORCEMENT_PAGE_ROUTE,
    name: POSITIVE_REINFORCEMENT_PAGE_ROUTE.substring(1),
    component: () => import('@/views/PositiveReinforcement'),
  },
  {
    path: SETTINGS_PAGE_ROUTE,
    name: SETTINGS_PAGE_ROUTE.substring(1),
    component: () => import('@/views/Settings'),
  },
  {
    path: TIME_UP_PAGE_ROUTE,
    name: TIME_UP_PAGE_ROUTE.substring(1),
    component: () => import('@/views/TimeUp'),
  },
  {
    path: TUTORIAL_PAGE_ONE_ROUTE,
    name: TUTORIAL_PAGE_ONE_ROUTE.substring(1),
    component: () => import('@/views/tutorial/TutorialOne'),
  },
  {
    path: TUTORIAL_PAGE_TWO_ROUTE,
    name: TUTORIAL_PAGE_TWO_ROUTE.substring(1),
    component: () => import('@/views/tutorial/TutorialTwo'),
  },
  {
    path: TUTORIAL_PAGE_THREE_ROUTE,
    name: TUTORIAL_PAGE_THREE_ROUTE.substring(1),
    component: () => import('@/views/tutorial/TutorialThree'),
  },
  {
    path: TUTORIAL_PAGE_FOUR_ROUTE,
    name: TUTORIAL_PAGE_FOUR_ROUTE.substring(1),
    component: () => import('@/views/tutorial/TutorialFour'),
  },
  {
    path: WIDGET_PAGE_ROUTE,
    name: WIDGET_PAGE_ROUTE.substring(1),
    component: () => import('@/views/Widget'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
