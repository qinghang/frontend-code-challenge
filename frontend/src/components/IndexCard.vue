<template>
  <div class="index-card" :class="{ listLayout: isListLayout }">
    <div class="poke-image" v-on:click="navToDetails()">
      <img :src="image" class="image-size" :class="{ shakePokemon: playing }" />
      <span class="poke-sound" v-on:click="playSound()" v-if="sound"></span>
    </div>
    <div class="poke-header">
      <div class="poke-name" v-on:click="navToDetails()">
        <h4>{{ name }}</h4>
        <p v-if="types">{{ types.join(", ") }}</p>
      </div>
      <div class="like-button">
        <img
          src="../assets/like-animation.gif"
          alt="like"
          v-if="loading"
          width="25"
        />
        <span
          :class="isLike ? 'like-icon' : 'unlike-icon'"
          v-on:click="updateFavorite()"
          v-if="!loading"
        ></span>
      </div>
    </div>
    <div class="poke-power" v-if="maxCP && maxCP">
      <h5>
        <span class="power-bar"
          ><span class="cp" :style="{ width: cpWidth }"></span
        ></span>
        <span>CP: {{ maxCP }}</span>
      </h5>
      <h5>
        <span class="power-bar"
          ><span class="hp" :style="{ width: hpWidth }"></span
        ></span>
        <span>HP: {{ maxHP }}</span>
      </h5>
    </div>
    <div class="poke-shape" v-if="weight && height">
      <div class="weight">
        <h4>Weight</h4>
        <p>{{ weight.minimum }} - {{ weight.maximum }}</p>
      </div>
      <div class="height">
        <h4>Height</h4>
        <p>{{ height.minimum }} - {{ height.maximum }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../styles/indexCard.scss";
</style>

<script>
import router from "../router";

export default {
  name: "IndexCard",
  props: {
    isListLayout: {
      type: Boolean,
      default: false
    },
    isfilterFavorite: {
      type: Boolean,
      default: false
    },
    id: String,
    name: String,
    types: {
      type: Array,
      default: () => []
    },
    image: String,
    isFavorite: Boolean,
    sound: {
      type: String,
      default: ""
    },
    weight: {
      type: Object,
      default: () => {}
    },
    height: {
      type: Object,
      default: () => {}
    },
    maxCP: {
      type: Number,
      default: 0
    },
    maxHP: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      isLike: this.isFavorite,
      loading: false,
      playing: false
    };
  },
  computed: {
    cpWidth: function() {
      const percent = (this.maxCP / 3000) * 100; // set 3000 to be 100%
      return percent >= 100 ? "100%" : percent + "%";
    },
    hpWidth: function() {
      const percent = (this.maxHP / 3000) * 100; // set 3000 to be 100%
      return percent >= 100 ? "100%" : percent + "%";
    }
  },
  methods: {
    updateFavorite() {
      if (!this.isLike) {
        this.showLikeAnimation(); //play animation
      }
      const mutation = this.isLike
        ? this.unFavoritePokemon()
        : this.favoritePokemon();

      fetch("graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation })
      })
        .then(res => res.json())
        .then(() => {
          this.showSuccessNotice();
          this.isLike = !this.isLike;
          if (this.isfilterFavorite && !this.isLike) {
            this.$emit("getPokemons"); // Filter out unFavorite Pokemon when in Favorite pokemon section
          }
        })
        .catch(function() {
          this.showErrorNotice();
        });
    },
    favoritePokemon() {
      return `
        mutation {
          favoritePokemon(id: "${this.id}") {
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
          unFavoritePokemon(id: "${this.id}") {
            id,
            name,
            isFavorite
          }
        }
      `;
    },
    navToDetails() {
      if (this.$route.params.name !== this.name) { // prevent un-necessary backend call
        router.push({ path: `/${this.name}` });
      }
    },
    playSound() {
      const audio = new Audio(this.sound);
      this.playing = true;
      audio.play();
      setTimeout(() => {
        this.playing = false;
      }, 500);
    },
    showLikeAnimation() {
      this.loading = true;
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
    }
  }
};
</script>
