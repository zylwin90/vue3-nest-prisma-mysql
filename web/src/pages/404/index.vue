<template>
    <div class="df fd-c jc-c ai-c h100">
        <img src="@/assets/imgs/404.svg" alt="" class="img-box" />
        <el-button style="width: 130px" type="primary" @click="router.push('/home')">返回首页</el-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped lang="scss">
.img-box {
    width: 500px;
    height: 500px;
}
</style>
