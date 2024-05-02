<template>
  <h1 class="text-white text-2xl">Home > Lectures</h1>
  <div class="my-5">
    <table class="w-full text-center bg-white rounded-lg">
      <thead class="border-b-2 border-gray-100 h-16">
        <tr class="font-bold">
          <td>#</td>
          <td>ID NO.</td>
          <td>Full Name</td>
          <td>Email</td>
          <td>Phone Number</td>
          <td>Address/City</td>
          <td>Last Login</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr
          class="h-10 border-t-2 border-gray-100"
          v-for="(lecturer, key) in lecturers"
          :key="key"
        >
          <td>{{ key + 1 }}</td>
          <td>{{ lecturer.id }}</td>
          <td>{{ lecturer.firstName }} {{ lecturer.lastName }}</td>
          <td>{{ lecturer.email }}</td>
          <td>{{ lecturer.phone }}</td>
          <td>{{ lecturer.address }}</td>
          <td>{{ formatDate(lecturer.lastLogin) }}</td>
          <td>
            <button
              class="bg-red-500 px-4 py-3 rounded-2xl text-white"
              @click="showActions = showActions === key ? null : key"
            >
              <font-awesome-icon :icon="['fas', 'pen-to-square']" />
            </button>
            <div
              v-if="showActions === key"
              class="absolute bg-white p-2 rounded-md shadow-lg"
            >
              <div
                class="bg-blue-500 px-4 py-3 rounded-2xl text-white w-full mb-2"
              >
                <router-link :to="`/admin/lecturer/update/${lecturer.email}`">
                  Update
                </router-link>
              </div>
              <div class="bg-red-500 px-4 py-3 rounded-2xl text-white w-full">
                <button @click="openDeleteModal(lecturer.email)" class="">
                  Delete
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="my-5">
      <router-link
        to="/admin/lecturers/add"
        class="bg-button text-white p-2 rounded-md px-5 py-3"
        >Add Lecturer</router-link
      >
    </div>
  </div>
  <!-- Delete Confirmation Modal -->
  <div v-if="deleteModalOpen" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-start justify-center min-h-screen">
      <!-- ... Modal content ... -->
      <div class="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3>Are you sure you want to delete this lecturer?</h3>
        <div class="flex justify-end">
          <button
            @click="deleteLecturer"
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
import adminService from "@/services/adminService";

export default {
  name: "LecturersComponent",

  data() {
    return {
      lecturers: [],
      showActions: null,
      deleteModalOpen: false,
      lecturerToDelete: null,
    };
  },
  methods: {
    openDeleteModal(email) {
      this.lecturerToDelete = email;
      this.deleteModalOpen = true;
    },
    async deleteLecturer() {
      try {
        await adminService.deleteLecturer(this.lecturerToDelete);
        this.lecturers = this.lecturers.filter(
          (lecturer) => lecturer.email !== this.lecturerToDelete
        );
        this.deleteModalOpen = false;
      } catch (error) {
        console.log(error);
      }
    },

    async getLecturers() {
      try {
        const response = await adminService.getAlllecturer();
        this.lecturers = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(dateString) {
      var date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year} `;
    },
  },
  mounted() {
    this.getLecturers();
  },
};
</script>
