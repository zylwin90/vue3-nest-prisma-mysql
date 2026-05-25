<template>
  <div> <el-button type="primary" @click="testHandle">测试</el-button></div>
</template>

<script setup lang="ts">
import api from '@/apis/test'
const testHandle = () => {
    api.getList().then(res => {
        console.log(res);
        
    })
}
</script>

<style scoped lang="scss">
</style>
