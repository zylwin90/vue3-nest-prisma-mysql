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
            <el-table-column label="用户名称" prop="name" show-overflow-tooltip min-width="180"></el-table-column>
            <el-table-column label="邮箱" prop="email" show-overflow-tooltip min-width="180"></el-table-column>
            <el-table-column label="角色" prop="roleName" show-overflow-tooltip min-width="180"></el-table-column>
            <el-table-column label="创建时间" prop="email" show-overflow-tooltip min-width="180"></el-table-column>
            <el-table-column label="修改时间" prop="email" show-overflow-tooltip min-width="180"></el-table-column>
            <el-table-column label="状态" prop="name" show-overflow-tooltip min-width="180"></el-table-column>
            <el-table-column label="操作" prop="name" show-overflow-tooltip min-width="180"></el-table-column>
        </BaseTable>
    </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import BaseTable from '@/components/BaseTable.vue';
import { usePage } from '@/hooks/usePage';
import { ref } from 'vue';
import api from '@/apis/user';

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
                value: 0,
                label: '全部',
            },
            {
                value: 1,
                label: '正常',
            },
            {
                value: 2,
                label: '禁用',
            },
        ],
    },
]);

const form = ref({
    status: 0,
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

const reset = () => {
    form.value.status = 0;
    form.value.name = '';
    form.value.email = '';
};
const search = () => {};
</script>

<style scoped lang="scss"></style>
