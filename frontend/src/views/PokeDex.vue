<template>
  <div class="pokemon-list">
    <h1>
      <span class="pokeball"></span>
      Pokédex
    </h1>
    <AppToolbar
      :isfilterFavorite="options.filter.isFavorite"
      :isListLayout="isListLayout"
      :pokemonTypes="pokemonTypes"
      @filterByFavorite="filterByFavorite"
      @filterBySearch="filterBySearch"
      @filterByType="filterByType"
      @setListLayout="setListLayout"
    />
    <PokemonList
      :pokemons="pokemons"
      :isListLayout="isListLayout"
      :isfilterFavorite="options.filter.isFavorite"
      @updateListIsFavorite="updateListIsFavorite"
      @getPokemons="getPokemons"
      @openModal="openModal"
    />
    <AppModal
      v-show="showModal"
      :pokemon="previewPokemon"
      :isfilterFavorite="options.filter.isFavorite"
      @close="closeModal"
      @updatePreviewPokemonIsFavorite="updatePreviewPokemonIsFavorite"
      @updateListIsFavorite="updateListIsFavorite"
      @getPokemons="getPokemons"
    />
  </div>
</template>

<script>
import AppToolbar from "../components/AppToolbar";
import PokemonList from "../components/PokemonList";
import AppModal from "../components/AppModal.vue";

export default {
  name: "PokeDex",
  components: {
    AppToolbar,
    PokemonList,
    AppModal
  },
  data() {
    return {
      pokemons: [],
      pokemonTypes: [],
      options: {
        limit: 12,
        offset: 0,
        search: "",
        filter: {
          isFavorite: false,
          type: ""
        }
      },
      isListLayout: false,
      showModal: false,
      previewPokemon: {}
    };
  },
  created() {
    this.getPokemons();
    this.getPokemonTypes();
  },
  mounted() {
    this.scrolling();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.hitWindowBottom);
  },
  methods: {
    filterByFavorite(bool) {
      this.options.filter.isFavorite = bool;
      this.getPokemons();
    },
    filterBySearch(str) {
      this.options.search = str;
      this.getPokemons();
    },
    filterByType(type) {
      // set type to empty string when type is null
      const selectedType = type === null ? "" : type;
      this.options.filter.type = selectedType;
      this.getPokemons();
    },
    setListLayout(bool) {
      this.isListLayout = bool;
    },
    getPokemons() {
      const { limit, search, filter } = this.options;
      this.options.offset = 0; // Reset offset to 0, offset may modify by infinite scroll

      const query = `graphql?query={ 
        pokemons(
          query: { 
            limit: ${limit}, 
            offset: ${this.options.offset}, 
            search: "${search}", 
            filter: { 
              isFavorite: ${filter.isFavorite}, 
              type: "${filter.type}"
            }
          }) 
          { edges { id, name, types, image, isFavorite } } 
        }`;

      fetch(query)
        .then(res => res.json())
        .then(res => {
          this.pokemons = res.data.pokemons.edges;
        });
    },
    addPokemons() {
      // for infinite scroll, add more pokemons when scroll to page bottom
      const { limit, offset, search, filter } = this.options;
      const new_offset = offset + limit;
      const query = `graphql?query={ 
        pokemons(
          query: { 
            limit: ${limit}, 
            offset: ${new_offset},
            search: "${search}",
            filter: { 
              isFavorite: ${filter.isFavorite}, 
              type: "${filter.type}"
            }
          }) 
          { edges { id, name, types, image, isFavorite } } 
        }`;

      fetch(query)
        .then(res => res.json())
        .then(res => {
          this.pokemons = [...this.pokemons, ...res.data.pokemons.edges];
          this.options.offset = new_offset;
        });
    },
    scrolling() {
      // Add scroll listener to check if scrolling get to bottom of the page
      window.addEventListener("scroll", this.hitWindowBottom);
    },
    hitWindowBottom() {
      // add pokemons when scroll to the bottom
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.addPokemons();
      }
    },
    getPokemonTypes() {
      fetch("graphql?query={pokemonTypes}")
        .then(res => res.json())
        .then(res => {
          this.pokemonTypes = res.data.pokemonTypes;
        });
    },
    getPokemonByName(name) {
      // for preview modal
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
    updateListIsFavorite(id, bool) {
      // update pokemon isFavorite in pokemon list in front-end
      // this function trigger only when isFavorite is updated on backend
      const pokemonIndex = this.pokemons.findIndex(
        pokemon => pokemon.id === id
      );
      if (pokemonIndex !== -1) {
        const pokemon = this.pokemons[pokemonIndex];
        // update isFavorite
        pokemon.isFavorite = bool;
        // replace pokemon with new value
        this.pokemons.splice(pokemonIndex, 1, pokemon);
      } else {
        this.showErrorNotice();
      }
    },
    updatePreviewPokemonIsFavorite(bool) {
      // update isFavorite in preview modal
      this.previewPokemon = Object.assign({}, this.previewPokemon, {
        isFavorite: bool
      });
    },
    openModal(name) {
      this.getPokemonByName(name);
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    showErrorNotice() {
      this.$toast.open({
        message: "Something went wrong!",
        type: "error"
      });
    }
  }
};
</script>
