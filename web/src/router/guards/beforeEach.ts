import type { Router, RouteRecordRaw } from 'vue-router';
import { staticRoutes } from '../routes/staticRoutes';
import { asyncRoutes } from '../routes/asyncRoutes';
import { useUserStore } from '@/stores/user';
import { useRoutesStore } from '@/stores/routes';
import $config from '@/config/index';

/**
 * 路由前置守卫
 */

// 404路由（动态路由的时候才添加，以免，找不到路由时会跳转到404）
const NotFoundRoute = {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/404/index.vue'),
    meta: { title: '404', name: '404' },
};

let asyncRoutesLoaded = false;

export function setupBeforeEachGuard(router: Router) {
    router.beforeEach(to => {
        const isStatic = isStaticRoute(to.path, staticRoutes);

        // 静态路由直接放行，例如 login、404、403 等
        if (isStatic) {
            return true;
        }

        // 未登录，跳转登录页
        if (!isLogin()) {
            return {
                path: '/login',
                replace: true,
            };
        }

        // 已经添加过动态路由，直接放行
        if (asyncRoutesLoaded) {
            return true;
        }

        const routesStore = useRoutesStore();

        const newAsyncRoutes = filterAsyncRoutes(asyncRoutes) as RouteRecordRaw[];

        routesStore.setAsyncRoutes(newAsyncRoutes);

        // 动态添加 layout 子路由
        newAsyncRoutes.forEach(route => {
            if (route.name && !router.hasRoute(route.name)) {
                router.addRoute('layout', route);
            }
        });

        // 404 路由要最后添加，避免提前匹配
        if (NotFoundRoute.name && !router.hasRoute(NotFoundRoute.name)) {
            router.addRoute(NotFoundRoute);
        }

        asyncRoutesLoaded = true;

        // 关键：动态路由添加后，需要重新进入当前地址
        return {
            ...to,
            replace: true,
        };
    });
}
/**
 * 是否登录
 */
function isLogin() {
    const userStore = useUserStore();
    return userStore.token;
}

/**
 * 是否为静态路由
 */
function isStaticRoute(path: string, routes: RouteRecordRaw[]): boolean {
    return routes.some(route => {
        if (route.path === path) return true;
        if (route.children?.length) return isStaticRoute(path, route.children);
        return false;
    });
}

/**
 * 动态路由过滤
 */

function filterAsyncRoutes(asyncRoutes: RouteRecordRaw[]) {
    const routesStore = useRoutesStore();
    // 是否需要路由权限
    if ($config.RouterPermission) {
        return filterRoutesByAuth(asyncRoutes, routesStore.authList!);
    } else {
        return asyncRoutes;
    }
}

/**
 * 递归处理动态路由
 */

function filterRoutesByAuth(routes: RouteRecordRaw[], authList: string[]) {
    return routes.reduce((acc, route: RouteRecordRaw) => {
        const hasValidAuth =
            (route.meta?.auth && authList.includes(route.meta.auth as string)) || route.name === 'home';

        if (route.children?.length) {
            const filteredChildren = filterRoutesByAuth(route.children, authList);

            if (hasValidAuth || filteredChildren.length) {
                acc.push({
                    ...route,
                    children: filteredChildren,
                });
            }
        } else if (hasValidAuth) {
            acc.push(route);
        }

        return acc;
    }, [] as RouteRecordRaw[]);
}
