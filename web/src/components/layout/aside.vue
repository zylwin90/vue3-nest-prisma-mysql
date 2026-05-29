<template>
    <el-menu
        class="el-menu"
        active-text-color="#ffd04b"
        background-color="#303133"
        router
        unique-opened
        :default-active="route.meta.path"
        text-color="#fff"
    >
        <Menu :list="asyncRoute" />
    </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRoutesStore } from '@/stores/routes';
import Menu from './menu.vue';

const route: any = useRoute();
const routesStore = useRoutesStore();
const asyncRoute = computed(() => routesStore.asyncRoutes || []);
</script>

<style scoped lang="scss">
.el-menu {
    height: calc(100% - 60px);
    border-right: none;
}
</style>
