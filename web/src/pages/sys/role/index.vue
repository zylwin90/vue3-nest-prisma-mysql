<template>
    <div class="h-full flex flex-col">
        <SearchBar :items="items" v-model="form" @reset="reset" @search="search">
            <template #btn>
                <el-button type="primary" @click="opration('Add')">新增</el-button>
            </template>
        </SearchBar>
        <BaseTable
            :list="list"
            :total="total"
            :pageNum="pageNum"
            :pageSize="pageSize"
            @pageSizeChange="pageSizeChange"
            @pageNumChange="pageNumChange"
        >
            <el-table-column label="序号" prop="name" width="70" fixed align="center">
                <template #="scope">
                    {{ (pageNum - 1) * pageSize + (scope.$index + 1) }}
                </template>
            </el-table-column>
            <el-table-column label="角色名称" prop="name"></el-table-column>
            <el-table-column label="备注" prop="email"></el-table-column>
            <el-table-column label="创建时间" prop="email"></el-table-column>
            <el-table-column label="修改时间" prop="email"></el-table-column>
            <el-table-column label="状态" prop="name"></el-table-column>
            <el-table-column label="操作" prop="name">
                <template #="{ row }">
                    <el-button type="danger" @click="opration('Del', row)" link>删除</el-button>
                    <el-button
                        type="warning"
                        v-if="row.status == RoleStaus.Normal"
                        @click="opration('Disable', row)"
                        link
                    >
                        禁用
                    </el-button>
                    <el-button
                        type="primary"
                        v-if="row.status == RoleStaus.Disable"
                        @click="opration('Normal', row)"
                        link
                    >
                        启用
                    </el-button>
                </template>
            </el-table-column>
        </BaseTable>
    </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import BaseTable from '@/components/BaseTable.vue';
import { usePage } from '@/hooks/usePage';
import { ref } from 'vue';
import api from '@/apis/user';
import { RoleStaus } from '@/enum/role';
import { ElMessageBox } from 'element-plus';
import { successTips } from '@/utils/utils';
import Add from './add.vue';
import Edit from './edit.vue';
import { openDrawer } from '@/utils/openDrawer';

const items = ref([
    {
        key: 'name',
        label: '角色名称',
        type: 'input',
        placeholder: '请输入用户名',
        maxlength: 100,
        clearable: true,
    },
    {
        key: 'status',
        label: '状态',
        type: 'select',
        placeholder: '请选择状态',
        options: [
            {
                value: RoleStaus.ALL,
                label: '全部',
            },
            {
                value: RoleStaus.Normal,
                label: '正常',
            },
            {
                value: RoleStaus.Disable,
                label: '禁用',
            },
        ],
    },
]);

const form = ref({
    status: RoleStaus.ALL,
    name: '',
    email: '',
});

const list = ref([]);

const getList = async () => {
    const json = JSON.parse(JSON.stringify(form.value));
    json.pageIndex = pageNum.value;
    json.pageSize = pageSize.value;
    const relsut = await api.getList(json);
    if (!relsut || relsut.code != 1) return;

    const { data, count } = relsut.data;

    list.value = data;
    total.value = count;
};

const { total, pageNum, pageSize, pageNumChange, pageSizeChange } = usePage(getList);

const opration = (val: string, row?: any) => {
    switch (val) {
        case 'Add':
            openDrawer(Add, {}, {});
            break;
        case 'Edit':
            openDrawer(Edit, {}, {});
            break;
        case 'Del':
            ElMessageBox.confirm('确定要删除当前角色？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                api.del(row.id).then(res => {
                    if (!res || res.code != 1) return;
                    successTips('已删除');
                    getList();
                });
            });
            break;
        case 'Disable':
            ElMessageBox.confirm('确定要禁用当前角色？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                api.update({ id: row.id, status: RoleStaus.Disable }).then(res => {
                    if (!res || res.code != 1) return;
                    successTips('已禁用');
                    getList();
                });
            });
            break;
        case 'Normal':
            ElMessageBox.confirm('确定要启用当前角色？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                api.update({ id: row.id, status: RoleStaus.Normal }).then(res => {
                    if (!res || res.code != 1) return;
                    successTips('已启用');
                    getList();
                });
            });
            break;

        default:
            break;
    }
};

const reset = () => {
    form.value.status = RoleStaus.ALL;
    form.value.name = '';
    form.value.email = '';
};
const search = () => {};
</script>

<style scoped lang="scss"></style>
