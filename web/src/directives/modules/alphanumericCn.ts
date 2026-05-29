import type { Directive } from 'vue';
import { nextTick } from 'vue';

const alphanumericCn: Directive = {
  mounted(el) {
    nextTick(() => {
      const input = el.querySelector('input');
      if (!input) return;

      let composing = false;

      const handler = (e: Event) => {
        if (composing) return;

        const target = e.target as HTMLInputElement;
        const value = target.value;

        const newValue = value.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');

        if (value !== newValue) {
          target.value = newValue;
        }
      };

      input.addEventListener('compositionstart', () => {
        composing = true;
      });

      input.addEventListener('compositionend', (e:any) => {
        composing = false;
        handler(e);
      });

      input.addEventListener('input', handler);

      (el as any)._handler = handler;
    });
  },

  beforeUnmount(el) {
    const input = el.querySelector('input');
    if (input && (el as any)._handler) {
      input.removeEventListener('input', (el as any)._handler);
    }
  },
};

export default alphanumericCn;