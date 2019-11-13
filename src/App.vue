<template>
  <div id="app">
    <transition name="page-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'conscious.ly',
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Work+Sans");
@import url("https://fonts.googleapis.com/css?family=Montserrat");

$font-color: #444e36;
$background-color: #f7faf4;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: $background-color;
  color: $font-color;
  font-family: "Montserrat", sans-serif;
}

button {
  background-color: #6be371;
  border: 1px solid #6be371;
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
  background-color: #d0a070;
  border-color: #d0a070;
}

button.light {
  background-color: transparent;
  color: #6be371;
}

// circle {
//   fill: #6be371;
// }

h1 {
  font-family: "Work Sans", sans-serif;
  margin-top: 30px;
}

input {
  color: $font-color;
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
  filter: hue-rotate(290deg);
}

.inverted {
  filter: hue-rotate(90deg) invert(100%);
}

.left-side {
  display: flex;
  flex-direction: column;
}

#logo {
  display: block;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
  padding-left: 38px;
}


#wrapper {
  height: 100vh;
  padding: 0px 80px;
  text-align: center;
  width: 100vw;
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
