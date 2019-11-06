<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/isolated-layout.svg" alt="conscious.ly" />
    <h1>Settings</h1>
    &nbsp;
    <h2>Blocked Sites</h2>
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
    <div>
      <br>
    <h2>Other Settings</h2>
     <input type="checkbox" id="movableWidget" v-model="isMoveable">
     <label for="movableWidget">Movable Widget (restart required)</label>
    </div>
    <button @click="goToLanding()">Save</button>
    &nbsp;
    &nbsp;
  </div>
</template>

<script>
import { UPDATE_BLOCKED_SITES, UPDATE_IS_MOVEABLE } from '../store/action-types';
import navigationMixin from '../mixins/navigationMixin';

export default {
  name: 'SettingsView',
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
    isMoveable: {
      get() {
        return this.$store.state.isMoveable;
      },
      set(moveable) {
        this.$store.dispatch(UPDATE_IS_MOVEABLE, moveable);
      },
    },
  },
};
</script>
