<template>
  <div :class="[$style.wrapper]">
    <div :class="[$style.block]">
      <h1 :class="[$style.blockTitle]">books</h1>
      <app-search-input
        :class="[$style.blockInput]"
        id="book-input"
        :useStore="bookStore"
        :resultMapper="mapBookModelToSearchInputViewModel"
        automaticFocus
      ></app-search-input>
    </div>

    <div :class="[$style.block]">
      <h1 :class="[$style.blockTitle]">cities</h1>
      <app-search-input
        :class="[$style.blockInput]"
        id="city-input"
        :useStore="cityStore"
        :resultMapper="mapCityModelToSearchInputViewModel"
      ></app-search-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import useBookStore, { BookModel } from '@/stores/book/Book';
import useCityStore, { CityModel } from '@/stores/city/City';
import AppSearchInput, { ResultMapper, SearchInputItem } from '@/components/AppSearchInput.vue';

const bookStore = useBookStore;
const cityStore = useCityStore;

const mapBookModelToSearchInputViewModel: ResultMapper = (book: BookModel): SearchInputItem => ({
  title: book.title,
  subtitle: book.author,
});

const mapCityModelToSearchInputViewModel: ResultMapper = (city: CityModel): SearchInputItem => ({
  title: city.name,
});
</script>

<style lang="scss" module>
.wrapper {
  gap: 32px;
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.block {
  padding: 32px;
  position: relative;
  background: white;
  border-radius: 64px;
  border: 1px solid $color-black;

  &Title {
    top: 0;
    left: 0;
    right: 0;
    font-weight: 100;
    font-size: 18px;
    line-height: 32px;
    text-align: center;
    position: absolute;
  }
}
</style>
