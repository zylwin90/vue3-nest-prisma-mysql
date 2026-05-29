import type { RouteRecordRaw } from 'vue-router';

/**
 * 静态路由配置（不需要权限就能访问的路由）
 *
 */
export const staticRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login',
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
        meta: {
            title: '布局',
            icon: '',
            path: '/home',
        },
    },
];
