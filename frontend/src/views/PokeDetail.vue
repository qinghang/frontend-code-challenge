<template>
  <div class="pokemon-detail" v-if="pokemon">
    <h1>
      <img
        src="../assets/icons/pokeball-icon.png"
        alt="pokeball"
        width="25"
      />{{ $route.params.name }}
    </h1>
    <div class="main-pokemon">
      <IndexCard
        :id="pokemon.id"
        :name="pokemon.name"
        :types="pokemon.types"
        :image="pokemon.image"
        :isFavorite="pokemon.isFavorite"
        :sound="pokemon.sound"
        :weight="pokemon.weight"
        :height="pokemon.height"
        :maxCP="pokemon.maxCP"
        :maxHP="pokemon.maxHP"
      />
    </div>
    <h2 v-if="evolutions.length > 0">Evolutions</h2>
    <div class="evolutions">
      <div v-for="pokemon in evolutions" :key="pokemon.id">
        <IndexCard
          :id="pokemon.id"
          :name="pokemon.name"
          :image="pokemon.image"
          :isFavorite="pokemon.isFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IndexCard from "../components/IndexCard";

export default {
  name: "PokeDetail",
  components: {
    IndexCard
  },
  data() {
    return {
      pokemon: {},
      evolutions: []
    };
  },
  created() {
    this.getPokemonByName();
  },
  watch: {
    $route() {
      this.evolutions = []; // reset evolutions
      this.getPokemonByName();
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
            evolutions {id, name}, 
            weight {minimum, maximum}, 
            height {minimum, maximum}, 
            maxCP, 
            maxHP 
      } } `;
      fetch(query)
        .then(res => res.json())
        .then(res => {
          this.pokemon = res.data.pokemonByName;
          if (this.pokemon.evolutions) {
            this.pokemon.evolutions.forEach(el => this.getPokemonById(el.id));
          }
        });
    },
    getPokemonById(id) {
      const query = `graphql?query={ pokemonById(id: "${id}") { 
            id, 
            name, 
            types, 
            image, 
            isFavorite
      } } `;
      fetch(query)
        .then(res => res.json())
        .then(res => {
          this.evolutions = [...this.evolutions, res.data.pokemonById];
        });
    }
  }
};
</script>

<style lang="scss">
.main-pokemon {
  .poke-image .image-size {
    width: 16rem;
    height: 17rem;
  }
  .poke-header {
    padding-top: 1rem;
  }
}
.evolutions {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 10px;
  grid-gap: 10px;
  .poke-header .like-button {
    padding-top: 0.1rem;
  }
}
@media (max-width: 700px) {
  .evolutions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
