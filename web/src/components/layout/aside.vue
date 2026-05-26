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
import { useRoute } from 'vue-router';
import Menu from './menu.vue';
const route: any = useRoute();

import { asyncRoute } from '@/router/async';
</script>

<style scoped lang="scss">
.el-menu {
    height: calc(100% - 60px);
    border-right: none;
}
</style>
