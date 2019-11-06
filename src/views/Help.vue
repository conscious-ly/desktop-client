<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/isolated-layout.svg" alt="conscious.ly" />
    <h1>Need help? You ain't getting any here lol</h1>
    <button class='alt' @click="goToLanding()">Go Back</button>
  </div>
</template>

<script>
import navigationMixin from '@/mixins/navigationMixin';

export default {
  name: 'HelpView',
  mixins: [navigationMixin],
};
</script>
