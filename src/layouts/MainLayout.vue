<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Movies Collection </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" to="/movie/new" />
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// defineOptions({
//   name: 'MainLayout',
// });
</script>
