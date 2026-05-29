import { nextTick, type Directive, type DirectiveBinding } from 'vue';
interface ElInput extends HTMLElement {
    _trimHandler?: (e: Event) => void;
}
const elTrim: Directive = {
    mounted: function (el: HTMLElement) {
        const input = el.querySelector('input');
        if (!input) return;

        input.addEventListener('blur', () => {
            const newValue = input.value.trim();
            if (input.value !== newValue) {
                input.value = newValue;
                // 触发v-model更新
                input.dispatchEvent(new Event('input'));
            }
        });
    },
};

export default elTrim;
