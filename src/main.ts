import { createHead } from '@unhead/vue/client';
import naive from 'naive-ui';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import JsonViewer from "vue3-json-viewer";
import "vue3-json-viewer/dist/vue3-json-viewer.css";
import App from './App.vue';
import "./assets/css/tailwind.css";
import router from './router';


const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(naive)
app.use(head)
app.use(JsonViewer);
app.mount('#app')