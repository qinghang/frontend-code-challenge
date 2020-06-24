<template>
  <div
    :class="isListLayout ? 'list-view' : 'grid-view'"
    v-if="pokemons.length > 0"
  >
    <div v-for="pokemon in pokemons" :key="pokemon.id">
      <IndexCard
        :id="pokemon.id"
        :name="pokemon.name"
        :types="pokemon.types"
        :image="pokemon.image"
        :isFavorite="pokemon.isFavorite"
        :isListLayout="isListLayout"
        :isfilterFavorite="isfilterFavorite"
        @getPokemons="getPokemons"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-view {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  padding: 10px;
  grid-gap: 10px;
}
.grid-view {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 10px;
  grid-gap: 10px;
}
@media (max-width: 700px) {
  .grid-view {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

<script>
import IndexCard from "../components/IndexCard";

export default {
  name: "ListView",
  components: {
    IndexCard
  },
  props: {
    pokemons: Array,
    isListLayout: Boolean,
    isfilterFavorite: Boolean
  },
  methods: {
    getPokemons() {
      this.$emit("getPokemons");
    }
  }
};
</script>
