/**
 *
 * 只能输入数字
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
                    let newValue = value.replace(/[^\d]/g, '');
                    e.target.value = newValue;
                });
            });
        }
    },
};

export default digit;
