<template>
  <header class="px-5 pt-5 pb-3 text-2xl bg-white font-semibold">
    Course Document
  </header>
  <div class="body-course scrollable" v-if="!idCourse">
    <div v-for="(courseDoc, index) in listCourseDoc" :key="index">
      <div class="px-5 py-3 border-b-2 border-gray-300 hover:bg-gray-200">
        <div class="section-1 flex items-center justify-between">
          <h3 class="text-xl font-medium">
            {{ index + 1 }}. {{ courseDoc.title }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBarCourse",
  props: {
    listCourseDoc: {
      type: Array,
      required: true,
    },
    idCourse: {
      type: String,
    },
  },

  data() {
    return {
      currentSections: [],
    };
  },
};
</script>
<style scoped>
.scrollable {
  height: 20vh; /* Adjust as needed */
  overflow-y: auto;
}
.active {
  background-color: rgba(240, 81, 35, 0.2);
}
</style>
