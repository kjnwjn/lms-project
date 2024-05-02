<template>
  <div class="flex flex-col min-h-screen">
    <header-component />
    <div class="flex-grow">
      <slot />
    </div>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from "@/components/GlobalComponent/HeaderComponent.vue";
import FooterComponent from "@/components/GlobalComponent/FooterComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      userProfile: {},
    };
  },
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
.flex-grow {
  flex-grow: 1;
}
</style>
