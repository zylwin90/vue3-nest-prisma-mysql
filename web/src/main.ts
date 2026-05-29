import '@/assets/css/main.css';
import '@/assets/icon/iconfont.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import App from './App.vue';
import { initRouter } from '@/router/index.ts';

const app = createApp(App);

app.use(createPinia());
initRouter(app);
app.use(ElementPlus, {
    locale: zhCn,
});

app.mount('#app');
