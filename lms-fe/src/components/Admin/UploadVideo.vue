<template>
  <h2 class="text-2xl text-white">Home > Account Settings</h2>
  <div class="mt-4 flex">
    <div class="w-1/2 bg-white">
      <div class="text-center py-4 bg-gradient-to-r from-indigo-500">
        Upload Video
      </div>
      <div class="px-5 py-5">
        <div class="mt-5">
          <h2>Please choose a video with mp4</h2>
          <input
            type="file"
            class="rounded-full w-full"
            @change="handleFileUpload"
            accept="video/mp4"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <button @click="uploadVideo" class="p-4 bg-button rounded-2xl text-white">
      UpLoad file
    </button>
  </div>
</template>
<script>
import adminService from "@/services/adminService";

export default {
  data() {
    return {
      videoId: this.$route.params.videoId,
      video: null,
      courseId: this.$route.params.courseId,
    };
  },
  methods: {
    handleFileUpload(e) {
      this.video = e.target.files[0];
    },
    async uploadVideo() {
      if (!this.video) {
        alert("Please select a file");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("video", this.video);
        const response = await adminService.UpLoadCourseVideo(
          this.videoId,
          formData
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      this.$router.push(`/admin/course/detail/${this.courseId}`);
    },
  },
};
</script>
