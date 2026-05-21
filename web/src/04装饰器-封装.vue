<template>
    <div></div>
</template>

<script setup lang="ts">
import axios from 'axios';

const Get = (url: string): MethodDecorator => {
    return (target, key, descriptor: PropertyDescriptor) => {
        const fnc = descriptor.value;
        axios
            .get(url)
            .then(res => {
                fnc(res, {
                    status: 200,
                });
            })
            .catch(e => {
                fnc(e, {
                    status: 500,
                });
            });
    };
};

//定义控制器
class Controller {
    constructor() {}
    @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
    getList(res: any, status: any) {
        console.log(res.data.result.list, status);
    }
}


</script>

<style scoped lang="scss"></style>
