<template>
    <div class="box">
        <el-card>
            <p style="text-align: center; color: #000; font-weight: 700; padding: 10px 0">登录</p>
            <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入" type="password" />
                </el-form-item>

                <el-form-item label=" ">
                    <el-button type="primary" @click="login" :loading="loading">登录</el-button>
                </el-form-item>

                <div style="text-align: center">
                    <el-button link type="primary" @click="register">还有没有账号，去注册</el-button>
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
    email: '',
    password: '',
});
const loading = ref(false);

const login = async () => {
    try {
        await formRef.value?.validate();
        loading.value = true;
        api.login(form)
            .then(res => {
                if (!res || res.code != 1) {
                    return;
                }
                const { access_token, userInfo } = res.data;
                userStore.setToken(access_token);
                userStore.setUserInfo(userInfo);
                successTips('登录成功');
                router.push('/todo');
            })
            .finally(() => {
                loading.value = false;
            });
    } catch (error) {}
};

const register = () => {
    router.push('/register');
};

const rules = reactive({
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
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
