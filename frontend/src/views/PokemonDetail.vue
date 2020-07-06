<template>
  <div class="pokemon-detail" v-if="pokemon">
    <h1>
      <router-link to="/">
        <span class="pokeball"></span>
      </router-link>
      {{ $route.params.name }}
    </h1>
    <div class="current-pokemon">
      <PokemonCard :pokemon="pokemon" @updateIsFavorite="updateIsFavorite" />
    </div>
    <span v-if="hasEvolutions">
      <h2>Evolutions</h2>
      <div class="evolutions">
        <div v-for="pokemon in pokemon.evolutions" :key="pokemon.id">
          <PokemonCard
            :pokemon="pokemon"
            @updateIsFavorite="updateIsFavorite"
          />
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import PokemonCard from "../components/PokemonCard";

export default {
  name: "PokemonDetail",
  components: {
    PokemonCard
  },
  data() {
    return {
      pokemon: {}
    };
  },
  created() {
    this.getPokemonByName();
  },
  watch: {
    $route() {
      this.getPokemonByName();
    }
  },
  computed: {
    hasEvolutions() {
      return Object.keys(this.pokemon).length !== 0
        ? this.pokemon.evolutions.length > 0
        : false;
    }
  },
  methods: {
    getPokemonByName() {
      const query = `graphql?query={ pokemonByName(name: "${
        this.$route.params.name
      }") { 
            id, 
            name, 
            types, 
            image, 
            isFavorite, 
            sound, 
            evolutions {id, name, image, isFavorite}, 
            weight {minimum, maximum}, 
            height {minimum, maximum}, 
            maxCP, 
            maxHP 
      } } `;
      fetch(query)
        .then(res => res.json())
        .then(res => {
          this.pokemon = res.data.pokemonByName;
        });
    },
    updateIsFavorite(id, bool) {
      if (id === this.pokemon.id) {
        this.updateCurrentPokemonIsFavorite(bool);
      } else {
        this.updateEvolutionIsFavorite(id, bool);
      }
    },
    updateCurrentPokemonIsFavorite(bool) {
      this.pokemon = Object.assign({}, this.pokemon, { isFavorite: bool });
    },
    updateEvolutionIsFavorite(id, bool) {
      const pokemonIndex = this.pokemon.evolutions.findIndex(
        pokemon => pokemon.id === id
      );
      if (pokemonIndex !== -1) {
        const pokemon = this.pokemon.evolutions[pokemonIndex];
        // update isFavorite
        pokemon.isFavorite = bool;
        // replace pokemon with new value
        this.pokemon.evolutions.splice(pokemonIndex, 1, pokemon);
      } else {
        this.showErrorNotice();
      }
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

<style scoped lang="scss">
.current-pokemon {
  /deep/ .pokemon-card {
    .pokemon-image .image-size {
      width: 16rem;
      height: 17rem;
    }
    .pokemon-header {
      padding-top: 1rem;
    }
  }
}

.evolutions {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 10px;
  grid-gap: 10px;
  /deep/ .pokemon-header .like-button {
    padding-top: 0.1rem;
  }
}

@media (max-width: 700px) {
  .evolutions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
