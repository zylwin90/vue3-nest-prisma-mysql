/**
 * 
 * 只能输入数字和字母
 */

import type { Directive, DirectiveBinding } from 'vue';
import { nextTick } from 'vue';

const digit: Directive = {
    mounted: (el: HTMLElement, binding: DirectiveBinding) => {
        if (el) {
            nextTick(() => {
                let ipt = (el.querySelector('.el-input__inner') as HTMLInputElement) || el.querySelector('input');
                ipt?.addEventListener('input', (e: any) => {
                    let value = e.target.value;
                    let newValue = value.replace(/[^a-zA-Z0-9]/g, ''); // 只能输入数字和字母
                    e.target.value = newValue;
                });
            });
        }
    },
};

export default digit;
