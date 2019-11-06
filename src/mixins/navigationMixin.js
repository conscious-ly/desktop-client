import {
  SETTINGS_PAGE_ROUTE,
  WIDGET_PAGE_ROUTE,
} from '../router/routes';

const navigationMixin = {
  methods: {
    goToLanding() {
      this.$router.push('/');
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
