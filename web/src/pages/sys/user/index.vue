<template>
    <div class="h-full flex flex-col">
        <SearchBar :items="items" v-model="form" @reset="reset" @search="search" />
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
            <el-table-column label="用户名称" prop="name"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="角色" prop="roleName"></el-table-column>
            <el-table-column label="创建时间" prop="createTime">
                <template #="{ row }">
                    <span>{{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改时间" prop="updateTime">
                <template #="{ row }">
                    <span>{{ dayjs(row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="在线状态" prop="line">
                <template #="{ row }">
                    <span :class="row.line == UserLineStaus.Online ? 'text-emerald-600' : 'text-red-600'">
                        {{ row.line == UserLineStaus.Online ? '在线' : '离线' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="用户状态" prop="status">
                <template #="{ row }">
                    <span :class="row.status == UserStaus.Normal ? 'text-emerald-600' : 'text-red-600'">
                        {{ row.status == UserStaus.Normal ? '正常' : '禁用' }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="name">
                <template #="{ row }">
                    <el-button type="danger" @click="opration('Del', row)" link>删除</el-button>
                    <el-button
                        type="warning"
                        v-if="row.status == UserStaus.Normal"
                        @click="opration('Disable', row)"
                        link
                    >
                        禁用
                    </el-button>
                    <el-button
                        type="primary"
                        v-if="row.status == UserStaus.Disable"
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
import { onMounted, ref } from 'vue';
import api from '@/apis/user';
import { UserLineStaus, UserStaus } from '@/enum/user';
import { ElMessageBox } from 'element-plus';
import { successTips } from '@/utils/utils';
import dayjs from 'dayjs';
const items = ref([
    {
        key: 'name',
        label: '用户名',
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
                value: UserStaus.ALL,
                label: '全部',
            },
            {
                value: UserStaus.Normal,
                label: '正常',
            },
            {
                value: UserStaus.Disable,
                label: '禁用',
            },
        ],
    },
]);

const form = ref({
    status: UserStaus.ALL,
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

    const { list: l, count } = relsut.data;

    list.value = l;
    total.value = count;
};

const { total, pageNum, pageSize, pageNumChange, pageSizeChange } = usePage(getList);

const opration = (val: string, row: any) => {
    switch (val) {
        case 'Del':
            ElMessageBox.confirm('确定要删除当前用户？', '提示', {
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
            ElMessageBox.confirm('确定要禁用当前用户？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                api.update({ id: row.id, status: UserStaus.Disable }).then(res => {
                    if (!res || res.code != 1) return;
                    successTips('已禁用');
                    getList();
                });
            });
            break;
        case 'Normal':
            ElMessageBox.confirm('确定要启用当前用户？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                api.update({ id: row.id, status: UserStaus.Normal }).then(res => {
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
    form.value.status = UserStaus.ALL;
    form.value.name = '';
    form.value.email = '';
};
const search = () => {
    getList();
};

onMounted(() => {
    getList();
});
</script>

<style scoped lang="scss"></style>
