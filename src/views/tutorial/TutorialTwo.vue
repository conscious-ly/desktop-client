<template>
  <div id="wrapper">
    <br>
    <br>
    <br>
    <br>
    <font-awesome-icon icon="bullseye" size="5x"/>
    <h1>Start by setting your goal</h1>
    <br>
    <h2>Why did you open up your computer? What did you come here to achieve?</h2>
    <br>
    <v-select
      label="name"
      taggable
      placeholder="Select or write your task here"
      :options="$store.state.taskList"
      :value="$store.state.currentTask || null"
      @input="UPDATE_TASK">
    </v-select>
    <br>
    <button @click="nextTutorialPage()">Next</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { UPDATE_TASK } from '../../store/action-types';
import navigationMixin from '../../mixins/navigationMixin';

export default {
  name: 'TutorialTwoView',
  mixins: [navigationMixin],
  methods: {
    ...mapActions([
      UPDATE_TASK,
    ]),
  },
};

</script>
