<template>
  <h2 class="text-2xl text-white">Home > Account Settings</h2>
  <form class="bg-white rounded" @submit.prevent="handlerSubmitGetCourse">
    <div class="space-y-12 p-5">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          New Quiz
        </h2>
        <!-- <p class="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p> -->

        <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label
              for="courseId"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Course ID</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  name="courseId"
                  id="courseId"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  :value="courseId"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="title"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Title</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  name="title"
                  id="title"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  v-model="title"
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="credit"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Credit</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  name="credit"
                  id="credit"
                  type="number"
                  min="0"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  v-model="credit"
                />
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">
                The amount of credit that the quiz is worth.
              </p>
            </div>
          </div>
          <div class="col-span-full">
            <label
              for="summary"
              class="block text-sm font-medium leading-6 text-gray-900"
              >summary</label
            >
            <div class="mt-2">
              <textarea
                id="summary"
                name="summary"
                rows="3"
                v-model="summary"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about your course.
            </p>
          </div>
        </div>
      </div>
      <label for="level" class="block mt-0 text-sm font-medium text-gray-900"
        >Select an level</label
      >
      <select
        id="level"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        v-model="levelId"
      >
        <option disabled value="">Please select one level</option>
        <option
          v-for="(levelData, key) in level"
          :key="key"
          :value="levelData?.id"
          :selected="true ? levelData?.id == levelId : false"
        >
          {{ levelData?.name }}
        </option>
      </select>
    </div>

    <div class="mt-6 flex items-center justify-center gap-x-6">
      <button
        type="button"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancel
      </button>
      <button
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script>
import adminService from "@/services/adminService";
export default {
  data() {
    return {
      courseId: this.$route.params.courseId,
      title: "",
      credit: "",
      email: "",
      summary: "",
      levelId: null,
      error: "",
      oldCourse: null,
      level: null,
    };
  },
  methods: {
    async getCourseById() {
      try {
        const response = await adminService.getCourseById(this.courseId);
        this.title = response.data.data.title;
        this.credit = response.data.data.credit;
        this.email = response.data.data.email;
        this.summary = response.data.data.summary;
        this.levelId = response.data.data?.levelId?.id;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllLevel() {
      try {
        const response = await adminService.getAllLevels();
        this.level = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async handlerSubmitGetCourse() {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await adminService.updateCourse(this.courseId, {
          title: this.title,
          credit: parseInt(this.credit),
          summary: this.summary,
          phone: this.phone,
          levelId: Number(this.levelId),
        });
        console.log({
          title: this.title,
          credit: parseInt(this.credit),
          summary: this.summary,
          phone: this.phone,
          levelId: Number(this.levelId),
        });
        // this.$router.push("/admin/courses");
        this.$toast.success("Course updated successfully");
      } catch (error) {
        this.error = error.message;
        console.log(error?.response?.data?.message);
      }
    },
  },
  mounted: function () {
    this.getCourseById();
    this.getAllLevel();
  },
};
</script>
