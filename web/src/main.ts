import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/css/main.css'

// import App from './04装饰器-封装.vue';
// import App from './03装饰器.vue';
// import App from './02控制反转和依赖注入.vue';
// import App from './01控制反转和依赖注入.vue';
import App from './App.vue'
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
