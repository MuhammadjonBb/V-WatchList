import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
import router from '@/router';
import Notifications from '@kyvg/vue3-notification'
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Notifications);
app.mount('#app');
