<template>
  <header class="px-5 pt-5 pb-3 text-2xl bg-white font-semibold">
    Course Video
  </header>
  <div class="body-course scrollable" v-if="!idCourse">
    <div v-for="(courseVideo, index) in listcourseVideo" :key="index">
      <div
        class="px-5 py-3 border-b-2 border-gray-300 hover:bg-gray-200"
        @click="handleShowContent(index)"
      >
        <div class="section-1 flex items-center justify-between">
          <h3 class="text-xl font-medium">
            {{ index + 1 }}. {{ courseVideo.title }}
          </h3>

          <span class="" v-show="currentSections.includes(index)"
            ><font-awesome-icon :icon="['fas', 'angle-up']"
          /></span>
          <span class="" v-show="!currentSections.includes(index)"
            ><font-awesome-icon :icon="['fas', 'angle-down']"
          /></span>
        </div>
      </div>
      <div
        class="detail-content-1 bg-white"
        v-show="currentSections.includes(index)"
      >
        <div class="hover:bg-gray-200 px-9 py-3 text-base font-light">
          Summary: {{ courseVideo.summary }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBarCourse",
  props: {
    listcourseVideo: {
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
      videoId: "",
    };
  },
  methods: {
    handleShowContent(sectionId) {
      const index = this.currentSections.indexOf(sectionId);
      if (index > -1) {
        this.currentSections.splice(index, 1);
      } else {
        this.currentSections.push(sectionId);
      }
    },
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
