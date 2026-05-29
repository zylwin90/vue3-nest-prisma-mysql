<template>
    <div>
        <ElSelect v-model="iconType" placeholder="Select" style="width: 240px">
            <ElOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </ElSelect>

        <section class="flex flex-wrap gap-2 mt-5">
            <div
                v-for="(p, i) in iconList"
                :key="i"
                class="w-25 h-25 rounded-xs border border-gray-200 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100"
                @click="copyHandle(p)"
            >
                <i class="iconfont text-2xl" :class="p.className"></i>
                <span class="text-sm">{{ p.unicode }}</span>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { extractIconClasses } from '@/utils/icon';
import { copy } from '@/utils/utils';
import { onMounted, ref } from 'vue';

const iconList = ref<any[]>([]);
const iconType = ref('fontClass');

/**
 * 图标类型选项
 */
const options = [
    { value: 'unicode', label: 'Unicode' },
    { value: 'fontClass', label: 'Font class' },
];

const copyHandle = (p: any) => {
    if (iconType.value == 'unicode') {
        copy(p.unicode);
    } else {
        copy(p.className);
    }
};

onMounted(() => {
    iconList.value = extractIconClasses();
});
</script>

<style scoped lang="scss">
.xxx {
    cursor: pointer;
}
</style>
