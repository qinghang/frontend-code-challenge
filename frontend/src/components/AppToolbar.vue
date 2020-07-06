<template>
  <div class="toolbar">
    <div class="btn-group">
      <button
        :class="{ activeBtn: !isfilterFavorite }"
        @click="handleButtonClick(false)"
      >
        All
      </button>
      <button
        :class="{ activeBtn: isfilterFavorite }"
        @click="handleButtonClick(true)"
      >
        Favorites
      </button>
    </div>
    <div class="group-wrapper">
      <input
        type="text"
        placeholder="Search"
        class="search-box"
        @input="handleSearch"
      />
      <v-select
        :options="pokemonTypes"
        placeholder="Type"
        class="select-types"
        v-model="selectedType"
        @input="handleSelect"
      />
      <div class="layout-icons">
        <img
          src="../assets/icons/list-icon.png"
          alt="list"
          width="35"
          :class="{ activeIcon: isListLayout }"
          @click="handleIconClick(true)"
        />
        <img
          src="../assets/icons/grid-icon.png"
          alt="grid"
          width="35"
          :class="{ activeIcon: !isListLayout }"
          @click="handleIconClick(false)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToolBar",
  props: {
    isListLayout: {
      type: Boolean,
      default: false
    },
    isfilterFavorite: {
      type: Boolean,
      default: false
    },
    pokemonTypes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      debounce: null,
      selectedType: ""
    };
  },
  beforeDestroy() {
    clearTimeout(this.debounce);
  },
  methods: {
    handleButtonClick(bool) {
      this.$emit("filterByFavorite", bool);
    },
    handleSearch(event) {
      // perform dounce search
      // search when user stop typing
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        // use event.target.value as the search value
        this.$emit("filterBySearch", event.target.value);
      }, 600);
    },
    handleSelect() {
      // set type to empty string when selectedType is null
      // v-select will set selectedType to null when clear out selection
      const type = this.selectedType ? this.selectedType : "";
      this.$emit("filterByType", type);
    },
    handleIconClick(bool) {
      this.$emit("setListLayout", bool);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/toolbar.scss";
</style>
