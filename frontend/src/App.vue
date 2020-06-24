<template>
  <div id="app">
    <div class="main-container">
      <router-view />
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
</style>
