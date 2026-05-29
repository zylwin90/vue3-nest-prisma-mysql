<template>
    <!-- 
    xs <768px
    sm ≥768px
    md ≥992px
    lg ≥1200px
    xl ≥1920px
   -->
    <section class="search-bar">
        <ElForm
            ref="formRef"
            label-width="auto"
            class="flex-1"
            :model="formData"
            :label-position="labelPosition"
            v-bind="{ ...$attrs }"
        >
            <ElRow :gutter="gutter">
                <ElCol
                    v-for="item in visibleFormItems"
                    :key="item.key"
                    :xs="24"
                    :sm="12"
                    :md="8"
                    :lg="8"
                    :xl="item.span || span"
                >
                    <ElFormItem :label="item.label" :prop="item.key" :label-width="item.labelWidth || 'auto'">
                        <component :is="renderComponent(item)" class="w-full">
                            <!-- 下拉选择 -->
                            <template v-if="item.type === 'select' && getProps(item)?.options">
                                <ElOption
                                    v-for="option in getProps(item).options"
                                    v-bind="option"
                                    :key="option.value"
                                />
                            </template>

                            <!-- 复选框组 -->
                            <template v-if="item.type === 'checkboxgroup' && getProps(item)?.options">
                                <ElCheckbox
                                    v-for="option in getProps(item).options"
                                    v-bind="option"
                                    :key="option.value"
                                />
                            </template>

                            <!-- 单选框组 -->
                            <template v-if="item.type === 'radiogroup' && getProps(item)?.options">
                                <ElRadio v-for="option in getProps(item).options" v-bind="option" :key="option.value" />
                            </template>

                            <!-- 动态插槽支持 -->
                            <template v-for="(slotFn, slotName) in getSlots(item)" :key="slotName" #[slotName]>
                                <component :is="slotFn" />
                            </template>
                        </component>
                    </ElFormItem>
                </ElCol>
                <ElCol :xs="24" :sm="24" :md="span" :lg="span" :xl="span" class="action-column">
                    <div class="df jc-end" :style="actionButtonsStyle">
                        <div class="df">
                            <ElButton v-if="showSearch" type="primary" @click="handleSearch" :disabled="disabledSearch">
                                检索
                            </ElButton>
                            <ElButton v-if="showReset" @click="handleReset">重置</ElButton>
                            <ElButton
                                type="warning"
                                :disabled="!total"
                                v-if="showExport && isAuth"
                                @click="handleExport"
                            >
                                导出
                            </ElButton>
                        </div>
                        <div v-if="shouldShowExpandToggle" class="filter-toggle" @click="toggleExpand">
                            <span>{{ expandToggleText }}</span>
                            <div class="icon-wrapper">
                                <ElIcon>
                                    <ArrowUpBold v-if="isExpanded" />
                                    <ArrowDownBold v-else />
                                </ElIcon>
                            </div>
                        </div>
                    </div>
                </ElCol>
            </ElRow>
        </ElForm>

        <div class="ml-2.5">
            <slot name="btn"></slot>
        </div>
    </section>
</template>

<script setup lang="ts">
import {
    ElCascader,
    ElCheckbox,
    ElCheckboxGroup,
    ElDatePicker,
    ElForm,
    ElInput,
    ElInputNumber,
    ElRadioGroup,
    ElRate,
    ElSelect,
    ElSlider,
    ElSwitch,
    ElTimePicker,
    ElTimeSelect,
    ElTreeSelect,
    type FormInstance,
} from 'element-plus';
import {
    computed,
    ref,
    toRefs,
    useTemplateRef,
    watch,
    type VNode,
    withDirectives,
    resolveDirective,
    h,
    type Component,
    type Directive,
} from 'vue';
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue';
// import { useI18n } from 'vue-i18n';
// const { t } = useI18n();
// import { useRoutesStore } from '@/stores/routes';
// const { authList } = useRoutesStore();

const authList: any = [];

const componentMap = {
    input: ElInput, // 输入框
    number: ElInputNumber, // 数字输入框
    select: ElSelect, // 选择器
    switch: ElSwitch, // 开关
    checkbox: ElCheckbox, // 复选框
    checkboxgroup: ElCheckboxGroup, // 复选框组
    radiogroup: ElRadioGroup, // 单选框组
    date: ElDatePicker, // 日期选择器
    daterange: ElDatePicker, // 日期范围选择器
    datetime: ElDatePicker, // 日期时间选择器
    datetimerange: ElDatePicker, // 日期时间范围选择器
    rate: ElRate, // 评分
    slider: ElSlider, // 滑块
    cascader: ElCascader, // 级联选择器
    timepicker: ElTimePicker, // 时间选择器
    timeselect: ElTimeSelect, // 时间选择
    treeselect: ElTreeSelect, // 树选择器
};

// 自定义指令
type CustomDirective = {
    name: string;
    value?: any;
    arg?: string;
    modifiers?: Record<string, boolean>;
};
// 表单项配置
export interface SearchFormItem {
    /** 表单项的唯一标识 */
    key: string;
    /** 表单项的标签文本 */
    label: string;
    /** 表单项标签的宽度，会覆盖 Form 的 labelWidth */
    labelWidth?: string | number;
    /** 表单项类型，可以是预定义的字符串类型或自定义组件 */
    type: keyof typeof componentMap | string | (() => VNode);
    /** 是否隐藏该表单项 */
    hidden?: boolean;
    /** 表单项占据的列宽，基于24格栅格系统 */
    span?: number;
    /** 选项数据，用于 select、checkbox-group、radio-group 等 */
    options?: Record<string, any>;
    /** 传递给表单项组件的属性 */
    props?: Record<string, any>;
    /** 表单项的插槽配置 */
    slots?: Record<string, (() => any) | undefined>;
    /** 表单项的占位符文本 */
    placeholder?: string;
    /** 更多属性配置请参考 ElementPlus 官方文档 */
    directives?: CustomDirective[];
}
// 表单配置
interface SearchBarProps {
    /** 表单数据 */
    items: SearchFormItem[];
    /** 每列的宽度（基于 24 格布局） */
    span?: number;
    /** 表单控件间隙 */
    gutter?: number;
    /** 展开/收起 */
    isExpand?: boolean;
    /** 默认是否展开（仅在 showExpand 为 true 且 isExpand 为 false 时生效） */
    defaultExpanded?: boolean;
    /** 表单域标签的位置 */
    labelPosition?: 'left' | 'right' | 'top';
    /** 文字宽度 */
    labelWidth?: string | number;
    /** 是否需要展示，收起 */
    showExpand?: boolean;
    /** 按钮靠左对齐限制（表单项小于等于该值时） */
    buttonLeftLimit?: number;
    /** 是否显示重置按钮 */
    showReset?: boolean;
    /** 是否显示搜索按钮 */
    showSearch?: boolean;
    /** 是否禁用搜索按钮 */
    disabledSearch?: boolean;
    /** 是否显示导出按钮 */
    showExport?: boolean;
    /** 权限 */
    auth?: string;
    // 表单数量
    total?: number;
}

interface SearchBarEmits {
    reset: [];
    search: [];
    export: [];
}

const emit = defineEmits<SearchBarEmits>();

const formData = defineModel<Record<string, any>>({ default: {} });

const formInstance = useTemplateRef<FormInstance>('formRef');
const props = withDefaults(defineProps<SearchBarProps>(), {
    items: () => [],
    span: 6,
    gutter: 12,
    isExpand: false,
    labelPosition: 'right',
    labelWidth: 'auto',
    showExpand: true,
    defaultExpanded: false,
    buttonLeftLimit: 4,
    showReset: true,
    showSearch: true,
    disabledSearch: false,
    showExport: false,
});

// 权限验证
const isAuth = computed(() => {
    if (props.auth) {
        return authList?.includes(props.auth);
    } else {
        return true;
    }
});

const renderComponent = (item: SearchFormItem) => {
    const Comp: Component = getComponent(item);

    let vnode = h(Comp, {
        modelValue: formData.value[item.key],
        'onUpdate:modelValue': (val: any) => (formData.value[item.key] = val),
        ...getProps(item),
    });

    if (item.directives?.length) {
        const dirs = item.directives.map(d => {
            const dir = resolveDirective(d.name);
            return [dir, d.value];
        });
        // @ts-ignore
        vnode = withDirectives(vnode, dirs);
    }

    return vnode;
};

/**
 * 是否展开状态
 */
const isExpanded = ref(props.defaultExpanded);

/**
 * 可见的表单项
 */
const visibleFormItems = computed(() => {
    const filteredItems = props.items.filter(item => !item.hidden);

    const shouldShowLess = !props.isExpand && !isExpanded.value;
    if (shouldShowLess) {
        const maxItemsPerRow = Math.floor(24 / props.span) - 1;
        return filteredItems.slice(0, maxItemsPerRow);
    }
    return filteredItems;
});
const rootProps = ['label', 'labelWidth', 'key', 'type', 'hidden', 'span', 'slots'];
const getProps = (item: SearchFormItem) => {
    if (item.props) return item.props;
    const props = { ...item };
    rootProps.forEach(key => delete (props as Record<string, any>)[key]);

    return props;
};

// 获取插槽
const getSlots = (item: SearchFormItem) => {
    if (!item.slots) return {};
    const validSlots: Record<string, () => any> = {};
    Object.entries(item.slots).forEach(([key, slotFn]) => {
        if (slotFn) {
            validSlots[key] = slotFn;
        }
    });
    return validSlots;
};

// 组件
const getComponent = (item: SearchFormItem): Component => {
    const { type } = item;
    if (type && typeof item.type !== 'string') return type as Component;
    // type不传递、默认使用 input
    return componentMap[type as keyof typeof componentMap] || componentMap['input'];
};

/**
 * 是否应该显示展开/收起按钮
 */
const shouldShowExpandToggle = computed(() => {
    const filteredItems = props.items.filter(item => !item.hidden);

    // console.log(Math.floor(24 / props.span) - 1);

    return !props.isExpand && props.showExpand && filteredItems.length > Math.floor(24 / props.span) - 1;
});

/**
 * 展开/收起按钮文本
 */
const expandToggleText = computed(() => {
    return isExpanded.value ? '折叠' : '展开';
});

/**
 * 切换展开/收起状态
 */
const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
};

/**
 * 操作按钮样式
 */
const actionButtonsStyle = computed(() => ({
    'justify-content':
        props.items.filter(item => !item.hidden).length <= props.buttonLeftLimit ? 'flex-start' : 'flex-end',
}));

/**
 * 处理重置事件
 */
const handleReset = () => {
    // 重置表单字段（UI 层）
    formInstance.value?.resetFields();

    // 清空所有表单项值（包含隐藏项）
    Object.assign(formData.value, Object.fromEntries(props.items.map(({ key }) => [key, undefined])));

    // 触发 reset 事件
    emit('reset');
};

/**
 * 处理搜索事件
 */
const handleSearch = () => {
    emit('search');
};

const handleExport = () => {
    emit('export');
};

defineExpose({
    ref: formInstance,
    validate: () => formInstance.value?.validate(),
    reset: handleReset,
});

// 解构 props 以便在模板中直接使用
const { span, gutter, labelPosition, labelWidth } = toRefs(props);
</script>

<style scoped lang="scss">
.search-bar {
    // padding-bottom: 10px;
    position: relative;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .action-column {
        flex: 1;
        max-width: 100%;
        padding-bottom: 10px;

        .filter-toggle {
            display: flex;
            align-items: center;
            margin-left: 10px;
            line-height: 32px;
            cursor: pointer;
            transition: color 0.2s ease;

            span {
                font-size: 14px;
                user-select: none;
            }

            .icon-wrapper {
                display: flex;
                align-items: center;
                margin-left: 4px;
                font-size: 14px;
                transition: transform 0.2s ease;
            }
        }
    }
}
</style>
