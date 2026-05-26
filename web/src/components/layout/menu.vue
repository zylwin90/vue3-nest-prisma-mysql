<template>
    <template v-for="(item, index) in list" :key="index">
        <el-menu-item :index="item.path" v-if="item.meta.showMenu && !item.children">
            <Icon :icon="item.meta.icon" />
            <template #title>
                <span class="ml-2.5">{{ item.meta.title }}</span>
            </template>
        </el-menu-item>

        <el-sub-menu v-if="item.children && item.children.length && item.meta.showMenu" :index="item.path">
            <template #title>
                <Icon :icon="item.meta.icon" v-if="item.meta.icon" />
                <span class="ml-2.5">
                    {{ item.meta.title }}
                </span>
            </template>
            <Menu :list="item.children" />
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineOptions({
    name: 'Menu',
});
const props = defineProps(['list']);
</script>

<style scoped lang="scss"></style>
