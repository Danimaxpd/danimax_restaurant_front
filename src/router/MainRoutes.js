const MainRoutes = {
    path: '/auth',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
        requiresAuth: true
    },
    children: [
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
        },
        {
            path: '/records',
            name: 'records',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/RecordsView.vue')
        },
        {
            path: '/operation',
            name: 'operation',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/OperationView.vue')
        },
        // {
        //   path: '/logout',
        //   name: 'logout',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ '../views/OperationView.vue')
        // }
    ]
};



export default MainRoutes
