import {
  SETTINGS_PAGE_ROUTE,
  WIDGET_PAGE_ROUTE,
  POSITIVE_REINFORCEMENT_PAGE_ROUTE,
  TUTORIAL_PAGE_ONE_ROUTE,
  TUTORIAL_PAGE_TWO_ROUTE,
  TUTORIAL_PAGE_THREE_ROUTE,
  TUTORIAL_PAGE_FOUR_ROUTE,
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
    goToTutorial() {
      this.$router.push(TUTORIAL_PAGE_ONE_ROUTE);
    },
    goToWidget() {
      this.$router.push(WIDGET_PAGE_ROUTE);
    },
    nextTutorialPage() {
      const tutorialPageNumber = this.$router.history.current.fullPath.charAt(10);

      switch (tutorialPageNumber) {
        case '1':
          this.$router.push(TUTORIAL_PAGE_TWO_ROUTE);
          break;
        case '2':
          this.$router.push(TUTORIAL_PAGE_THREE_ROUTE);
          break;
        case '3':
          this.$router.push(TUTORIAL_PAGE_FOUR_ROUTE);
          break;
        default:
          break;
      }
    },
  },
};

export default navigationMixin;
