/**
 *
 * 2位小数
 */

import type { Directive, DirectiveBinding } from 'vue';
import { nextTick } from 'vue';

const integer: Directive = {
    mounted: (el: HTMLElement, binding: DirectiveBinding) => {
        if (el) {
            nextTick(() => {
                let ipt = el.querySelector('input');
                ipt?.addEventListener('input', (e: any) => {
                    let value = e.target.value;

                    let filterValue = value.toString();
                    filterValue = filterValue.replace(/^\./g, ''); //  不能以“.”开头
                    filterValue = filterValue.replace(/[^\d.]/g, ''); // 只能以数字或. 开头

                    filterValue = filterValue.replace(/-{2,}/g, ''); //只保留第一个- 清除多余的

                    filterValue = filterValue.replace(/\.{2,}/g, '.'); //只保留第一个. 清除多余的
                    filterValue = filterValue.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
                    filterValue = filterValue.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数

                    e.target.value = filterValue;
                });
            });
        }
    },
};

export default integer;
