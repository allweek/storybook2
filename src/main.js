import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store/index";
import EventBus from "@alexnsk89/utils-event-bus/eventBus";

const app = createApp(App);
app.use(store);
app.config.globalProperties.$bus = EventBus;

app.mount('#app')

