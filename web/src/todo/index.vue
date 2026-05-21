<template>
    <el-card class="card">
        <div class="box">
            <el-form :model="form" label-width="auto" style="display: flex">
                <el-form-item label="tuto名称" style="width: 300px">
                    <el-input v-model="form.name" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="状态" style="width: 300px">
                    <el-select v-model="form.status" placeholder="请选择状态">
                        <el-option :label="p.label" :value="p.value" v-for="(p, i) in statusList" />
                    </el-select>
                </el-form-item>

                <el-button type="primary" style="margin-left: 20px" @click="getList">查询</el-button>
                <el-button type="warning" style="margin-left: 20px" @click="addHandle">新增</el-button>
            </el-form>

            <el-table class="table" :data="list" border style="width: 100%">
                <el-table-column prop="ID" label="ID" width="180" />
                <el-table-column prop="todu名称" label="todu名称" min-width="180" />
                <el-table-column prop="创建时间" label="创建时间" />
                <el-table-column prop="更新时间" label="更新时间" />
                <el-table-column prop="状态" label="状态" />
                <el-table-column prop="操作" label="操作">
                    <template #="{ row }">
                        <el-button link type="primary" @click="detailHande(row)">详情</el-button>
                        <el-button link type="warning" @click="editHande(row)">编辑</el-button>
                        <el-button link type="danger" @click="delHande(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-row justify="end" style="margin-top: 20px">
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    layout="prev, pager, next, jumper"
                    :total="total"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </el-row>
        </div>
    </el-card>

    <el-dialog v-model="dialogAdd" title="新增" width="500">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
            <el-form-item label="tuto名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogAdd = false">取消</el-button>
                <el-button type="primary" @click="add">确认</el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogEdit" title="编辑" width="500">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
            <el-form-item label="tuto名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择状态">
                    <el-option :label="p.label" :value="p.value" v-for="(p, i) in statusList" />
                </el-select>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogEdit = false">取消</el-button>
                <el-button type="primary" @click="edit">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import api from '@/apis/todo';
import baseApi from '@/apis/login';
import { successTips } from '@/utils/utils';

import { useRouter } from 'vue-router';
import { ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
const router = useRouter();
const formRef = ref<FormInstance>();
const form = reactive({
    name: '',
    status: 0,
});

const statusList = [
    {
        value: 0,
        label: '全部',
    },
    {
        value: 1,
        label: '完成',
    },
    {
        value: 2,
        label: '未完成',
    },
];

const list = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const getList = () => {
    // api.getList(form).then(res => {
    //     console.log(res);
    // });

    baseApi.getUserInfo({ name: 'zyl' }).then(res => {
        console.log(res);
    });
};

const dialogAdd = ref(false);
const addHandle = () => {
    dialogAdd.value = true;
};
const add = async () => {
    try {
        await formRef.value?.validate();
        api.add({ name: form.name }).then(res => {
            if (!res || res.code != 1) return;
            successTips('新增成功');
            getList();
        });
    } catch (error) {}
};
const detailHande = (row: any) => {
    router.push({
        path: '/detail',
        query: { id: row.id },
    });
};

const dialogEdit = ref(false);
const editHande = (row: any) => {
    dialogEdit.value = true;
};
const edit = async () => {
    try {
        await formRef.value?.validate();
        api.put(form).then(res => {
            if (!res || res.code != 1) return;
            successTips('修改成功');
            getList();
        });
    } catch (error) {}
};
const delHande = (row: any) => {
    ElMessageBox.confirm('确定要删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        api.del(row.id).then(res => {
            successTips('已删除');
            getList();
        });
    });
};

const handleSizeChange = (val: number) => {
    pageSize.value = val;
    getList();
};
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
    getList();
};

const rules = reactive({
    name: [{ required: true, message: '请输入todu名称', trigger: 'blur' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
});
</script>

<style scoped lang="scss">
.card {
    height: 100%;
}
.box {
    display: flex;
    flex-direction: column;
    height: 100%;
    .table {
        flex: 1;
    }
}
</style>
