<template>
  <div id="app">
    <div class="main-container">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
@import "./styles/base.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-container {
  max-width: 960px;
  margin: 0 auto;
}

.pokeball {
  background-image: url("./assets/icons/pokeball-icon.png");
  background-size: 100%;
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;
  display: inline-block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
