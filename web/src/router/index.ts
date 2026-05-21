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

    // 有 token
    if (userStore.token) {
        // 已登录但访问登录页 → 跳转到首页
        if (to.path === '/login') {
            return '/login';
        }
        return true;
    }
    // 无token
    if (whiteList.includes(to.path)) {
        return true;
    }

    return '/login';
});

export default router;
