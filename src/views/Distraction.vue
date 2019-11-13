<template>
  <div id="wrapper">
    <img id="logo"
    class="inverted"
    src="~@/assets/isolated-layout.svg"
    alt="conscious.ly" />
    <h1>You haven't completed {{ $store.state.currentTask.name || 'this task' }}!</h1>
    <br>
    <h2>Are you sure you want to be distracted?</h2>
    <button @click="goToPositiveReinforcement()">No</button>
    <br>
    <button v-if='!showQuestion' class="alt" @click="showQuestion = !showQuestion">Yes</button>

    <div width="200px" class='distraction-section' v-if="showQuestion">
        <input
        width="200px"
        v-if='showQuestion'
        v-model="answer"
        placeholder="Solve x^2 + 2x + 1 = 0?"
        @input="checkAnswer">
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { COMPLETE_DISTRACTION_MODE, DISTRACTION_MODE } from '@/event-types';
import { ENTER_DISTRACTED_MODE } from '@/store/action-types';
import { WIDGET_PAGE_ROUTE } from '@/router/routes';
import navigationMixin from '@/mixins/navigationMixin';

export default {
  name: 'DistractionView',
  mixins: [navigationMixin],
  data: () => ({
    showQuestion: false,
    answer: '',
  }),
  methods: {
    checkAnswer() {
      if (this.answer === '-1') {
        this.$store.dispatch(ENTER_DISTRACTED_MODE);
        ipcRenderer.send(COMPLETE_DISTRACTION_MODE);
        this.$router.push(WIDGET_PAGE_ROUTE);
      }
    },
    getDistracted() {
      this.showQuestion = true;
    },
  },
  mounted() {
    ipcRenderer.send(DISTRACTION_MODE);
  },
};

</script>
