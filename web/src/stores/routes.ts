import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';

export const useRoutesStore = defineStore('routes', () => {
    const asyncRoutes = ref<RouteRecordRaw[] | null>();
    const authList = ref<string[] | null>();
    const setAsyncRoutes = (routes: RouteRecordRaw[]) => {
        asyncRoutes.value = routes;
    };
    const setAuthList = (list: string[]) => {
        authList.value = list;
    };

    const $reset = () => {
        asyncRoutes.value = null;
        authList.value = null;
    };

    return { asyncRoutes, setAsyncRoutes, $reset, authList, setAuthList };
});
