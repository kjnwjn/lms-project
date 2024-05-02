<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { PUBLIC_DEFAULT_LAYOUT } from "@/constants";

export default {
  name: "App",
  setup() {
    const route = useRoute();
    return {
      layout: computed(
        () => (route.meta.layout || PUBLIC_DEFAULT_LAYOUT) + "-layout"
      ),
    };
  },
};
</script>
