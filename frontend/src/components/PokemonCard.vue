<template>
  <div class="pokedex-list-item" :class="{ listLayout: isListLayout }">
    <PokemonCardImage
      :pokemonImage="pokemon.image"
      :pokemonSound="pokemon.sound"
      @navToDetails="navToDetails"
    />
    <PokemonCardHeader
      :pokemonId="pokemon.id"
      :pokemonName="pokemon.name"
      :pokemonTypes="pokemon.types"
      :isFavorite="pokemon.isFavorite"
      :isfilterFavorite="isfilterFavorite"
      :showPreview="showPreview"
      @navToDetails="navToDetails"
      @updateListIsFavorite="updateListIsFavorite"
      @getPokemons="getPokemons"
      @openModal="openModal"
      @updateCurrentPokemonIsFavorite="updateCurrentPokemonIsFavorite"
      @updateEvolutionIsFavorite="updateEvolutionIsFavorite"
      @updatePreviewPokemonIsFavorite="updatePreviewPokemonIsFavorite"
    />
    <span v-if="'maxCP' in pokemon && 'maxHP' in pokemon">
      <PokemonCardPowerbar
        :pokemonMaxCP="pokemon.maxCP"
        :pokemonMaxHP="pokemon.maxHP"
      />
    </span>
    <span v-if="'weight' in pokemon && 'height' in pokemon">
      <PokemonCardBodyform
        :pokemonWeight="pokemon.weight"
        :pokemonHeight="pokemon.height"
      />
    </span>
  </div>
</template>

<script>
import router from "../router";
import PokemonCardImage from "./PokemonCardImage";
import PokemonCardHeader from "./PokemonCardHeader";
import PokemonCardPowerbar from "./PokemonCardPowerbar";
import PokemonCardBodyform from "./PokemonCardBodyform";

export default {
  name: "PokemonCard",
  components: {
    PokemonCardImage,
    PokemonCardHeader,
    PokemonCardPowerbar,
    PokemonCardBodyform
  },
  props: {
    pokemon: {
      type: Object,
      require: true
    },
    isListLayout: {
      type: Boolean,
      default: false
    },
    isfilterFavorite: {
      type: Boolean,
      default: false
    },
    showPreview: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    navToDetails() {
      // if already in desire pokemon detail page, stop routing
      // prevent un-necessary backend call
      if (this.$route.params.name !== this.pokemon.name) {
        router.push({ path: `/${this.pokemon.name}` });
      }
    },
    updateListIsFavorite(id, bool) {
      this.$emit("updateListIsFavorite", id, bool);
    },
    updateCurrentPokemonIsFavorite(bool) {
      this.$emit("updateCurrentPokemonIsFavorite", bool);
    },
    updateEvolutionIsFavorite(id, bool) {
      this.$emit("updateEvolutionIsFavorite", id, bool);
    },
    updatePreviewPokemonIsFavorite(bool) {
      this.$emit("updatePreviewPokemonIsFavorite", bool);
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

<style lang="scss">
@import "../styles/_variables.scss";

.listLayout {
  display: flex;
  .pokemon-image {
    width: 8%;
  }
  .image-size {
    width: 2.75rem;
    height: 3.25rem;
    margin: 0.25rem 0;
  }
  .pokemon-header {
    width: 92%;
  }
}

@media (max-width: 700px) {
  .listLayout .pokemon-image {
    width: 18%;
  }
}

.pokedex-list-item {
  border: 1px solid $grey;
  &:hover {
    box-shadow: 0 0 5px 1px $grey;
  }
}
</style>
