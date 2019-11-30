<template>
  <div id="wrapper">
    <br>
    <br>
    <br>
    <br>
    <font-awesome-icon icon="window-restore" size="5x"/>
    <h1>Finally, select which apps will distract you</h1>
    <br>
    <h2>You can change this at any time from the settings menu</h2>
    <br>
    <div>
      <input type="checkbox" id="facebook" value="https://www.facebook.com/" v-model="blockedSites">
      <label for="facebook"> <font-awesome-icon :icon="['fab', 'facebook']" size='2x'/> </label>
      <br>
      <input type="checkbox" id="youtube" value="https://www.youtube.com/" v-model="blockedSites">
      <label for="youtube"> <font-awesome-icon :icon="['fab', 'youtube']" size='2x'/> </label>
      <br>
      <input type="checkbox" id="instagram" value="https://www.instagram.com/" v-model="blockedSites">
      <label for="instagram"><font-awesome-icon :icon="['fab', 'instagram']" size='2x'/> </label>
      <br>
      <input type="checkbox" id="reddit" value="https://www.reddit.com/" v-model="blockedSites">
      <label for="reddit"><font-awesome-icon :icon="['fab', 'reddit']" size='2x'/> </label>
      <br>
      <input type="checkbox" id="twitter" value="https://www.twitter.com/" v-model="blockedSites">
      <label for="twitter"><font-awesome-icon :icon="['fab', 'twitter']" size='2x'/> </label>
      <br>
    </div>

    <button @click="startTask()">Start</button>
  </div>
</template>

<script>
import { UPDATE_BLOCKED_SITES, COMPLETE_TUTORIAL } from '../../store/action-types';
import navigationMixin from '../../mixins/navigationMixin';

export default {
  name: 'TutorialFourView',
  mixins: [navigationMixin],
  computed: {
    blockedSites: {
      get() {
        return this.$store.state.blockedSites;
      },
      set(sites) {
        this.$store.dispatch(UPDATE_BLOCKED_SITES, sites);
      },
    },
  },
  methods: {
    startTask() {
      if (this.$store.getters.currentTaskName === 'Nothing') {
        this.w.close();
      }
      this.$store.dispatch(COMPLETE_TUTORIAL);
      this.goToWidget();
    },
  },
};

</script>
