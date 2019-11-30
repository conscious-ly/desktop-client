<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/isolated-layout.svg" alt="conscious.ly" />
    <h1>Welcome to Conscious.ly</h1>
    <br>
    <h2>Great job on taking your first step to cultivating a more conscious mindset</h2>
    <button @click="nextTutorialPage()">Let's get started!</button>
  </div>
</template>

<script>
import navigationMixin from '../../mixins/navigationMixin';

export default {
  name: 'TutorialOneView',
  mixins: [navigationMixin],
};

</script>
