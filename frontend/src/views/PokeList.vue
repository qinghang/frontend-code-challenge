<template>
  <div class="pokemon-list">
    <h1>
      <img
        src="../assets/icons/pokeball-icon.png"
        alt="pokeball"
        width="25"
      />Pokédex
    </h1>
    <ToolBar
      :isfilterFavorite="options.filter.isFavorite"
      :isListLayout="isListLayout"
      :pokemonTypes="pokemonTypes"
      @filterByFavorite="filterByFavorite"
      @filterBySearch="filterBySearch"
      @filterByType="filterByType"
      @setListLayout="setListLayout"
    />
    <ListView
      :pokemons="pokemons"
      :isListLayout="isListLayout"
      :isfilterFavorite="options.filter.isFavorite"
      @getPokemons="getPokemons"
      @openModal="openModal"
    />
    <Modal v-show="showModal" :pokemon="previewPokemon" @close="closeModal" />
  </div>
</template>

<script>
import ToolBar from "../components/ToolBar";
import ListView from "../components/ListView";
import Modal from "../components/Modal.vue";

export default {
  name: "PokeList",
  components: {
    ToolBar,
    ListView,
    Modal
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
    this.scrollDown();
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
      const selectedType = type === null ? "" : type;
      this.options.filter.type = selectedType;
      this.getPokemons();
    },
    setListLayout(bool) {
      this.isListLayout = bool;
    },
    getPokemons() {
      const { limit, search, filter } = this.options;
      this.options.offset = 0; // Reset offset, offset may modify by infinite scroll

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
    scrollDown() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.addPokemons();
        }
      };
    },
    getPokemonTypes() {
      fetch("graphql?query={pokemonTypes}")
        .then(res => res.json())
        .then(res => {
          this.pokemonTypes = res.data.pokemonTypes;
        });
    },
    getPokemonByName(name) {
      const query = `graphql?query={ pokemonByName(name: "${name}") { 
            id, 
            name, 
            types, 
            image, 
            isFavorite, 
            sound, 
            evolutions {id, name}, 
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
