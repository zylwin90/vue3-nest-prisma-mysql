/**
 * 禁止输入所有 emoji（完整版）
 * 支持 el-input、el-input type="textarea"、原生 input
 */
import type { Directive } from 'vue';
import { nextTick } from 'vue';

const noEmoji: Directive = {
    mounted(el, binding) {
        nextTick(() => {
            // 兼容多种输入框类型
            let input = el.querySelector('.el-input__inner'); // 普通 el-input
            if (!input) {
                input = el.querySelector('.el-textarea__inner'); // el-input type="textarea"
            }
            if (!input) {
                input = el.querySelector('input'); // 原生 input
            }
            if (!input && el.tagName === 'INPUT') {
                // 直接绑定在 input 上
                input = el;
            }

            if (!input) return;

            let composing = false; // 处理中文输入法

            input.addEventListener('compositionstart', () => {
                composing = true;
            });

            input.addEventListener('compositionend', (e: any) => {
                composing = false;
                filterEmoji(e);
            });

            const filterEmoji = (e: any) => {
                if (composing) return;

                const val = e.target.value;

                // 终极过滤（包含组合 emoji）
                const newVal = val
                    // 1️⃣ 标准 emoji
                    .replace(/\p{Extended_Pictographic}/gu, '')
                    // 2️⃣ 零宽连接符（ZWJ）
                    .replace(/\u200D/g, '')
                    // 3️⃣ 变体选择符（emoji 样式）
                    .replace(/\uFE0F/g, '');

                if (val !== newVal) {
                    e.target.value = newVal;
                    e.target.dispatchEvent(new Event('input', { bubbles: true }));
                }
            };

            input.addEventListener('input', filterEmoji);
        });
    },
};

export default noEmoji;
