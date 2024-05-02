<template>
  <h2 class="text-2xl text-white">Add Course Video</h2>
  <form @submit.prevent="handleSubmit">
    <div class="mt-4 flex">
      <div class="w-1/2 bg-white">
        <div class="text-center py-4 bg-gradient-to-r from-indigo-500">
          Course-Video
        </div>
        <div class="px-5 py-5">
          <div class="mt-5">
            <h2>Title</h2>
            <input
              required
              type="text"
              class="rounded-full w-full"
              v-model="title"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <button class="p-4 bg-button rounded-2xl text-white" type="submit">
        Add Video Course
      </button>
    </div>
  </form>
</template>

<script>
import courseService from "@/services/courseService";
export default {
  data() {
    return {
      title: "",
      courseId: this.$route.params.courseId,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await courseService.createCourseDoc({
          title: this.title,
          courseId: this.courseId,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
