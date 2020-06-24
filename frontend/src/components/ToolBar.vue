<template>
  <div class="toolbar">
    <div class="btn-group">
      <button
        :class="{ activeBtn: !isfilterFavorite }"
        v-on:click="handleButtonClick(false)"
      >
        All
      </button>
      <button
        :class="{ activeBtn: isfilterFavorite }"
        v-on:click="handleButtonClick(true)"
      >
        Favorites
      </button>
    </div>
    <div class="section-group">
      <input
        type="text"
        placeholder="Search"
        class="search-box"
        v-model="searchText"
        v-on:keyup.enter="handleSearch" 
      /> 
      <v-select
        :options="pokemonTypes"
        placeholder="Type"
        class="poke-select"
        v-model="selectedType"
        @input="handleSelect"
      ></v-select>
      <div class="layout-icons">
        <img
          src="../assets/icons/list-icon.png"
          alt="list"
          width="35"
          :class="{ activeIcon: isListLayout }"
          v-on:click="handleIconClick(true)"
        />
        <img
          src="../assets/icons/grid-icon.png"
          alt="grid"
          width="35"
          :class="{ activeIcon: !isListLayout }"
          v-on:click="handleIconClick(false)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../styles/toolbar.scss";
</style>

<script>
export default {
  name: "ToolBar",
  props: {
    isfilterFavorite: Boolean,
    isListLayout: Boolean,
    pokemonTypes: Array
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
