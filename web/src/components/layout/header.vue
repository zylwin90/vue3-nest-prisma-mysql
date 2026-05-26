<template>
    <el-breadcrumb :separator-icon="ArrowRight" class="h-full flex items-center border-b-1">
        <el-breadcrumb-item :to="p.path" v-for="(p, i) in breadcrumbList">{{ p.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { computed } from 'vue';

import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.matched, '===');

const breadcrumbList = computed(() => {
    return route.matched.filter((p: any) => p.path != '/layout');
});
</script>

<style scoped lang="scss"></style>
