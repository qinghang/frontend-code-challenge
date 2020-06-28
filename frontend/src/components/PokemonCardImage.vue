<template>
  <div class="pokemon-image">
    <img
      :src="pokemonImage"
      class="image-size"
      :class="{ shakePokemon: playing }"
      @click="$emit('navToDetails')"
    />
    <span class="pokemon-sound" @click="playSound()" v-if="pokemonSound">
    </span>
  </div>
</template>

<script>
export default {
  name: "PokemonCardImage",
  props: {
    pokemonImage: {
      type: String,
      require: true
    },
    pokemonSound: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      playing: false
    };
  },
  methods: {
    playSound() {
      const audio = new Audio(this.pokemonSound);
      this.playing = true;
      audio.play();
      // reset playing to false after 0.5s
      setTimeout(() => {
        this.playing = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss">
// style for image and image size, change base on list or grid layout
.pokemon-image {
  position: relative;
  img {
    cursor: pointer;
  }
}

.image-size {
  width: 7.5rem;
  height: 8.75rem;
  margin: 2rem 0;
}
</style>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.pokemon-sound {
  height: 50px;
  width: 50px;
  display: block;
  position: absolute;
  left: 2%;
  bottom: 2%;
  background-image: url("../assets/icons/speaker-icon.png");
  background-size: 75%;
  background-repeat: no-repeat;
}

/* Shake Animation */
.shakePokemon {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;

  /* play the animation 3 times */
  animation-iteration-count: 3;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
