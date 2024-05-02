<template>
  <h2 class="text-2xl text-white">Home > Uoload Course Docx</h2>
  <div class="mt-4 flex">
    <div class="w-1/2 bg-white">
      <div class="text-center py-4 bg-gradient-to-r from-indigo-500">
        Upload Document
      </div>
      <div class="px-5 py-5">
        <div class="mt-5">
          <h2>Please choose a video with pdf</h2>
          <input
            type="file"
            class="rounded-full w-full"
            @change="handleFileUpload"
            accept="application/pdf"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <button @click="uploadDocx" class="p-4 bg-button rounded-2xl text-white">
      UpLoad file
    </button>
  </div>
</template>
<script>
import courseService from "@/services/courseService";
export default {
  data() {
    return {
      courseDocId: this.$route.params.courseDocId,
      document: null,
      courseId: this.$route.params.courseId,
    };
  },
  methods: {
    handleFileUpload(e) {
      this.document = e.target.files[0];
    },
    async uploadDocx() {
      if (!this.document) {
        alert("Please select a file");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("document", this.document);
        const response = await courseService.uploadCourseDoc(
          this.courseDocId,
          formData
        );
        this.$toast.success("Document uploaded successfully");
        this.$router.push(`/admin/course/docx/${this.courseId}`);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
