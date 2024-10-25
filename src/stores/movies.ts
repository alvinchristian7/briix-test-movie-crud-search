import { defineStore } from 'pinia';
import type { Movie } from 'src/components/models';
import _ from 'lodash';

export const useMoviesStore = defineStore('movie', {
  state: (): {
    movies: Movie[];
  } => ({
    movies: [],
  }),
  getters: {
    countMovie: (state) => state.movies.length,
    detailById: (state) => (id: Movie['id']) =>
      state.movies.find((movie) => movie.id === id),
    searchMovies: (state) => (searchText: string) =>
      state.movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase()),
      ),
  },
  actions: {
    addMovie(movie: Movie) {
      this.movies.push(movie);
    },
    updateMovie(updatedMovie: Movie) {
      const foundIndex = this.movies.findIndex(
        (val) => val.id === updatedMovie.id,
      );
      console.log(foundIndex);
      console.log(this.movies[foundIndex]);
      console.log(updatedMovie);
      this.movies[foundIndex] = { ...updatedMovie };
    },
    deleteMovie(id: Movie['id']) {
      _.remove(this.movies, (movie) => movie.id === id);
    },
  },
});
