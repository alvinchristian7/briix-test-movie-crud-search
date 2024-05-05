<template>
  <q-page padding>
    <q-form class="column-gap-md" @submit.prevent="onSubmit" @reset="onReset">
      <q-input outlined v-model="movieTextForm.title" label="Title" />
      <q-input outlined v-model="movieTextForm.director" label="Director" />
      <q-input
        v-model="movieTextForm.summary"
        filled
        type="textarea"
        label="Summary"
      />
      <div class="column q-gutter-xs">
        <div class="col q-gutter-xs">
          <q-chip
            v-model:selected="genres.action"
            color="primary"
            text-color="white"
            icon="check_box_outline_blank"
            size="md"
          >
            {{ genresMap.action }}
          </q-chip>
          <q-chip
            v-model:selected="genres.animation"
            color="teal"
            text-color="white"
            icon="check_box_outline_blank"
            size="md"
          >
            {{ genresMap.animation }}
          </q-chip>
        </div>
        <div class="col q-gutter-xs">
          <q-chip
            v-model:selected="genres.drama"
            color="orange"
            text-color="white"
            icon="check_box_outline_blank"
            size="md"
          >
            {{ genresMap.drama }}
          </q-chip>
          <q-chip
            v-model:selected="genres['sci-fi']"
            color="red"
            text-color="white"
            icon="check_box_outline_blank"
            size="md"
          >
            {{ genresMap['sci-fi'] }}
          </q-chip>
        </div>
      </div>
      <div>
        <!-- <q-btn label="Submit" type="submit" color="primary" /> -->
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Genre, Movie } from 'src/components/models';
import { useMoviesStore } from 'src/stores/movies';
import { useQuasar } from 'quasar';
import _ from 'lodash';
import { genresMap } from 'src/utils/constants/genre';
import MovieBus from 'src/event-bus/movie';

const $q = useQuasar();

const defaultGenres = {
  action: false,
  animation: false,
  drama: false,
  'sci-fi': false,
};

const defaultMovie = {
  title: '',
  director: '',
  summary: '',
};

const route = useRoute();
const router = useRouter();
const paramId = route.params.id as string;
const isSubmitNewMovie = paramId === 'new';
const movieStore = useMoviesStore();
const foundMovie = movieStore.detailById(paramId)!;

const defaultFormValues = isSubmitNewMovie
  ? {
      movieText: defaultMovie,
      genres: defaultGenres,
    }
  : {
      movieText: _.pick(foundMovie, ['title', 'director', 'summary']),
      genres: foundMovie.genres.reduce(
        (acc, curr) => ({ ...acc, [curr]: true }),
        defaultGenres,
      ),
    };

const movieTextForm = reactive<Pick<Movie, 'title' | 'director' | 'summary'>>(
  defaultFormValues.movieText,
);
const genres = reactive<Record<string, boolean>>(defaultFormValues.genres);

const onReset = () => {
  movieTextForm.title = '';
  movieTextForm.director = '';
  movieTextForm.summary = '';
  genres.action = false;
  genres.animation = false;
  genres.drama = false;
  genres['sci-fi'] = false;
};
const onSubmit = async () => {
  const genresValue = Object.keys(genres).filter((key) => genres[key]);
  if (isSubmitNewMovie) {
    const id = crypto.randomUUID();
    movieStore.addMovie({
      ...movieTextForm,
      id,
      genres: genresValue as Genre[],
    });
    await router.replace('/movie/' + id);
  } else {
    movieStore.updateMovie({
      id: foundMovie.id,
      ...movieTextForm,
      genres: genresValue as Genre[],
    });
  }

  $q.notify({
    color: 'green-4',
    message: 'Saved',
  });
};

const onDelete = () => {
  movieStore.deleteMovie(foundMovie.id);
  router.replace('/').then(() => {
    $q.notify({
      color: 'red-4',
      message: 'Deleted',
    });
  });
};

onMounted(() => {
  MovieBus.on('save-movie', onSubmit);
  MovieBus.on('delete-movie', onDelete);
});
onUnmounted(() => {
  MovieBus.off('save-movie', onSubmit);
  MovieBus.off('delete-movie', onDelete);
});
</script>
