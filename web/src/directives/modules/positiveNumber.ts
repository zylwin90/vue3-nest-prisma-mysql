/**
 * 大于0的数字，不包含0
 */
import type { Directive } from 'vue';
import { nextTick } from 'vue';

const positiveNumber: Directive = {
    mounted: (el: HTMLElement) => {
        if (el) {
            nextTick(() => {
                const ipt = (el.querySelector('.el-input__inner') as HTMLInputElement) || el.querySelector('input');
                if (!ipt) return;

                let isComposing = false;

                ipt.addEventListener('compositionstart', () => {
                    isComposing = true;
                });

                ipt.addEventListener('compositionend', (e: any) => {
                    isComposing = false;
                    // 组合结束后手动触发一次处理
                    handleInput(e);
                });

                function handleInput(e: any) {
                    if (isComposing) return;

                    const raw = e.target.value;
                    const cleaned = raw.replace(/[^\d]/g, '');
                    let newValue = cleaned;
                    if (newValue !== '' && Number(newValue) <= 0) {
                        newValue = '';
                    }

                    if (e.target.value !== newValue) {
                        e.target.value = newValue;
                        ipt?.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }

                ipt.addEventListener('input', handleInput);

                ipt.addEventListener('blur', (e: any) => {
                    if (e.target.value !== '' && Number(e.target.value) <= 0) {
                        e.target.value = '';
                        ipt?.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                });
            });
        }
    },
};

export default positiveNumber;
