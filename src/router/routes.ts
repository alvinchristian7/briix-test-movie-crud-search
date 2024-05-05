import { useMoviesStore } from 'src/stores/movies';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Dashboard',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    name: 'Movie Detail',
    path: '/movie/:id',
    component: () => import('layouts/DetailWithCRUD.vue'),
    children: [{ path: '', component: () => import('pages/MovieDetail.vue') }],
    beforeEnter: [
      (to) => {
        const idParam = to.params.id;
        if (idParam !== 'new') {
          const movieStore = useMoviesStore();
          const foundMovie = movieStore.detailById(idParam as string);
          if (!foundMovie) {
            return { name: '404' }; // or return '/404'
          }
          // reject the navigation
          // return false
        }
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    name: '404',
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
