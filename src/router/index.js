import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  DISTRACTION_PAGE_ROUTE,
  HELP_PAGE_ROUTE,
  POSITIVE_REINFORCEMENT_PAGE_ROUTE,
  SETTINGS_PAGE_ROUTE,
  TIME_UP_PAGE_ROUTE,
  WIDGET_PAGE_ROUTE,
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
    path: WIDGET_PAGE_ROUTE,
    name: WIDGET_PAGE_ROUTE.substring(1),
    component: () => import('@/views/Widget'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
