<template>
  <div class="scrollable">
    <div class="h-5/6">
      <video :key="contentVideo.data" class="w-full h-full" controls>
        <source v-bind:src="contentVideo.data" type="video/mp4" />
      </video>
    </div>
    <div class="ml-10 mt-8">
      <h1 class="text-4xl font-extrabold dark:text-white">
        <span
          >{{ contentSummary ? contentSummary.title : "LEARNING COURSE" }}
        </span>
      </h1>
      <p
        class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-3"
      >
        {{ contentSummary ? contentSummary.summary : "LEARNING COURSE" }}
      </p>
    </div>
  </div>
</template>

<script>
import courseService from "@/services/courseService";
export default {
  data() {
    return {
      contentVideo: {},
      courseId: this.$route.params.courseId,
      videoId: this.$route.params.videoId,
    };
  },
  props: {
    listcourseVideo: {
      type: Array,
    },
  },
  methods: {
    async getContentVideo() {
      try {
        const response = await courseService.studentGetContentVideo(
          this.courseId,
          this.videoId
        );
        this.contentVideo = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    contentSummary() {
      if (this.listcourseVideo.length === 0) return;
      return this.listcourseVideo.find((video) => video.id === this.videoId);
    },
  },
  mounted() {
    this.getContentVideo();
  },
};
</script>
<style scoped></style>
