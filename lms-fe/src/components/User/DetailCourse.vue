<template>
  <div class="w-full t rounded-lg">
    <div class="">
      <h1 class="text-2xl font-bold ext-gray-500 dark:text-gray-400">
        Program Name:{{ courseInfor.title }}
      </h1>
      <h1 class="text-xl my-4 ext-gray-500 dark:text-gray-400">
        Summary: {{ courseInfor.summary }}
      </h1>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="my-5">
        <router-link
          :to="`/admin/course/video/add/${courseId}`"
          class="bg-button text-white p-2 rounded-md px-5 py-3"
          >Add Course Video</router-link
        >
      </div>
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Summary</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="(courseVideo, key) in listCourseVideo"
            :key="key"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ courseVideo.title }}
            </th>
            <td class="px-6 py-4">{{ courseVideo.summary }}</td>
            <td
              class="px-6 py-4"
              :class="courseVideo.videoName ? '' : 'text-red-500'"
            >
              {{
                courseVideo.videoName
                  ? courseVideo.videoName
                  : "Require Upload Video"
              }}
            </td>
            <td class="flex items-center px-6 py-4">
              <router-link
                :to="`/admin/course/video/upload/${courseId}/${courseVideo.id}`"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Upload</router-link
              >
              <p
                class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 cursor-pointer"
                @click="removeCourseVideo(courseVideo.id, courseId)"
              >
                Remove
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="my-5">
        <router-link
          :to="`/admin/course/docs/add/${courseId}`"
          class="bg-button text-white p-2 rounded-md px-5 py-3"
          >Add Course Docs</router-link
        >
      </div>
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Active</th>
            <th scope="col" class="px-6 py-3">FileName</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="(courseDocs, key) in listCourseDocs"
            :key="key"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ courseDocs.title }}
            </th>
            <td class="px-6 py-4">{{ courseDocs.active }}</td>
            <td
              class="px-6 py-4"
              :class="courseDocs.fileName ? '' : 'text-red-500'"
            >
              {{
                courseDocs.fileName
                  ? courseDocs.fileName
                  : "Require Upload Video"
              }}
            </td>
            <td class="flex items-center px-6 py-4">
              <router-link
                :to="`/admin/course/docs/upload/${courseId}/${courseDocs.id}`"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Upload</router-link
              >
              <p
                class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 cursor-pointer"
                @click="removeCourseDocs(courseDocs.id, courseId)"
              >
                Remove
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div class="my-5">
        <router-link
          :to="`/admin/course/quiz/add/${courseId}`"
          class="bg-button text-white p-2 rounded-md px-5 py-3"
          >Add New Quiz</router-link
        >
      </div>
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Question To Pass</th>
            <th scope="col" class="px-6 py-3">Min Question</th>
            <th scope="col" class="px-6 py-3">Description</th>
            <th scope="col" class="px-6 py-3">Active</th>
            <th scope="col" class="px-6 py-3">answers At End</th>
            <th scope="col" class="px-6 py-3">random Order</th>
            <th scope="col" class="px-6 py-3">single Attempt</th>
            <th scope="col" class="px-6 py-3">deadline</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="(courseQuiz, key) in listQuizs"
            :key="key"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ courseQuiz.title }}
            </th>
            <td class="px-6 py-4">{{ courseQuiz.questionToPass }}</td>
            <td class="px-6 py-4">{{ courseQuiz.minQuestion }}</td>
            <td class="px-6 py-4">{{ courseQuiz.description }}</td>
            <td class="px-6 py-4">
              <button
                class="rounded-md w-24 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :class="
                  !courseQuiz?.active
                    ? `bg-indigo-600 hover:bg-indigo-500 `
                    : `bg-red-600 hover:bg-red-500`
                "
                @click="handleActiveBtn(courseQuiz?.id)"
              >
                {{ courseQuiz?.active ? `Deactivate` : `Active` }}
              </button>
            </td>
            <td class="px-6 py-4">{{ courseQuiz.answersAtEnd }}</td>
            <td class="px-6 py-4">{{ courseQuiz.randomOrder }}</td>
            <td class="px-6 py-4">{{ courseQuiz.singleAttempt }}</td>
            <td class="px-6 py-4">{{ courseQuiz.deadline }}</td>
            <td class="flex items-center px-6 py-4">
              <router-link
                :to="`/admin/quiz-question/${courseId}/${courseQuiz.id}`"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Detail</router-link
              >
              <p
                class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 cursor-pointer"
              >
                Remove
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import adminService from "@/services/adminService";
export default {
  data() {
    return {
      courseId: this.$route.params.courseId,
      listCourseVideo: [],
      listCourseDocs: [],
      listQuizs: [],
      courseInfor: {},
    };
  },
  methods: {
    async getCourseByCourseId() {
      try {
        const response = await adminService.getCourseById(this.courseId);
        this.courseInfor = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async GetListCourseVideo() {
      try {
        const response = await adminService.getListCourseVideo(this.courseId);
        this.listCourseVideo = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async GetListCourseDocs() {
      try {
        const response = await adminService.getListCourseDocs(this.courseId);
        this.listCourseDocs = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async GetListQuiz() {
      try {
        const response = await adminService.getListQuiz(this.courseId);
        this.listQuizs = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async removeCourseVideo(id, courseId) {
      try {
        await adminService.removeCourseVideo(Number(id), Number(courseId));
        this.GetListCourseVideo();
      } catch (error) {
        console.log(error);
      }
    },
    async removeCourseDocs(id, courseId) {
      try {
        await adminService.removeCourseDocs(Number(id), Number(courseId));
        this.GetListCourseDocs();
      } catch (error) {
        console.log(error);
      }
    },
    async handleActiveBtn(id) {
      try {
        await adminService.publishQuiz(Number(id));
        this.GetListQuiz();
      } catch (error) {
        console.log(error);
        this.$toast.error(error?.response?.data?.message);
      }
    },
  },
  mounted() {
    this.getCourseByCourseId();
    this.GetListCourseVideo();
    this.GetListCourseDocs();
    this.GetListQuiz();
  },
};
</script>
