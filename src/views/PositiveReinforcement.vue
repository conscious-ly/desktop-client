<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/isolated-layout.svg" alt="conscious.ly" />
    <h1>That's some solid willpower, keep up the good work!</h1>
    <button @click="goToWidget()">I Will!</button>
  </div>
</template>

<script>
import { UPDATE_ABOUT_TO_BE_DISTRACTED } from '../store/action-types';
import navigationMixin from '../mixins/navigationMixin';

export default {
  name: 'PositiveReinforcementView',
  mixins: [navigationMixin],
  created() {
    setTimeout(() => {
      this.$store.dispatch(UPDATE_ABOUT_TO_BE_DISTRACTED, false);
      this.goToWidget();
    }, 2000);
  },
};

</script>
