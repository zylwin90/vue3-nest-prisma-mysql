import { ref, h, createApp, withDirectives } from 'vue';
import { ElDialog, ElButton } from 'element-plus';
import { initRouter } from '@/router';
import directives from '@/directives';
import type { DialogProps } from 'element-plus';
import ElementPlus from 'element-plus';

/**
 *
 * @param component 组件模板
 * @param props 组件的属性
 * @param dialogProps  ElDialog的属性
 */

type MyDialogProps = Partial<DialogProps> & {
    footer?: boolean;
    cancleName?: string;
    directiveName?: any;
    submitName?: string;
    directiveParames?: any;
};

export const openDialog = (component: any, props: any, dialogProps: MyDialogProps) => {
    dialogProps = { footer: true, ...dialogProps };
    const open = ref(true);
    const isLoading = ref(false);
    const instance = ref();

    const dialog = () =>
        h(
            ElDialog,
            {
                ...dialogProps,
                modelValue: open.value,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                'onUpdate:modelValue': (val: boolean) => {
                    open.value = val;
                },
                onClosed: () => {
                    if (instance.value && typeof instance.value.onCancle === 'function') {
                        instance.value?.onCancle();
                    } else {
                        unmount();
                    }
                },
            },
            {
                default: () => h(component, { ...props, ref: instance, unmount }),
                footer: () =>
                    dialogProps?.footer &&
                    h('div', [
                        h(
                            ElButton,
                            {
                                onClick: () => {
                                    open.value = false;
                                },
                            },
                            () => dialogProps.cancleName || '取消'
                        ),
                        dialogProps.directiveName
                            ? withDirectives(
                                  h(
                                      ElButton,
                                      {
                                          type: 'primary',
                                          loading: isLoading.value,
                                          onClick: async () => {
                                              try {
                                                  isLoading.value = true;
                                                  await instance?.value?.onSubmit();
                                                  isLoading.value = false;
                                                  // unmount();
                                              } catch (err) {
                                                  console.log(err);
                                              } finally {
                                                  isLoading.value = false;
                                              }
                                          },
                                      },
                                      () => dialogProps.submitName || '确认'
                                  ),
                                  [[dialogProps.directiveName, dialogProps.directiveParames]]
                              )
                            : h(
                                  ElButton,
                                  {
                                      type: 'primary',
                                      loading: isLoading.value,
                                      onClick: async () => {
                                          try {
                                              isLoading.value = true;
                                              await instance?.value?.onSubmit();
                                              isLoading.value = false;
                                              // unmount();
                                          } catch (err) {
                                              //   console.log(err,'====');
                                              isLoading.value = false;
                                          } finally {
                                              isLoading.value = false;
                                          }
                                      },
                                  },
                                  () => dialogProps.submitName || '确认'
                              ),
                    ]),
            }
        );
    // 挂载
    const app = createApp(dialog);
    initRouter(app);
    app.use(directives);
    const div = document.createElement('div');
    document.body.appendChild(div);
    app.mount(div);
    app.use(ElementPlus);
    // 卸载
    function unmount() {
        open.value = false;
        app.unmount();
        document.body.removeChild(div);
    }

    return {
        instance,
        unmount,
    };
};
