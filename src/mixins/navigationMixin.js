import {
  SETTINGS_PAGE_ROUTE,
  WIDGET_PAGE_ROUTE,
  POSITIVE_REINFORCEMENT_PAGE_ROUTE,
} from '../router/routes';

const navigationMixin = {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
    goToLanding() {
      this.$router.push('/');
    },
    goToPositiveReinforcement() {
      this.$router.push(POSITIVE_REINFORCEMENT_PAGE_ROUTE);
    },
    goToSettings() {
      this.$router.push(SETTINGS_PAGE_ROUTE);
    },
    goToWidget() {
      this.$router.push(WIDGET_PAGE_ROUTE);
    },
  },
};

export default navigationMixin;
