/**
 * 只能输入汉字、字母、空格
 * 支持 el-input、el-input type="textarea"、原生 input
 */
import type { Directive } from 'vue';
import { nextTick } from 'vue';

const onlyChineseLetterSpace: Directive = {
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
            if (!input && el.tagName === 'TEXTAREA') {
                // 直接绑定在 textarea 上
                input = el;
            }

            if (!input) return;

            let composing = false; // 处理中文输入法

            // 正则：汉字、字母、空格
            // 汉字：\u4e00-\u9fa5（基本汉字）
            // 字母：a-zA-Z
            // 空格：\s（包括空格、制表符等）
            const regex = /[^\u4e00-\u9fa5a-zA-Z\s]/g;

            const filterValue = (val: string): string => {
                // 过滤掉不符合规则的字符
                let filtered = val.replace(regex, '');

                // 可选：去除连续多个空格，保留单个空格
                // filtered = filtered.replace(/\s+/g, ' ');

                return filtered;
            };

            const handleInput = (e: any) => {
                if (composing) return;

                const originalVal = e.target.value;
                const newVal = filterValue(originalVal);

                if (originalVal !== newVal) {
                    const cursorPos = e.target.selectionStart;
                    e.target.value = newVal;

                    // 调整光标位置
                    const removedCount = originalVal.length - newVal.length;
                    const newCursorPos = Math.max(cursorPos - removedCount, 0);
                    e.target.setSelectionRange(newCursorPos, newCursorPos);

                    e.target.dispatchEvent(new Event('input', { bubbles: true }));
                }
            };

            input.addEventListener('compositionstart', () => {
                composing = true;
            });

            input.addEventListener('compositionend', (e: any) => {
                composing = false;
                handleInput(e);
            });

            input.addEventListener('input', handleInput);
        });
    },
};

export default onlyChineseLetterSpace;
