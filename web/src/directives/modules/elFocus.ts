/**
 *
 * 获取焦点
 */

import { nextTick, type Directive, type DirectiveBinding } from 'vue';

const elFocus: Directive = {
    mounted: function (el: HTMLElement) {
        if (el) {
            nextTick(() => {
                // @ts-ignore
                el.querySelector('input').focus();
            });
        }
    },
};

export default elFocus;
