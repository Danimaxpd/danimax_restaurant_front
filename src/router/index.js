import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/ErrorPage.vue')
    },
    MainRoutes,
    AuthRoutes
  ]

})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (store.state.isAuthenticated) {
      next();
    } else {
      // User is not authenticated, redirect to the login page or another appropriate page
      next('/');
    }
  } else {
    next();
  }
});

export default router
