<template>
  <div id="wrapper">
    <img
    id="logo"
    src="~@/assets/isolated-layout.svg"
    alt="conscious.ly" />
    <h1>Time is up!</h1>
    <h2>{{ $store.state.distractedMode ?
      'You got a little sidetracked there, you\'ll get it next time!'
      : 'Good job not getting distracted!'
      }}</h2>
    <button @click="goToLanding()">Start New Task</button>
    <br>
    <button class="light" @click="close">Quit</button>
    &nbsp;
    &nbsp;
  </div>
</template>

<script>
import { remote, ipcRenderer } from 'electron';
import { COMPLETE_MODE } from '@/event-types';
import navigationMixin from '@/mixins/navigationMixin';

export default {
  name: 'TimeUpView',
  mixins: [navigationMixin],
  data() {
    return {
      w: remote.getCurrentWindow(),
    };
  },
  methods: {
    close() {
      this.w.close();
    },
  },
  mounted() {
    ipcRenderer.send(COMPLETE_MODE);
  },
};
</script>
