import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import "./assets/tailwind.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { dateFilter } from "vue-date-fns";
import ThemifyIcon from "vue-themify-icons";
Vue.config.productionTip = false;
Vue.use(CKEditor);
Vue.filter("date", dateFilter);
Vue.directive("rand-color", {
    bind(el) {
        el.style.color = "#" + Math.random().toString(16).slice(2, 8);
    },
});

Vue.filter("snippet", (value) => {
    if (value.length <= 100) return value;
    return value.slice(0, 100) + "...";
});
Vue.use(ToastPlugin);
Vue.component("ThemifyIcon", ThemifyIcon);
new Vue({
    router: router,
    store,
    data: {
        currentRoute: window.location.pathname,
    },
    render: (h) => h(App),
}).$mount("#app");
