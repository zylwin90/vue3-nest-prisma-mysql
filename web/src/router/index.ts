import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/login/index.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/login/register.vue'),
        },
        {
            path: '/todo',
            name: 'todo',
            component: () => import('@/todo/index.vue'),
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('@/todo/detail.vue'),
        },
    ],
});

const whiteList = ['/', '/login', '/register'];
router.beforeEach((to: any, form: any) => {
    const userStore = useUserStore();

    if (userStore.token) {
        return true;
    }

    if (whiteList.includes(to.path)) {
        return true;
    }
    

    return '/login';
});

export default router;
