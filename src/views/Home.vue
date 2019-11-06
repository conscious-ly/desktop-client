<template>
  <div id="wrapper">
    <div class="top-right" @click="goToSettings()">
      <font-awesome-icon icon="cogs" size="2x"/>
    </div>
    <img id="logo" src="~@/assets/logo.svg" alt="conscious.ly" />
    <h1>What would you like to do?</h1>
    <v-select
    taggable
    label="name"
    :options="$store.state.taskList"
    :value="$store.state.currentTask"
    @input="UPDATE_TASK">
    </v-select>

    &nbsp;

    <h1>How many minutes do you think it's going to take?</h1>
    <circle-slider
      v-model="expectedTime"
      @touchmove="$refs.input.blur()"
      :side="150"
      :min="0"
      :max="120"
      :step-size="1"
      :circle-width-rel="10"
      :progress-width-rel="10"
      :knob-radius="10"
    />
    <input ref="input" type="number" v-model.number="expectedTime" />

    <div>
    <button @click="startTask()">Begin</button><br><br>
    <!-- <button class="light" @click="test">TEST</button> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { remote } from 'electron';
import { START_TIMER, UPDATE_TASK } from '../store/action-types';
import { WIDGET_PAGE_ROUTE } from '../router/routes';
import navigationMixin from '../mixins/navigationMixin';

export default {
  name: 'HomeView',
  data() {
    return {
      expectedTime: 0,
      w: remote.getCurrentWindow(),
    };
  },
  mixins: [navigationMixin],
  methods: {
    startTask() {
      if (this.$store.getters.currentTaskName === 'Nothing') {
        this.w.close();
      }
      this.$store.dispatch(START_TIMER, this.$data.expectedTime);
      this.$router.push(WIDGET_PAGE_ROUTE);
    },
    // test() {},
    // navigate(event) {
    //   if (event.keyCode === 38) {
    //     this.$router.push('/time-up-page');
    //   }
    //   if (event.keyCode === 39) {
    //     this.$router.push('/distraction-prompt');
    //   }
    //   if (event.keyCode === 40) {
    //     this.$router.push('/settings-page');
    //   }
    // },
    ...mapActions([
      UPDATE_TASK,
    ]),
  },
};
</script>

<style scoped>
#logo {
  max-width: 200px;
}

.top-right {
  position: absolute;
  top: 0px;
  right: 0px;
  filter: contrast(25%)
}
</style>
