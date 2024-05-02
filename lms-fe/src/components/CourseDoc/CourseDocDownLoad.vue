<template>
  <div class="w-4/5 mx-auto">
    <embed :src="courseDoc.data" type="" class="w-full" height="1000px" />
  </div>
</template>

<script>
import courseService from "@/services/courseService";
export default {
  data() {
    return {
      couseId: this.$route.params.courseId,
      courseDocId: this.$route.params.courseDocsId,
      courseDoc: {},
    };
  },
  methods: {
    async getURLDocument() {
      try {
        const response = await courseService.getURLCourseDoc(
          this.couseId,
          this.courseDocId
        );
        this.courseDoc = response.data;
        console.log(this.courseDoc);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getURLDocument();
  },
};
</script>
