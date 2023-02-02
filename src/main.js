import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store/store";
import EventBus from "./utils/eventBus";

const app = createApp(App);
app.use(store);
app.config.globalProperties.$bus = EventBus;

app.mount('#app')

