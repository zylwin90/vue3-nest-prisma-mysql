import { ref, h, createApp, withDirectives } from 'vue';
import { ElDrawer, ElButton, ElConfigProvider } from 'element-plus';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { initRouter } from '@/router';
import directives from '@/directives';
import type { DrawerProps } from 'element-plus';
import elementZH from 'element-plus/es/locale/lang/zh-cn';

type MyDrawerProps = Partial<DrawerProps> & {
    footer?: boolean;
    cancleName?: string;
    directiveName?: any;
    submitName?: string;
    directiveParames?: any;
};

/**
 *
 * @param component 组件模板
 * @param props 组件的属性
 * @param dialogProps  ElDrawer的属性
 */
export const openDrawer = (
    component: any,
    props: any,
    dialogProps: MyDrawerProps,
    slots?: {
        header?: () => any;
    }
) => {
    dialogProps = { footer: true, ...dialogProps };
    const open = ref(true);
    const isLoading = ref(false);
    const instance = ref();
    const dialog = () =>
        h(
            ElConfigProvider,
            { locale: elementZH },
            {
                default: () =>
                    h(
                        ElDrawer,
                        {
                            ...dialogProps,
                            modelValue: open.value,
                            closeOnClickModal: true,
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
                            header: () =>
                                slots?.header
                                    ? slots.header()
                                    : dialogProps.title
                                      ? h('span', dialogProps.title)
                                      : null,
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
                                ]),
                        }
                    ),
            }
        );

    // 挂载
    const app = createApp(dialog);
    initRouter(app);
    app.use(directives);
    const div = document.createElement('div');
    document.body.appendChild(div);
    app.mount(div);
    app.use(ElementPlus)
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
