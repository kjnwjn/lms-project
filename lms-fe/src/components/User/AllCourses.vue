<template>
  <h1 class="text-white text-2xl">Home > Course</h1>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="my-5">
      <router-link
        :to="`/admin/course/add`"
        class="bg-button text-white p-2 rounded-md px-5 py-3"
        >Add New Course</router-link
      >
    </div>
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">Course Name</th>
          <th scope="col" class="px-6 py-3">status</th>
          <th scope="col" class="px-6 py-3">price</th>
          <th scope="col" class="px-6 py-3">thumbnail</th>
          <th scope="col" class="px-6 py-3">Level</th>
          <th scope="col" class="px-6 py-3">num of student</th>
          <th scope="col" class="px-6 py-3">num of course video</th>
          <th scope="col" class="px-6 py-3">num of course docs</th>
          <th scope="col" class="px-6 py-3">num of quiz</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(course, key) in courses"
          :key="key"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ key + 1 }}
          </th>
          <td class="px-6 py-4">{{ course?.title }}</td>
          <td class="px-6 py-4">
            <button
              class="rounded-md w-24 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              :class="
                !course?.active
                  ? `bg-indigo-600 hover:bg-indigo-500 `
                  : `bg-red-600 hover:bg-red-500`
              "
              @click="handleActiveBtn(course?.id)"
            >
              {{ course?.active ? `Deactivate` : `Active` }}
            </button>
          </td>
          <td class="px-6 py-4">{{ course?.credit }}</td>
          <td class="px-6 py-4">
            <a
              class="hover:underline hover:text-blue-500"
              v-if="course?.thumbnail"
              :href="course?.thumbnail"
              >view</a
            >
            <router-link
              class="hover:text-purple-500"
              v-else
              :to="`/admin/course/upload/${course.id}`"
              >upload</router-link
            >
          </td>
          <td class="px-6 py-4">{{ course?.levelId?.name }}</td>
          <td class="px-6 py-4">{{ course?.users?.length }}</td>
          <td class="px-6 py-4">{{ course?.courseVideos?.length }}</td>
          <td class="px-6 py-4">{{ course?.courseDocs?.length }}</td>
          <td class="px-6 py-4">{{ course?.quizs?.length }}</td>
          <td class="flex items-center px-6 py-4">
            <router-link
              :to="`/admin/course/detail/${course.id}`"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Details</router-link
            >
            <router-link
              :to="`/admin/course/update/${course.id}`"
              class="font-medium text-green-600 dark:text-green-500 hover:underline ms-3"
              >Update</router-link
            >

            <!-- <p
              class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 cursor-pointer"
              @click="(course.id, courseId)"
            >
              Remove
            </p> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-5">
    <p class="text-red-300">
      * If you want to active course, you need to create some course resource
      for client
    </p>
  </div>
</template>
<script>
import adminService from "@/services/adminService";
export default {
  data() {
    return {
      showActions: false,
      courses: [],
    };
  },
  methods: {
    async getAllCourses() {
      try {
        const response = await adminService.getAllCoursesByAdmin();
        this.courses = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async handleActiveBtn(id) {
      try {
        await adminService.activeCourse(id);
        this.getAllCourses();
      } catch (error) {
        console.log(error);
        this.$toast.error(error?.response?.data?.message);
      }
    },
  },
  mounted() {
    this.getAllCourses();
  },
};
</script>
