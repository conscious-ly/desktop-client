<template>
  <div id="wrapper">
    <div class="top-right" @click="goToSettings()">
      <font-awesome-icon icon="cogs" size="2x"/>
    </div>
    <img id="logo" src="@/assets/logo.svg" alt="conscious.ly" />
    <h1>What would you like to do?</h1>
    <v-select
    label="name"
    taggable
    placeholder="Select or write your task here"
    :options="$store.state.taskList"
    :value="$store.state.currentTask || null"
    @input="UPDATE_TASK">
    </v-select>

    &nbsp;
    <br>
    <br>
    <h1>How many minutes do you think it's going to take?</h1>
    <circle-slider
      v-model="expectedTime"
      @touchmove="$refs.input.blur()"
      knob-color="#6be371"
      progress-color="#6be371"
      :side="150"
      :min="0"
      :max="120"
      :step-size="1"
      :circle-width-rel="8"
      :knob-radius="11"
    />
    <input ref="input" type="number" v-model.number="expectedTime" />

    <div>
    <button @click="confirmTask">Begin</button><br><br>
    <!-- <button class="light" @click="test">TEST</button> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { remote } from 'electron';
import client from '@/client';
import { START_TIMER, UPDATE_TASK } from '@/store/action-types';
import { WIDGET_PAGE_ROUTE } from '@/router/routes';
import navigationMixin from '@/mixins/navigationMixin';


export default {
  name: 'HomeView',
  async created() {
    if (this.$store.state.firstTimeOpeningApp) {
      this.goToTutorial();
    }

    /* Code for syncing with mobile app */
    /* eslint-disable no-undef */
    const response = await client.checkStatus();
    console.log(response.data);
    if (response.data) {
      if (data.status === true) {
        this.$store.dispatch(UPDATE_TASK,
          {
            id: Math.random().toString(),
            name: data.current_task,
            expectedTimeInMin: data.time / 60000,
          });
        this.$store.dispatch(START_TIMER, data.time / 60000);
        this.$router.push(WIDGET_PAGE_ROUTE);
      }
    }
  },
  data() {
    return {
      expectedTime: 0,
      w: remote.getCurrentWindow(),
    };
  },
  mixins: [navigationMixin],
  methods: {
    confirmTask() {
      const options = {
        buttons: ['No', 'Yes'],
        type: 'question',
        message: 'Ready to get started?',
      };
      if (remote.dialog.showMessageBoxSync(options)) {
        this.startTask();
      }
    },
    startTask() {
      if (this.$store.getters.currentTaskName === 'Nothing') {
        this.w.close();
      }
      this.$store.dispatch(START_TIMER, this.$data.expectedTime);
      this.$router.push(WIDGET_PAGE_ROUTE);
    },
    // async test() {
    // const response = await client.checkStatus();
    // console.log(response.data.status);
    // },
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
