<template>
    <div class="todo-app">
        <!-- 头部 -->
        <el-card class="header-card" shadow="never">
            <div class="header-content">
                <h1 class="main-title">Tasks</h1>
                <p class="subtitle">Organize your day, focus on what matters</p>
            </div>
        </el-card>

        <!-- 操作区域 -->
        <el-card class="action-card" shadow="never">
            <div class="action-bar">
                <!-- 添加按钮 -->
                <el-button type="primary" :icon="Plus" @click="handleAdd">添加任务</el-button>

                <!-- 批量操作区域 -->
                <template v-if="selectedRows.length > 0">
                    <el-divider direction="vertical" />
                    <span class="selected-info">已选择 {{ selectedRows.length }} 项</span>
                    <el-button type="success" :icon="CircleCheck" @click="handleBatchComplete">批量完成</el-button>
                    <el-button type="warning" :icon="RefreshLeft" @click="handleBatchIncomplete">批量未完成</el-button>
                    <el-button type="danger" :icon="Delete" @click="handleBatchDelete">批量删除</el-button>
                </template>

                <div class="spacer"></div>

                <!-- 刷新按钮 -->
                <el-button :icon="Refresh" circle @click="handleRefresh" />
            </div>
        </el-card>

        <!-- 表格区域 -->
        <el-card class="table-card" shadow="never">
            <el-table ref="tableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <!-- 多选列 -->
                <el-table-column type="selection" width="55" />

                <!-- 状态列 -->
                <el-table-column label="状态" width="80" align="center">
                    <template #default="{ row }">
                        <el-tag :type="row.completed ? 'success' : 'info'" size="small">
                            {{ row.completed ? '已完成' : '进行中' }}
                        </el-tag>
                    </template>
                </el-table-column>

                <!-- 任务内容列 -->
                <el-table-column prop="title" label="任务内容" min-width="200">
                    <template #default="{ row }">
                        <span :class="{ 'completed-text': row.completed }">{{ row.title }}</span>
                    </template>
                </el-table-column>

                <!-- 分类列 -->
                <el-table-column prop="category" label="分类" width="100">
                    <template #default="{ row }">
                        <el-tag :type="getCategoryType(row.category)" size="small">
                            {{ row.category }}
                        </el-tag>
                    </template>
                </el-table-column>

                <!-- 创建时间列 -->
                <el-table-column prop="createTime" label="创建时间" width="180" />

                <!-- 操作列 -->
                <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{ row }">
                        <el-button type="primary" link :icon="Edit" size="small" @click="handleEdit(row)">
                            编辑
                        </el-button>
                        <el-button
                            type="success"
                            link
                            :icon="row.completed ? RefreshLeft : CircleCheck"
                            size="small"
                            @click="handleToggleComplete(row)"
                        >
                            {{ row.completed ? '重做' : '完成' }}
                        </el-button>
                        <el-button type="danger" link :icon="Delete" size="small" @click="handleDelete(row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 统计区域 -->
        <el-card class="stats-card" shadow="never">
            <div class="stats-content">
                <div class="stat-item">
                    <div class="stat-value completed">{{ completedCount }}</div>
                    <div class="stat-label">已完成</div>
                </div>
                <el-divider direction="vertical" />
                <div class="stat-item">
                    <div class="stat-value pending">{{ pendingCount }}</div>
                    <div class="stat-label">待处理</div>
                </div>
                <el-divider direction="vertical" />
                <div class="stat-item">
                    <div class="stat-value total">{{ totalCount }}</div>
                    <div class="stat-label">总计</div>
                </div>
            </div>
        </el-card>

        <!-- 添加/编辑对话框 -->
        <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑任务' : '添加任务'" width="500px" @close="resetForm">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
                <el-form-item label="任务内容" prop="title">
                    <el-input v-model="form.title" placeholder="请输入任务内容" clearable />
                </el-form-item>
                <el-form-item label="分类" prop="category">
                    <el-select v-model="form.category" placeholder="请选择分类" style="width: 100%">
                        <el-option label="工作" value="工作" />
                        <el-option label="学习" value="学习" />
                        <el-option label="生活" value="生活" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleConfirm">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Edit, Delete, Refresh, CircleCheck, RefreshLeft } from '@element-plus/icons-vue';
import { apiDel, apiGet, apiPatch, apiPost } from '@/http/index';

// 表格数据
const tableData = ref([]);

// 选中的行
const selectedRows = ref([]);

// 表格引用
const tableRef = ref(null);

// 对话框控制
const dialogVisible = ref(false);
const isEdit = ref(false);

// 表单数据
const form = ref({
    id: null,
    title: '',
    category: '',
});

// 表单验证规则
const rules = {
    title: [{ required: true, message: '请输入任务内容', trigger: 'blur' }],
    category: [{ required: true, message: '请选择分类', trigger: 'change' }],
};

// 表单引用
const formRef = ref(null);

// 计算统计数据
const completedCount = computed(() => tableData.value.filter(item => item.completed).length);
const pendingCount = computed(() => tableData.value.filter(item => !item.completed).length);
const totalCount = computed(() => tableData.value.length);

// 获取分类标签类型
const getCategoryType = category => {
    const typeMap = {
        工作: 'danger',
        学习: 'warning',
        生活: 'success',
    };
    return typeMap[category] || 'info';
};

// 选择变化处理
const handleSelectionChange = selection => {
    selectedRows.value = selection;
};

// 重置表单
const resetForm = () => {
    form.value = {
        id: null,
        title: '',
        category: '',
    };
    isEdit.value = false;
    formRef.value?.resetFields();
};

// ========== API 接口 - 请在此处实现你的 API 调用 ==========

// 获取列表数据
const getList = async () => {
    // TODO: 调用你的 API
    console.log('获取列表数据');
    const res = await apiGet('/api/todu');
    console.log(res);
};

// 添加任务
const addTask = async data => {
    // TODO: 调用你的 API
    delete data.id; 
    console.log('添加任务:', data);
    const res = await apiPost('/api/todo', data);
    console.log(res);
};

// 编辑任务
const editTask = async data => {
    // TODO: 调用你的 API
    console.log('编辑任务:', data);
};

// 删除任务
const deleteTask = async id => {
    // TODO: 调用你的 API
    console.log('删除任务:', id);
    const res = await apiDel('/api/todo');
};

// 批量删除
const batchDeleteTask = async ids => {
    // TODO: 调用你的 API
    console.log('批量删除任务:', ids);
    const res = await apiPost('/api/todo', { ids });
    console.log(res);
};

// 切换完成状态
const toggleCompleteTask = async (id, completed) => {
    // TODO: 调用你的 API
    console.log('切换完成状态:', id, completed);
    const res = await apiPatch('/api.todo', { id, completed });
};

// 批量完成
const batchCompleteTask = async ids => {
    // TODO: 调用你的 API
    console.log('批量完成任务:', ids);
    const res = await apiPatch('/api.todo', { ids, completed: true });
};

// 批量未完成
const batchIncompleteTask = async ids => {
    // TODO: 调用你的 API
    console.log('批量未完成任务:', ids);
    const res = await apiPatch('/api.todo', { ids, completed: false });
};

// ========================================================

// 添加按钮
const handleAdd = () => {
    resetForm();
    dialogVisible.value = true;
};

// 编辑按钮
const handleEdit = row => {
    isEdit.value = true;
    form.value = {
        id: row.id,
        title: row.title,
        category: row.category,
    };
    dialogVisible.value = true;
};

// 删除按钮
const handleDelete = async row => {
    try {
        await ElMessageBox.confirm('确定要删除该任务吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });
        await deleteTask(row.id);
        ElMessage.success('删除成功');
        // 刷新列表（API 调用后）
        // await getList()
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage.error('删除失败');
        }
    }
};

// 切换完成状态
const handleToggleComplete = async row => {
    try {
        await toggleCompleteTask(row.id, !row.completed);
        ElMessage.success(row.completed ? '已标记为未完成' : '已标记为完成');
        // 刷新列表（API 调用后）
        // await getList()
    } catch (error) {
        ElMessage.error('操作失败');
    }
};

// 批量完成
const handleBatchComplete = async () => {
    try {
        const ids = selectedRows.value.map(row => row.id);
        await batchCompleteTask(ids);
        ElMessage.success('批量完成成功');
        tableRef.value?.clearSelection();
        // 刷新列表（API 调用后）
        // await getList()
    } catch (error) {
        ElMessage.error('批量完成失败');
    }
};

// 批量未完成
const handleBatchIncomplete = async () => {
    try {
        const ids = selectedRows.value.map(row => row.id);
        await batchIncompleteTask(ids);
        ElMessage.success('批量未完成成功');
        tableRef.value?.clearSelection();
        // 刷新列表（API 调用后）
        // await getList()
    } catch (error) {
        ElMessage.error('批量未完成失败');
    }
};

// 批量删除
const handleBatchDelete = async () => {
    try {
        await ElMessageBox.confirm(`确定要删除选中的 ${selectedRows.value.length} 项任务吗？`, '批量删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });
        const ids = selectedRows.value.map(row => row.id);
        await batchDeleteTask(ids);
        ElMessage.success('批量删除成功');
        tableRef.value?.clearSelection();
        // 刷新列表（API 调用后）
        // await getList()
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage.error('批量删除失败');
        }
    }
};

// 刷新
const handleRefresh = async () => {
    await getList();
    ElMessage.success('刷新成功');
};

// 确认添加/编辑
const handleConfirm = async () => {
    if (!formRef.value) return;

    await formRef.value.validate(async valid => {
        if (valid) {
            try {
                if (isEdit.value) {
                    await editTask(form.value);
                    ElMessage.success('编辑成功');
                } else {
                    await addTask(form.value);
                    ElMessage.success('添加成功');
                }
                dialogVisible.value = false;
                // 刷新列表（API 调用后）
                // await getList()
            } catch (error) {
                ElMessage.error(isEdit.value ? '编辑失败' : '添加失败');
            }
        }
    });
};

// 初始化默认数据
const initData = () => {
    tableData.value = [
        {
            id: 1,
            title: '完成项目文档',
            category: '工作',
            completed: true,
            createTime: '2026-03-16 09:00:00',
        },
        {
            id: 2,
            title: '学习 Vue3 新特性',
            category: '学习',
            completed: false,
            createTime: '2026-03-16 10:30:00',
        },
        {
            id: 3,
            title: '健身锻炼',
            category: '生活',
            completed: false,
            createTime: '2026-03-16 14:00:00',
        },
    ];
};

onMounted(() => {
    initData();
    // 实际使用时取消下面的注释来加载数据
    // getList()
});
</script>

<style scoped>
.todo-app {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
}

.header-card {
    margin-bottom: 20px;
}

.header-content {
    text-align: center;
}

.main-title {
    font-size: 36px;
    font-weight: 800;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.subtitle {
    font-size: 16px;
    color: #94a3b8;
    margin: 0;
}

.action-card {
    margin-bottom: 20px;
}

.action-bar {
    display: flex;
    align-items: center;
    gap: 12px;
}

.spacer {
    flex: 1;
}

.selected-info {
    font-size: 14px;
    color: #6366f1;
    margin: 0 4px;
}

.table-card {
    margin-bottom: 20px;
}

.completed-text {
    text-decoration: line-through;
    opacity: 0.5;
}

.stats-card {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
}

.stats-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
}

.stat-item {
    text-align: center;
}

.stat-value {
    font-size: 32px;
    font-weight: 700;
    line-height: 1;
}

.stat-value.completed {
    background: linear-gradient(135deg, #10b981, #34d399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.stat-value.pending {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.stat-value.total {
    background: linear-gradient(135deg, #6366f1, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.stat-label {
    font-size: 14px;
    color: #94a3b8;
    margin-top: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

@media (max-width: 768px) {
    .todo-app {
        margin: 20px auto;
        padding: 0 10px;
    }

    .main-title {
        font-size: 28px;
    }

    .action-bar {
        flex-wrap: wrap;
    }

    .stats-content {
        gap: 20px;
    }

    .stat-value {
        font-size: 24px;
    }
}
</style>
