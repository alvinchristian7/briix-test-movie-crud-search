<template>
  <q-btn color="indigo" no-caps>
    <q-card dark bordered class="bg-grey-9">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
        <div class="text-subtitle2">{{ director }}</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section> {{ summary }} </q-card-section>
    </q-card>
  </q-btn>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface Movie {
  id: number;
  title: string;
  director: string;
  summary: string;
  genres: [str: string];
}
export interface Meta {
  totalCount: number;
}

const props = withDefaults(defineProps<Movie>(), {
  summary: () => 'lorem ipsum',
});
</script>
