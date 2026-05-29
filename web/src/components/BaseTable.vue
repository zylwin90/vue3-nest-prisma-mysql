<template>
    <!-- 
            v-loading="loading"
            :element-loading-svg="$config.svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
            :element-loading-text="t('Base.Loading')" 
    
     :header-cell-style="{ color: '#2A2A2A', backgroundColor: '#F2F3F5' }"
    -->
    <div class="flex-1 flex flex-col h-full overflow-hidden">
        <el-table
            class="flex-1"
            v-bind="{ ...$attrs }"
            :data="list"
            height="100%"
            :stripe="stripe"
            :border="border"
            :header-cell-style="{ color: 'var(--el-text-color-primary)', backgroundColor: 'var(--el-bg-color-page)' }"
        >
            <slot></slot>
        </el-table>

        <el-row justify="end" class="mt-5">
            <el-pagination
                v-if="isPage"
                :current-page="pageNum"
                :page-size="pageSize"
                :pager-count="pagerCount"
                :page-sizes="[20, 50, 100]"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="pageSizeChange"
                @current-change="pageNumChange"
            />
        </el-row>
    </div>
</template>

<script setup lang="ts">
// import $config from '@/config';
// import { useI18n } from 'vue-i18n';
// const { t, locale } = useI18n();
// import { loading } from '@/utils/loading';

withDefaults(
    defineProps<{
        isPage?: boolean; //是否分页
        list: Record<string, any>[];
        total?: number;
        pageNum?: number;
        pageSize?: number;
        border?: boolean;
        stripe?: boolean;
        pagerCount?: number;
    }>(),
    {
        isPage: true,
        list: () => [],
        total: 0,
        pageNum: 1,
        pageSize: 20,
        border: false,
        stripe: true,
        pagerCount: 7,
    }
);

const emits = defineEmits(['pageSizeChange', 'pageNumChange']);

const pageSizeChange = (val: number) => {
    emits('pageSizeChange', val);
};
const pageNumChange = (val: number) => {
    emits('pageNumChange', val);
};
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
    margin-bottom: 0;
}
</style>

<style>
.page-box {
    width: 600px;
    display: flex;
    align-content: end;
    border: 1px solid red;
}
</style>
