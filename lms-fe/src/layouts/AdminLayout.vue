<template>
  <side-bar />
  <div class="p-4 sm:ml-64">
    <slot />
  </div>
</template>
<script>
import SideBar from "@/components/Admin/SideBar.vue";

export default {
  components: {
    SideBar,
  },
};
</script>
