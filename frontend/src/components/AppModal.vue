<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-describedby="modalDescription">
        <div class="modal-body" id="modalDescription">
          <PokemonCard
            :pokemon="pokemon"
            @updateIsFavorite="updateIsFavorite"
          />
        </div>
        <button
          type="button"
          class="btn-green"
          @click="close()"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import PokemonCard from "./PokemonCard";

export default {
  name: "Modal",
  components: {
    PokemonCard
  },
  props: {
    pokemon: {
      type: Object,
      require: true
    }
  },
  methods: {
    updateIsFavorite(id, bool) {
      this.$emit("updatePreviewIsFavorite", id, bool);
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* ensure modal on top of other component */
}

.modal {
  background: $white;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  .modal-body {
    padding: 0.8rem 1rem;
    /deep/ .pokemon-card {
      flex-flow: column;
      .pokemon-image {
        width: 100%;
      }
      .image-size {
        width: 7.5rem;
        height: 8.75rem;
        margin: 2rem 7rem;
      }
      .pokemon-header {
        width: 97.1%;
      }
    }
  }
}

.btn-green {
  color: $white;
  background: $light-green;
  border: 1px solid $light-green;
  border-radius: 2px;
  padding: 0.5rem;
  margin: 0.2rem;
  cursor: pointer;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
