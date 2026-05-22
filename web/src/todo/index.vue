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
                <el-button type="danger" style="margin-left: 20px" @click="goOut">退出登录</el-button>
            </el-form>

            <el-table class="table" :data="list" border style="width: 100%">
                <el-table-column label="序号" width="70" fixed align="center">
                    <template #="scope">
                        {{ (currentPage - 1) * pageSize + (scope.$index + 1) }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="todu名称" min-width="130" show-overflow-tooltip />
                <el-table-column prop="remark" label="备注" min-width="200" show-overflow-tooltip />
                <el-table-column prop="createTime" label="创建时间">
                    <template #="{ row }">
                        <span>{{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                    <template #="{ row }">
                        <span>{{ dayjs(row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="状态" label="状态" fixed="right">
                    <template #="{ row }">
                        <span :style="{ color: row.status == 1 ? 'red' : 'green' }">
                            {{ row.status == 1 ? '未完成' : '完成' }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="操作" label="操作" fixed="right">
                    <template #="{ row }">
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
        <el-form :model="addFrom" :rules="rules" ref="formRef" label-width="auto">
            <el-form-item label="tuto名称" prop="name">
                <el-input v-model="addFrom.name" placeholder="请输入" />
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
        <el-form :model="editForm" :rules="rules" ref="formRef" label-width="auto">
            <el-form-item label="tuto名称" prop="name">
                <el-input v-model="editForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="editForm.status" placeholder="请选择状态">
                    <el-option :label="p.label" :value="p.value" v-for="(p, i) in editStatusList" />
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="editForm.remark" placeholder="请输入" type="textarea" :rows="5" />
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
import { onMounted, reactive, ref } from 'vue';
import api from '@/apis/todo';
import { successTips } from '@/utils/utils';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
const router = useRouter();
const formRef = ref<FormInstance>();
const form = reactive({
    name: '',
    status: 0,
});

const addFrom = reactive({
    name: '',
});

const editForm = reactive({
    id: '',
    name: '',
    status: 1,
    remark: '',
});

const statusList = [
    {
        value: 0,
        label: '全部',
    },
    {
        value: 1,
        label: '未完成',
    },
    {
        value: 2,
        label: '完成',
    },
];

const editStatusList = [
    {
        value: 1,
        label: '未完成',
    },
    {
        value: 2,
        label: '完成',
    },
];

const list = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const getList = () => {
    const json = {
        name: form.name,
        status: form.status,
        currentPage: currentPage.value,
        pageSize: pageSize.value,
    };
    api.getList(json).then(res => {
        if (!res || res.code != 1) return;
        const { list: l, total: t } = res.data;
        list.value = l;
        total.value = t;
    });
};

const dialogAdd = ref(false);
const addHandle = () => {
    addFrom.name = '';
    dialogAdd.value = true;
};
const add = async () => {
    try {
        await formRef.value?.validate();
        api.add({ name: addFrom.name }).then(res => {
            if (!res || res.code != 1) return;
            dialogAdd.value = false;
            successTips('新增成功');

            getList();
        });
    } catch (error) {}
};

const dialogEdit = ref(false);
const editHande = (row: any) => {
    api.detail(row.id).then(res => {
        if (!res || res.code != 1) return;
        editForm.id = res.data.id;
        editForm.name = res.data.name;
        editForm.status = res.data.status;
        editForm.remark = res.data.remark;
        dialogEdit.value = true;
    });
};
const edit = async () => {
    try {
        await formRef.value?.validate();
        api.put(editForm).then(res => {
            if (!res || res.code != 1) return;
            dialogEdit.value = false;
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

import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const goOut = () => {
    userStore.resets();
    router.push('/');
};
onMounted(() => {
    getList();
});

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
