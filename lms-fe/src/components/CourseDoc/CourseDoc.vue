<template>
  <div class="w-full t bg-white rounded-lg">
    <div class="m-4">
      <h1 class="text-2xl font-bold">
        Program Name:{{ courseDocInfor ? courseDocInfor.title : "" }}
      </h1>

      <table class="w-full text-center bg-white rounded-lg">
        <thead class="border-b-2 border-gray-100 h-16 font-bold">
          <tr>
            <td>Title</td>

            <td class="w-1/4">Document</td>
            <td>UpLoad Docx</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="h-10 border-t-2 border-gray-100"
            v-for="(courseDoc, key) in listCoursedDoc"
            :key="key"
          >
            <td>{{ courseDoc.title }}</td>

            <td :class="courseDoc.fileName ? '' : 'text-red-500'">
              {{
                courseDoc.fileName
                  ? courseDoc.fileName
                  : "Require Upload Document"
              }}
            </td>
            <td>
              <router-link
                :to="`/admin/course/docx/upload/${courseId}/${courseDoc.id}`"
                class="bg-green-500 px-4 py-3 rounded-2xl text-white"
              >
                UpLoad
              </router-link>
            </td>
            <td>
              <button
                @click="openDeleteModal(courseDoc.id)"
                class="bg-red-500 px-4 py-3 rounded-2xl text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="mt-5">
    <router-link
      :to="`/admin/course/docx/add/${courseId}`"
      class="bg-button text-white p-2 rounded-md px-5 py-3"
      >Add Course Video</router-link
    >
  </div>

  <div v-if="deleteModalOpen" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-start justify-center min-h-screen">
      <!-- ... Modal content ... -->
      <div class="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3>Are you sure you want to delete this course?</h3>
        <div class="flex justify-end">
          <button
            @click="deleteCourseDoc"
            class="bg-button2 text-white px-3 py-5 rounded-3xl"
          >
            Confirm
          </button>
          <button
            @click="deleteModalOpen = false"
            class="bg-blue-500 text-white px-3 py-5 rounded-3xl ml-4"
          >
            Cancel
          </button>
        </div>
      </div>
      <!-- ... -->
    </div>
  </div>
</template>
<script>
import courseService from "@/services/courseService";
export default {
  data() {
    return {
      courseId: this.$route.params.courseId,
      listCoursedDoc: [],
      courseDocInfor: {},
      deleteModalOpen: false,
      courseToDelete: "",
    };
  },
  methods: {
    async getCourseDocByCourseId() {
      try {
        const response = await courseService.getCourseDoc(this.courseId);
        this.listCoursedDoc = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCourseById() {
      try {
        const response = await courseService.getCourseById(this.courseId);
        this.courseDocInfor = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    openDeleteModal(courseDocId) {
      this.courseToDelete = courseDocId;
      this.deleteModalOpen = true;
    },
    async deleteCourseDoc() {
      try {
        await courseService.deleteCourseDoc(this.courseId, this.courseToDelete);
        this.listCoursedDoc = this.listCoursedDoc.filter(
          (courseDoc) => courseDoc.id !== this.courseToDelete
        );
        this.deleteModalOpen = false;
        this.$toast.open({
          message: "Delete Course Doc Successfully",
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getCourseDocByCourseId();
    this.getCourseById();
  },
};
</script>
