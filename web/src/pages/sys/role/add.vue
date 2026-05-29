<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
        <el-form-item label="角色名称" prop="name">
            <el-input v-model.trim="form.name" maxlength="50" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model.trim="form.remark" maxlength="50" type="textarea" :rows="2" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="权限" prop="authList">
            <el-tree ref="treeRef" default-expand-all :data="treeData" node-key="id" show-checkbox />
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { computed, h, nextTick, onMounted, reactive, ref, watch } from 'vue';
import api from '@/apis/role';
import { ElIcon, type FormInstance, type TreeInstance } from 'element-plus';
import { successTips } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { asyncRoutes } from '@/router/routes/asyncRoutes';
// console.log(asyncRoutes,'===');

const router = useRouter();
const { unmount, getList } = defineProps(['unmount', 'getList']);

const treeData = ref<any>([
    {
        id: 'all',
        label: '全部',
        children: [],
    },
]);

const formRef = ref<FormInstance>();
const treeRef = ref<TreeInstance>();

const form = reactive<any>({
    name: '', // 权限组名称
    authList: [], // 权限Id集合
    halfCheckedKeys: [], // 半选中的key
    remark: '', // 备注
});

const onSubmit = async () => {
    form.authList = await getTreeData();
    await formRef.value?.validate();

    const res = await api.add(form);
    if (!res || res.code != 1) return;
    successTips('操作成功');
    unmount();
    getList();
};

// 获取tree数据
const getTreeData = async () => {
    await nextTick();
    form.halfCheckedKeys = treeRef.value?.getHalfCheckedKeys();
    const checkedKeys: any = treeRef.value?.getCheckedKeys();
    return [...form.halfCheckedKeys, ...checkedKeys].filter((p: any) => p != 'all' && p != '/home');
};

const filterTree = (tree: any) => {
    return tree.map((p: any) => {
        return {
            id: p.path,
            label: p.meta.title,
            disabled: p.path === '/home',
            children: p.children && filterTree(p.children),
        };
    });
};

const initData = async () => {
    treeData.value[0].children.push(...filterTree(asyncRoutes));
    await nextTick();
    treeRef.value?.setCheckedKeys(['/home']);
};

initData();

const checkAccess = (rule: any, value: string, callback: any) => {
    if (!value) {
        return callback(new Error('请选择权限'));
    } else {
        callback();
    }
};

defineExpose({
    onSubmit,
});

const rules = {
    name: [{ required: true, message: '角色名字不能为空', trigger: 'blur' }],

    authList: [
        { required: true, message: '权限不能为空', trigger: 'blur' },
        { validator: checkAccess, trigger: 'blur' },
    ],
};
</script>
