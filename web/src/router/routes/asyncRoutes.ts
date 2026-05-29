import type { RouteRecordRaw } from 'vue-router';

/**
 * 动态路由配置（不需要权限就能访问的路由）
 *
 */
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/index.vue'),
        meta: {
            title: '首页',
            icon: 'icon-crown-fill',
            path: '/home',
            showMenu: true,
        },
    },
    {
        path: '/sys',
        name: 'sys',
        component: () => import('@/pages/sys/index.vue'),
        meta: {
            title: '系统管理',
            icon: 'icon-delete-fill',
            path: '/sys',
            showMenu: true,
        },
        children: [
            {
                path: '/user',
                name: 'user',
                component: () => import('@/pages/sys/user/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'icon-fire-fill',
                    path: '/user',
                    showMenu: true,
                },
            },
            {
                path: '/role',
                name: 'role',
                component: () => import('@/pages/sys/role/index.vue'),
                meta: {
                    title: '角色管理',
                    icon: 'icon-funnelplot-fill',
                    path: '/role',
                    showMenu: true,
                },
            },
        ],
    },

    {
        path: '/menu',
        name: 'menu',
        component: () => import('@/pages/menu/index.vue'),
        meta: {
            title: '菜单',
            icon: 'icon-experiment-fill',
            path: '/menu',
            showMenu: true,
        },
        children: [
            {
                path: '/menu/list',
                name: 'menuList',
                component: () => import('@/pages/menu/list.vue'),
                meta: {
                    title: '菜单配置',
                    icon: 'icon-calendar',
                    path: '/menu/list',
                    showMenu: true,
                },
            },
            {
                path: '/menu/icon',
                name: 'menuIcon',
                component: () => import('@/pages/menu/icon.vue'),
                meta: {
                    title: '图标',
                    icon: 'icon-cloud-upload',
                    path: '/menu/icon',
                    showMenu: true,
                },
            },
        ],
    },

    {
        path: '/test',
        name: 'test',
        component: () => import('@/pages/test/index.vue'),
        meta: {
            title: '测试',
            icon: 'icon-sliders-fill',
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
                    icon: 'icon-HTML',
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
                    icon: 'icon-reddit',
                    path: '/gurd',
                    showMenu: true,
                },
            },
            {
                path: '/todo',
                name: 'todo',
                component: () => import('@/pages/test/todo/index.vue'),
                meta: {
                    title: 'todo',
                    icon: 'icon-apple-fill',
                    path: '/todo',
                    showMenu: true,
                },
            },
            {
                path: '/upload',
                name: 'upload',
                component: () => import('@/pages/test/upload/index.vue'),
                meta: {
                    title: '上传',
                    icon: 'icon-IE-circle-fill',
                    path: '/upload',
                    showMenu: true,
                },
            },
        ],
    },
];
