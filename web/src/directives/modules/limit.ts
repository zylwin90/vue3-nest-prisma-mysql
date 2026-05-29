/**
 *
 * 0-9999的2位小数，不含0
 */
import type { Directive } from 'vue';

function getInput(el: HTMLElement): HTMLInputElement | null {
    if (el.tagName === 'INPUT') return el as HTMLInputElement;
    return el.querySelector('input');
}

const limit: Directive = {
    mounted(el: HTMLElement) {
        const input = getInput(el);
        if (!input) return;

        let isUpdating = false;
        let composing = false;

        const sanitize = () => {
            if (isUpdating) return;

            let val = input.value || '';

            // 1. 只允许数字和 .
            val = val.replace(/[^\d.]/g, '');

            // 2. 只保留一个 .
            val = val.replace(/\.{2,}/g, '.');
            val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');

            // 3. 限制两位小数
            val = val.replace(/^(\d+)\.(\d{0,2}).*$/, '$1.$2');

            // 4. 限制最大值
            const num = parseFloat(val);
            if (!isNaN(num) && num > 9999) {
                val = '9999';
            }

            // ❗ 关键：不在 input 阶段强行清 0
            // 让用户可以输入 0.12

            if (val !== input.value) {
                isUpdating = true;
                input.value = val;
                input.dispatchEvent(new Event('input'));
                isUpdating = false;
            }
        };

        const handler = () => {
            if (composing) return;
            sanitize();
        };

        input.addEventListener('compositionstart', () => { composing = true; });
        input.addEventListener('compositionend', () => {
            composing = false;
            sanitize();
        });

        // ✅ 失焦时再校验 不能为 0
        const blurHandler = () => {
            const num = parseFloat(input.value);

            if (!input.value) return;

            // ❌ 0 / 0.0 / 0.00
            if (!isNaN(num) && num === 0) {
                input.value = '';
                input.dispatchEvent(new Event('input'));
            }
        };

        input.addEventListener('input', handler);
        input.addEventListener('blur', blurHandler);
    },
};

export default limit;
