<template>
  <h1 class="text-white text-2xl">Home > Students</h1>
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
          v-for="(student, key) in students"
          :key="key"
        >
          <td>{{ key + 1 }}</td>
          <td>{{ student.id }}</td>
          <td>{{ student.firstName }} {{ student.lastName }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phone }}</td>
          <td>{{ student.address }}</td>
          <td>{{ formatDate(student.lastLogin) }}</td>
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
                <router-link :to="`/admin/student/update/${student.email}`">
                  Update
                </router-link>
              </div>
              <div class="bg-red-500 px-4 py-3 rounded-2xl text-white w-full">
                <button @click="openDeleteModal(student.email)" class="">
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
        to="/admin/students/add"
        class="bg-button text-white p-2 rounded-md px-5 py-3"
        >Add Student</router-link
      >
    </div>
  </div>
  <div v-if="deleteModalOpen" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-start justify-center min-h-screen">
      <!-- ... Modal content ... -->
      <div class="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <h3>Are you sure you want to delete this student?</h3>
        <div class="flex justify-end">
          <button
            @click="deleteStudent"
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
  data() {
    return {
      students: [],
      showActions: null,
      deleteModalOpen: false,
      studentToDelete: null,
    };
  },
  methods: {
    openDeleteModal(email) {
      this.studentToDelete = email;
      this.deleteModalOpen = true;
    },
    async deleteStudent() {
      try {
        await adminService.deleteLecturer(this.studentToDelete);
        this.students = this.students.filter(
          (student) => student.email !== this.studentToDelete
        );
        this.deleteModalOpen = false;
      } catch (error) {
        console.log(error);
      }
    },
    async getLecturers() {
      try {
        const response = await adminService.getAllStudent();
        this.students = response.data.data;
        console.log(this.students);
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
