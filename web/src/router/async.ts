export const asyncRoute = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/index.vue'),
        meta: {
            title: '首页',
            icon: 'ri:home-3-fill',
            path: '/home',
             showMenu: true,
        },
    },
    {
        path: '/todo',
        name: 'todo',
        component: () => import('@/pages/todo/index.vue'),
        meta: {
            title: 'todo',
            icon: 'ri:calendar-todo-line',
            path: '/todo',
            showMenu: true,
        },
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/pages/test/index.vue'),
        meta: {
            title: '测试',
            icon: 'ri:align-item-left-fill',
            path: '/test',
            showMenu: true,
        },
        children: [
            {
                path: '/decotator',
                name: 'decotator',
                component: () => import('@/pages/test/decotator/index.vue'),
                meta: {
                    title: '装饰器',
                    icon: 'ri:ai-generate-3d-line',
                    path: '/decotator',
                    showMenu: true,
                },
            },
            {
                path: '/gurd',
                name: 'gurd',
                component: () => import('@/pages/test/gurd/index.vue'),
                meta: {
                    title: '守卫',
                    icon: 'ri:ai-generate-2-line',
                    path: '/gurd',
                    showMenu: true,
                },
            },
        ],
    },
];
