<template>
  <q-page padding class="column-gap-md">
    <q-input outlined v-model="searchTextDebounced" label="Search by title" />
    <div
      v-if="haveMovies"
      :class="['column-gap-sm', { 'full-width': $q.platform.is.mobile }]"
    >
      <template v-if="searchedResults.length > 0">
        <movie-card
          v-for="movie in searchedResults"
          :key="movie.id"
          v-bind="movie"
        />
      </template>
      <div v-else>Search for "{{ searchTextDebounced }}" not found</div>
    </div>
    <div v-else class="column-gap-sm">
      <div class="text-h6 text-bold text-center text-accent">
        Add movie(s) to your collection first
      </div>
      <div class="row">
        <q-icon name="arrow_downward" color="accent" v-for="n in 3" :key="n" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MovieCard from 'src/components/MovieCard.vue';
import { useMoviesStore } from 'src/stores/movies';
import { useDebouncedRef } from 'src/utils/vue';
import { computed, watch } from 'vue';

// defineOptions({
//   name: 'IndexPage',
// });

const movieStore = useMoviesStore();

const searchTextDebounced = useDebouncedRef('', 300);
watch(searchTextDebounced, () => {
  console.log(searchTextDebounced.value);
});

const searchedResults = computed(() =>
  movieStore.searchMovies(searchTextDebounced.value),
);
const haveMovies = computed(() => movieStore.movies.length > 0);
</script>
