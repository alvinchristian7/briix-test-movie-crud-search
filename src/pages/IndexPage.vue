<template>
  <q-page padding class="column items-center gap-sm">
    <q-input outlined v-model="searchText" label="Search by title" />
    <movie-card
      v-for="link in moviesDB"
      :key="link.id"
      v-bind="link"
    ></movie-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Movie, Meta } from 'components/MovieCard.vue';
import MovieCard from 'src/components/MovieCard.vue';

// defineOptions({
//   name: 'IndexPage',
// });

const moviesDB = ref<Movie[]>([
  {
    id: 1,
    title: 'ct1',
    director: 'ct1',
    summary: '',
    genres: ['ct1'],
  },
  {
    id: 2,
    title: 'ct2',
    director: 'ct2',
    summary: 'ct2',
    genres: ['ct2'],
  },
  {
    id: 3,
    title: 'ct3',
    director: 'ct3',
    summary: 'ct3',
    genres: ['ct3'],
  },
  {
    id: 4,
    title: 'ct4',
    director: 'ct4',
    summary: 'ct4',
    genres: ['ct4'],
  },
  {
    id: 5,
    title: 'ct5',
    director: 'ct5',
    summary: 'ct5',
    genres: ['ct5'],
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});
const searchText = ref('');
</script>
