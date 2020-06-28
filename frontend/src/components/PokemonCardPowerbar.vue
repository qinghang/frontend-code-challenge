<template>
  <div class="powerbar-wraper">
    <h5>
      <span class="power-bar"
        ><span class="cp" :style="{ width: calcPercent(pokemonMaxCP) }"></span
      ></span>
      <span>CP: {{ pokemonMaxCP }}</span>
    </h5>
    <h5>
      <span class="power-bar"
        ><span class="hp" :style="{ width: calcPercent(pokemonMaxHP) }"></span
      ></span>
      <span>HP: {{ pokemonMaxHP }}</span>
    </h5>
  </div>
</template>

<script>
export default {
  name: "PokemonCardPowerbar",
  props: {
    pokemonMaxCP: {
      type: Number,
      default: 0
    },
    pokemonMaxHP: {
      type: Number,
      default: 0
    }
  },
  methods: {
    calcPercent(number) {
      const percent = (number / 3000) * 100; // set 3000 to be 100%
      return percent >= 100 ? "100%" : percent + "%";
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.powerbar-wraper {
  background-color: $light-grey;
  padding: 0.5rem 0.8rem 1.875rem;
  text-align: left;
}

.power-bar {
  height: 0.625rem;
  width: 90%;
  display: inline-block;
  border-radius: 0.3rem;
  margin-right: 0.5rem;
  background-color: $grey;
  .cp {
    background-color: $purple;
  }
  .hp {
    background-color: $primary-green;
  }
  .cp,
  .hp {
    height: 100%;
    display: inline-block;
    border-radius: 0.3rem;
    margin-bottom: 3px;
  }
}
</style>
