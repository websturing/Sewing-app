import { createHead } from '@unhead/vue/client';
import naive from 'naive-ui';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import "./assets/css/tailwind.css";
import router from './router';


const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(naive)
app.use(head)
app.mount('#app')