import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { asyncRoute } from './async';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login',
            meta: {
                title: '登录',
                icon: '',
                path: '/',
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login/index.vue'),
            meta: {
                title: '登录',
                icon: '',
                path: '/login',
            },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/login/register.vue'),
            meta: {
                title: '注册',
                icon: '',
                path: '/register',
            },
        },
        {
            path: '/layout',
            name: 'layout',
            component: () => import('@/components/layout/index.vue'),
            children: asyncRoute,
            meta: {
                title: '布局',
                icon: '',
                path: '/home',
            },
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
