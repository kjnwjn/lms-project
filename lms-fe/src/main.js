import { createApp } from "vue";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/axios.js";
import "@/assets/style/tailwind.css";
import "@/assets/style/global.css";
import "flowbite";
import "preline/preline";
import { registerGlobalComponent } from "./utils/import";
import CKEditor from "@ckeditor/ckeditor5-vue";

let app = createApp(App);

registerGlobalComponent(app);
app.use(store);
app.use(router);
app.use(ToastPlugin);
app.use(CKEditor);

app.mount("#app");
