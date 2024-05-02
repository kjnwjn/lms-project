import { defineAsyncComponent } from "vue";

import FontAwesomeIcon from "@/utils/icons";

export function registerGlobalComponent(app) {
  app
    .component(
      "default-layout",
      defineAsyncComponent(() => import("@/layouts/DefaultLayout.vue"))
    )
    .component(
      "auth-layout",
      defineAsyncComponent(() => import("@/layouts/AuthLayout.vue"))
    )
    .component(
      "admin-layout",
      defineAsyncComponent(() => import("@/layouts/AdminLayout.vue"))
    )
    .component("font-awesome-icon", FontAwesomeIcon);
}
