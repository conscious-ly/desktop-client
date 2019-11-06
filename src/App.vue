<template>
  <div id="app">
    <transition name="page-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Conscious.ly',
};
</script>

<style>
/* Note that SCSS is supported, simply add lang="scss" to the style tag */
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

button {
  background-color: #4fc08d;
  border: 1px solid #4fc08d;
  border-radius: 2em;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 1.2em;
  margin-top: 20px;
  outline: none;
  padding: 0.75em 2em;
  transition: all 0.15s ease;
}

button.alt {
  background-color: #d80101;
  border-color: #d80101;
}

button.light {
  background-color: transparent;
  color: #42b983;
}

h1 {
  margin-top: 30px;
}

input {
  color: #4fc08d;
  font-size: 1.2em;
  text-align: center;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.half-inverted {
  filter: hue-rotate(230deg);
}

.inverted {
  filter: invert(100%);
}

.left-side {
  display: flex;
  flex-direction: column;
}

#wrapper {
  height: 100vh;
  padding: 0px 80px;
  text-align: center;
  width: 100vw;
}

#logo {
  display: block;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
}

/****** Animations *****/
.page-fade-enter-active, .page-fade-leave-active {
  transition: opacity .3s ease;
}

.page-fade-enter, .page-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
