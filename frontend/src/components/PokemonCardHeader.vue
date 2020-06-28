<template>
  <div class="pokemon-header">
    <div class="pokemon-name">
      <h4>
        <span @click="$emit('navToDetails')">{{ pokemonName }}</span>
        <span
          v-if="showPreview"
          class="preview-btn pokeball"
          :style="{ width: '18px', height: '18px', verticalAlign: 'sub' }"
          @click="openModal()"
        >
        </span>
      </h4>
      <p v-if="pokemonTypes">{{ types }}</p>
    </div>
    <div class="like-button">
      <div class="like-animate" v-if="loading"></div>
      <span
        :class="isFavorite ? 'like-icon' : 'unlike-icon'"
        @click="updateFavorite()"
        v-if="!loading"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonCardHeader",
  props: {
    pokemonId: {
      type: String,
      default: ""
    },
    pokemonName: {
      type: String,
      default: ""
    },
    pokemonTypes: {
      type: Array,
      default: () => []
    },
    isFavorite: {
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
  data() {
    return {
      loading: false
    };
  },
  computed: {
    types() {
      return this.pokemonTypes.join(", ");
    },
    favoritePokemon() {
      return `
        mutation {
          favoritePokemon(id: "${this.pokemonId}") {
            id,
            name,
            isFavorite
          }
        }
      `;
    },
    unFavoritePokemon() {
      return `
        mutation {
          unFavoritePokemon(id: "${this.pokemonId}") {
            id,
            name,
            isFavorite
          }
        }
      `;
    },
    hasGetPokemons() {
      return this.$listeners && this.$listeners.getPokemons;
    },
    hasUpdateListIsFavorite() {
      return this.$listeners && this.$listeners.updateListIsFavorite;
    },
    hasUpdateCurrentPokemonIsFavorite() {
      return this.$listeners && this.$listeners.updateCurrentPokemonIsFavorite;
    },
    hasUpdateEvolutionIsFavorite() {
      return this.$listeners && this.$listeners.updateEvolutionIsFavorite;
    },
    hasUpdatePreviewPokemonIsFavorite() {
      return this.$listeners && this.$listeners.updatePreviewPokemonIsFavorite;
    }
  },
  methods: {
    updateFavorite() {
      if (!this.isFavorite) {
        this.showLikeAnimation(); //play animation
      }
      const mutation = this.isFavorite
        ? this.unFavoritePokemon
        : this.favoritePokemon;

      fetch("graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation })
      })
        .then(res => res.json())
        .then(() => {
          this.showSuccessNotice();
          this.updateFrontendFavorite();
        })
        .catch(function() {
          this.showErrorNotice();
        });
    },
    updateFrontendFavorite() {
      // filter out unFavorite pokemon when filter favorite is true
      if (this.isfilterFavorite && this.isFavorite && this.hasGetPokemons) {
        this.$emit("getPokemons");
      }
      // update isFavorite in pokemon list when filter favorite is false
      if (!this.isfilterFavorite && this.hasUpdateListIsFavorite) {
        this.$emit("updateListIsFavorite", this.pokemonId, !this.isFavorite);
      }
      // update isFavorite in pokemon detail page
      if (this.hasUpdateCurrentPokemonIsFavorite) {
        this.$emit("updateCurrentPokemonIsFavorite", !this.isFavorite);
      }
      // update isFavorite in evolution pokemon
      if (this.hasUpdateEvolutionIsFavorite) {
        this.$emit(
          "updateEvolutionIsFavorite",
          this.pokemonId,
          !this.isFavorite
        );
      }
      // update isFavorite in preview modal pokemon
      if (
        this.hasUpdatePreviewPokemonIsFavorite &&
        this.hasUpdateListIsFavorite
      ) {
        this.$emit("updatePreviewPokemonIsFavorite", !this.isFavorite);
        // also update isFavaorite in pokemon list
        this.$emit("updateListIsFavorite", this.pokemonId, !this.isFavorite);
        // filter out unFavorite pokemon when filter favorite is true
        if (this.isfilterFavorite) {
          this.$emit("getPokemons");
        }
      }
    },
    showLikeAnimation() {
      this.loading = true;
      // reset loading to false after 0.5s
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    showSuccessNotice() {
      this.$toast.open("You did it!");
    },
    showErrorNotice() {
      this.$toast.open({
        message: "Something went wrong!",
        type: "error"
      });
    },
    openModal() {
      this.$emit("openModal", this.pokemonName);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";
// style for header, change base on list or grid layout
.pokemon-header {
  background-color: $light-grey;
  display: flex;
  text-align: left;
  padding-left: 0.625rem;
}
</style>

<style scoped lang="scss">
.pokemon-name {
  width: 84%;
  h4,
  p {
    margin: 0.25rem;
  }
  span {
    cursor: pointer;
    img {
      vertical-align: sub;
    }
  }
  span.preview-btn {
    margin-left: 0.375rem;
  }
}

.like-button {
  padding-top: 1rem;
  position: relative;
  height: 25px;
  width: 25px;
  span {
    display: block;
    height: 25px;
    width: 25px;
    cursor: pointer;
  }
  .like-icon {
    background-image: url("../assets/icons/like-icon.png");
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .unlike-icon {
    background-image: url("../assets/icons/unlike-icon.png");
    background-size: 100%;
    background-repeat: no-repeat;
  }
}

.like-animate {
  display: block;
  width: 74px;
  height: 70px;
  margin: 0 auto;
  background: url("../assets/like_animation.png") 0 0 no-repeat;
  background-size: 3000%;
  animation: like-gif steps(28) 1s 1 both;
  position: absolute;
  top: -11%;
  right: -100%;
}

@keyframes like-gif {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 100%;
  }
}
</style>
