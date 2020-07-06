<template>
  <div
    :class="isListLayout ? 'list-view' : 'grid-view'"
    v-if="pokemons.length > 0"
  >
    <div v-for="pokemon in pokemons" :key="pokemon.id">
      <PokemonCard
        :pokemon="pokemon"
        :showPreview="true"
        @updateIsFavorite="updateIsFavorite"
        @openModal="openModal"
      />
    </div>
    <AppModal
      v-show="showModal"
      :pokemon="previewPokemon"
      @updatePreviewIsFavorite="updatePreviewIsFavorite"
      @close="closeModal"
    />
  </div>
</template>

<script>
import PokemonCard from "../components/PokemonCard";
import AppModal from "../components/AppModal.vue";

export default {
  name: "PokemonList",
  components: {
    PokemonCard,
    AppModal
  },
  props: {
    pokemons: {
      type: Array,
      default: () => []
    },
    isListLayout: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false,
      previewPokemon: {}
    };
  },
  methods: {
    getPokemonByName(name) {
      const query = `graphql?query={ pokemonByName(name: "${name}") { 
            id, 
            name, 
            types, 
            image, 
            isFavorite, 
            sound, 
            weight {minimum, maximum}, 
            height {minimum, maximum}, 
            maxCP, 
            maxHP 
      } } `;
      fetch(query)
        .then(res => res.json())
        .then(res => {
          this.previewPokemon = res.data.pokemonByName;
        });
    },
    updateIsFavorite(id, bool) {
      this.$emit("updateIsFavorite", id, bool);
    },
    updatePreviewIsFavorite(id, bool) {
      // update isFavorite in preview modal
      this.previewPokemon = Object.assign({}, this.previewPokemon, {
        isFavorite: bool
      });
      // Also update isFavorite in pokemon list
      this.$emit("updateIsFavorite", id, bool);
    },
    openModal(name) {
      this.getPokemonByName(name);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
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

.list-view {
  /deep/ .pokemon-card {
    flex-flow: row;
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
  .list-view {
    /deep/ .pokemon-card .pokemon-image {
      width: 18%;
    }
  }
}
</style>
