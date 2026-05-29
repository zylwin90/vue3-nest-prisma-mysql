<template>
    <div class="h-full flex items-center justify-between">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="p.path" v-for="(p, i) in breadcrumbList">{{ p.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="flex items-center space-x-3">
            <img src="@/assets/imgs/avatar.png" alt="" class="w-8" />
            <el-dropdown @command="handleCommand">
                <span class="flex">
                    {{ userStore.userInfo?.name }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="1">忘记密码</el-dropdown-item>
                        <el-dropdown-item command="2">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight, ArrowDown } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const breadcrumbList = computed(() => {
    return route.matched.filter((p: any) => p.path != '/layout');
});

const handleCommand = (command: string) => {
    switch (command) {
        case '1':
            break;

        case '2':
            userStore.resets();
            router.push('/');
            break;

        default:
            break;
    }
};
</script>

<style scoped lang="scss"></style>
