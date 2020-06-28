<template>
  <div
    :class="isListLayout ? 'list-view' : 'grid-view'"
    v-if="pokemons.length > 0"
  >
    <div v-for="pokemon in pokemons" :key="pokemon.id">
      <PokemonCard
        :pokemon="pokemon"
        :isListLayout="isListLayout"
        :isfilterFavorite="isfilterFavorite"
        :showPreview="true"
        @updateListIsFavorite="updateListIsFavorite"
        @getPokemons="getPokemons"
        @openModal="openModal"
      />
    </div>
  </div>
</template>

<script>
import PokemonCard from "../components/PokemonCard";

export default {
  name: "PokemonList",
  components: {
    PokemonCard
  },
  props: {
    pokemons: {
      type: Array,
      default: () => []
    },
    isListLayout: {
      type: Boolean,
      default: false
    },
    isfilterFavorite: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateListIsFavorite(id, bool) {
      this.$emit("updateListIsFavorite", id, bool);
    },
    getPokemons() {
      this.$emit("getPokemons");
    },
    openModal(name) {
      this.$emit("openModal", name);
    }
  }
};
</script>

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
