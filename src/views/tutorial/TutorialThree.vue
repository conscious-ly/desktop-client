<template>
  <div id="wrapper">
    <br>
    <br>
    <br>
    <br>
    <font-awesome-icon icon="clock" size="5x"/>
    <h1>Then estimate how long it's going to take</h1>
    <br>
    <h2>Try to be as accurate as possible - try to give yourself tighter deadlines</h2>
    <br>
    <div>
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
    </div>
    <input ref="input" type="number" v-model.number="expectedTime" />
    <br>
    <button @click="stepThree()">Next</button>
  </div>
</template>

<script>
import navigationMixin from '../../mixins/navigationMixin';
import { UPDATE_TIME_REMAINING } from '../../store/action-types';

export default {
  name: 'TutorialThreeView',
  mixins: [navigationMixin],
  data() {
    return {
      expectedTime: 0,
    };
  },
  methods: {
    stepThree() {
      this.$store.dispatch(UPDATE_TIME_REMAINING, this.$data.expectedTime);
      this.nextTutorialPage();
    },
  },
};

</script>
