<template>
    <div class="box">
        <el-card>
            <p style="text-align: center; color: #000; font-weight: 700; padding: 10px 0">注册</p>
            <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
                <el-form-item label="账号" prop="name">
                    <el-input v-model="form.name" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入" type="password" />
                </el-form-item>

                <el-form-item label=" ">
                    <el-button type="primary" @click="login" :loading="loading">注册</el-button>
                </el-form-item>

                <div style="text-align: center">
                    <el-button link type="primary" @click="router.go(-1)">不想注册了，返回</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import api from '@/apis/login';
import { errorTips, successTips } from '@/utils/utils';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

const formRef = ref<FormInstance>();
const form = reactive({
    name: '',
    password: '',
    email: '',
});
const loading = ref(false);

const login = async () => {
    try {
        await formRef.value?.validate();
        loading.value = true;
        api.register(form)
            .then(res => {
                if (!res || res.code != 1) {
                    return;
                }
                successTips('注册成功');
                router.push('/');
            })
            .finally(() => {
                loading.value = false;
            });
    } catch (error) {}
};

const rules = reactive({
    name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
});
</script>

<style scoped lang="scss">
.box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
