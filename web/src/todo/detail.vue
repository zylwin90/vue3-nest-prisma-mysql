<template>
    <div>detail</div>
</template>

<script setup lang="ts">
import api from '@/apis/login';

api.getUserInfo({ name: 'zyl' }).then(res => {
    console.log(res);
});
</script>

<style scoped lang="scss"></style>
