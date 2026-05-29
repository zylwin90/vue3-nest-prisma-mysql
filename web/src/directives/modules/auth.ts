import type { Directive, DirectiveBinding } from 'vue';
import { nextTick, watchEffect } from 'vue';
import { useRoutesStore } from '@/stores/routes';

const auth: Directive = {
    mounted: async (el: HTMLElement, binding: DirectiveBinding) => {
        await nextTick();
        let flag = false;
        const { authList } = useRoutesStore();
        if (!authList) return;

        const isArray = Array.isArray(binding.value);
        // 批量权限验证
        if (isArray && binding.value.length) {
            flag = binding.value.every((p: string) => {
                return authList?.includes(p);
            });
        } else {
            // 单个权限验证
            flag = authList.includes(binding.value);
        }

        el.style.display = flag ? '' : 'none';
    },
};

export default auth;
