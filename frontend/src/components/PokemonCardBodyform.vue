<template>
  <div class="body-form">
    <div class="weight">
      <h4>Weight</h4>
      <p>{{ pokemonWeight.minimum }} - {{ pokemonWeight.maximum }}</p>
    </div>
    <div class="height">
      <h4>Height</h4>
      <p>{{ pokemonHeight.minimum }} - {{ pokemonHeight.maximum }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonBodyform",
  props: {
    pokemonWeight: {
      type: Object,
      default: () => {}
    },
    pokemonHeight: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.body-form {
  display: flex;
  background-color: $light-grey;
  p {
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }
  .weight {
    width: 50%;
    border-top: 1px solid $grey;
    border-right: 1px solid $grey;
  }
  .height {
    width: 50%;
    border-top: 1px solid $grey;
  }
}
</style>
