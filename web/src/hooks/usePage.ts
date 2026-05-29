import { ref } from 'vue';

export function usePage(getList: () => void) {
    const total = ref(0);
    const pageNum = ref(1);
    const pageSize = ref(20);

    const pageNumChange = (val: number) => {
        pageNum.value = val;
        getList();
    };
    const pageSizeChange = (val: number) => {
        pageNum.value = 1;
        pageSize.value = val;
        getList();
    };

    return { total, pageNum, pageSize, pageNumChange, pageSizeChange };
}
