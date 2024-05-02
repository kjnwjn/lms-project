<template>
  <h2 class="text-2xl text-white">Add Course Docs</h2>
  <form @submit.prevent="handlerSubmit">
    <div class="mt-4 flex">
      <div class="w-1/2 bg-white">
        <div class="text-center py-4 bg-gradient-to-r from-indigo-500">
          Course-Docs
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
      <button class="p-4 bg-button rounded-2xl text-white">
        Add Docs Course
      </button>
    </div>
  </form>
</template>

<script>
import adminService from "@/services/adminService";
export default {
  data() {
    return {
      summary: "",
      title: "",
      courseId: this.$route.params.courseId,
    };
  },
  methods: {
    async handlerSubmit() {
      try {
        const response = await adminService.createCourseDocs({
          title: this.title,
          courseId: this.courseId,
        });
        console.log(response);
        this.$toast.success("Course Video Save", {
          duration: 3000,
        });
        this.$router.push(`/admin/course/detail/${this.courseId}`);
      } catch (error) {
        this.$toast.error("Save course video fail", {
          duration: 3000,
        });
      }
    },
  },
};
</script>
