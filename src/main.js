import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router"
import './assets/styles/icon.css'
import 'element-plus/dist/index.css'
import './assets/styles/global.scss'

createApp(App).use(router).use(store).mount("#app");
