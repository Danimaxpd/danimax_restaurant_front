const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/BlankLayout.vue'),
    children: [
        {
            name: 'Login',
            path: '/',
            component: () => import('@/views/auth/LoginView.vue')
        },
        // {
        //     name: 'Register',
        //     path: '/auth/register',
        //     component: () => import('@/views/auth/Register.vue')
        // },
    ]
};

export default AuthRoutes;