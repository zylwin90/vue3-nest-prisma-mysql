import type { Directive, DirectiveBinding } from 'vue';
import { nextTick } from 'vue';

interface ElType extends HTMLElement {
    clickOutsideEvent: (e: Event) => void;
}

const clickOutside: Directive = {
    mounted(el: ElType, binding: DirectiveBinding) {
        el.clickOutsideEvent = (event: Event) => {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value(event);
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: ElType) {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
};

export default clickOutside;
