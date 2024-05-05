<template>
  <q-btn :to="`/movie/${id}`" no-caps padding="none" :class="mobileFullWidth">
    <q-card dark bordered :class="['bg-grey-9', 'movieCard', mobileFullWidth]">
      <q-card-section>
        <div class="text-h6 text-left">{{ title }}</div>
        <div class="text-subtitle2 text-left">{{ director }}</div>
      </q-card-section>

      <q-separator v-if="genresConcatted" dark inset />

      <q-card-section class="text-right">
        {{ genresConcatted }}
      </q-card-section>
    </q-card>
  </q-btn>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import type { Movie } from './models';
import { genresMap } from 'src/utils/constants/genre';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const mobileFullWidth = computed(() => ({
  'full-width': $q.platform.is.mobile,
}));

const props = withDefaults(defineProps<Movie>(), {
  summary: () => 'lorem ipsum',
});
const genresConcatted = computed(() =>
  props.genres.map((val) => genresMap[val]).join(', '),
);
watch(
  () => props.id,
  () => console.log(props.id),
);
</script>

<style lang="scss">
.movieCard {
  min-width: 20rem;
}
</style>
