const HomeViewComponent = () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue');
const RecordsViewComponent = () => import(/* webpackChunkName: "records" */ '../views/RecordsView.vue');
const QueuesViewComponent = () => import(/* webpackChunkName: "queues" */ '../views/QueueView.vue');
const WareHouseInventoryViewComponent = () => import(/* webpackChunkName: "WareHouseInventory" */ '../views/WareHouseInventoryView.vue');
const WareHousePurchasedViewComponent = () => import(/* webpackChunkName: "WareHousePurchased" */ '../views/WareHousePurchasedView.vue');
const OperationViewComponent = () => import(/* webpackChunkName: "operation" */ '../views/OperationView.vue');

const MainRoutes = {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
        requiresAuth: true
    },
    children: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: HomeViewComponent
        },
        {
            path: '/records',
            name: 'records',
            component: RecordsViewComponent
        },
        {
            path: '/queues',
            name: 'queues',
            component: QueuesViewComponent
        },
        {
            path: '/warehouse',
            redirect: '/warehouse/inventory'
        },
        {
            path: '/warehouse/inventory',
            name: 'warehouse-inventory',
            component: WareHouseInventoryViewComponent
        },
        {
            path: '/warehouse/purchased',
            name: 'warehouse-purchased',
            component: WareHousePurchasedViewComponent
        },
        {
            path: '/operation',
            name: 'operation',
            component: OperationViewComponent
        },
    ]
};




export default MainRoutes
