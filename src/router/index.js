import { createRouter, createWebHistory } from 'vue-router'
import MainRoutes from './MainRoutes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/ErrorPage.vue')
    },
    MainRoutes
  ]

})

export default router
