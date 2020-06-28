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
        v-model="searchText"
        @keyup.enter="handleSearch"
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
      searchText: "",
      selectedType: ""
    };
  },
  methods: {
    handleButtonClick(bool) {
      this.$emit("filterByFavorite", bool);
    },
    handleSearch() {
      this.$emit("filterBySearch", this.searchText); // Search perfom by press 'Enter' key, better way can be auto search when user stops typing
    },
    handleSelect() {
      this.$emit("filterByType", this.selectedType);
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
