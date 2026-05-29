<template>
    <el-container class="h-full">
        <el-aside width="200px">
            <Logo />
            <Aside />
        </el-aside>
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main class="main">
                <el-card class="h-full">
                    <router-view />
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Aside from './aside.vue';
import Logo from './logo.vue';
import Header from './header.vue';
</script>

<style scoped lang="scss">
.main {
    background-color: #f2f3f5;
    padding: 10px;
}
</style>
