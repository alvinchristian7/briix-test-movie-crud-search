<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          {{ titleToolbar }}
        </q-toolbar-title>
        <q-btn
          v-if="!isSubmitNewMovie"
          padding=".25rem 1rem"
          dense
          icon="delete"
          color="red"
          label="Delete"
          @click="MovieBus.emit('delete-movie')"
        />
        <q-btn
          class="q-ml-sm"
          padding=".25rem 1rem"
          dense
          icon="save"
          color="green"
          label="Save"
          @click="MovieBus.emit('save-movie')"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// defineOptions({
//   name: 'MainLayout',
// });
import MovieBus from 'src/event-bus/movie';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isSubmitNewMovie = computed(() => route.params.id === 'new');
const titleToolbar = computed(() =>
  isSubmitNewMovie.value ? 'Create Movie' : 'Detail Movie',
);
</script>
