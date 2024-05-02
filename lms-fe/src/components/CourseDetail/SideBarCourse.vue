<template>
  <div class="flex bg-white">
    <div class="content-component w-4/5 bg-white">
      <content-display :listcourse-video="listcourseVideo" />
    </div>
    <div
      class="side-course-component bg-gray-100 w-1/5 cursor-pointer scrollable"
    >
      <header class="px-5 pt-5 pb-3 text-2xl bg-white font-semibold">
        Course Video
      </header>
      <div class="body-course">
        <div v-for="(courseVideo, index) in listcourseVideo" :key="index">
          <div class="px-5 py-3 border-b-2 border-gray-300 hover:bg-gray-200">
            <a :href="`/learning/${couseId}/${courseVideo.id}`">
              <div class="section-1 flex items-center justify-between">
                <div class="text-xl font-medium">
                  {{ index + 1 }}. {{ courseVideo.title }}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="px-5 pt-5 pb-3 text-2xl bg-white font-semibold">
        <h2>Course Document</h2>
      </div>
      <div v-for="(courseDoc, index) in listCourseDocument" :key="index">
        <div class="px-5 py-3 border-b-2 border-gray-300 hover:bg-gray-200">
          <a :href="`/learning-doc/${couseId}/${courseDoc.id}`" target="_blank">
            <div class="section-1 flex items-center justify-between">
              <div class="text-xl font-medium">
                {{ index + 1 }}. {{ courseDoc.title }}
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="px-5 pt-5 pb-3 text-2xl font-semibold">
        <router-link :to="`/quiz/${couseId}`">
          <button
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span
              class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
            >
              Go To Quiz
            </span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ContentDisplay from "./ContentDisplay.vue";
import courseService from "@/services/courseService";
export default {
  name: "SideBarCourse",

  components: {
    ContentDisplay,
  },
  data() {
    return {
      listcourseVideo: [],
      couseId: this.$route.params.courseId,
      conntentSummary: "",
      listCourseDocument: [],
    };
  },
  methods: {
    async getListCourseVideo() {
      try {
        const response = await courseService.studentGetCourseVideos(
          this.couseId
        );
        this.listcourseVideo = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    handleProps(data) {
      this.conntentSummary = data;
    },
    async getListCourseDocument() {
      try {
        const response = await courseService.getListCourseDocByStudent(
          this.couseId
        );
        this.listCourseDocument = response.data.data;
        console.log(this.listCourseDocument);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getListCourseVideo();
    this.getListCourseDocument();
  },
};
</script>
<style scoped>
.scrollable {
  height: 100vh; /* Adjust as needed */
  overflow-y: auto;
}
.active {
  background-color: rgba(240, 81, 35, 0.2);
}
</style>
