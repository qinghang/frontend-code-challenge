<template>
  <div class="pokemon-card">
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
      :showPreview="showPreview"
      @navToDetails="navToDetails"
      @updateIsFavorite="updateIsFavorite"
      @openModal="openModal"
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
    updateIsFavorite(id, bool) {
      this.$emit("updateIsFavorite", id, bool);
    },
    openModal(name) {
      this.$emit("openModal", name);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.pokemon-card {
  display: flex;
  flex-flow: column;
  border: 1px solid $grey;
  &:hover {
    box-shadow: 0 0 5px 1px $grey;
  }
}
</style>
