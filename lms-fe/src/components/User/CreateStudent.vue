<template>
  <h2 class="text-2xl text-white">Home > Account Settings</h2>
  <form @submit.prevent="handlerSubmitStudent">
    <div class="mt-4 flex">
      <div class="w-1/2 bg-white">
        <div class="text-center py-4 bg-gradient-to-r from-indigo-500">
          Email & Personal Info
        </div>
        <div class="px-5 py-5">
          <div class="mt-5">
            <h2>Email Address*</h2>
            <input
              type="email"
              class="rounded-full w-full"
              v-model="email"
              required
            />
          </div>
          <div class="mt-5">
            <h2>First Name*</h2>
            <input
              required
              type="text"
              class="rounded-full w-full"
              v-model="firstName"
            />
          </div>
          <div class="mt-5">
            <h2>Last Name*</h2>
            <input
              type="text"
              class="rounded-full w-full"
              v-model="lastName"
              required
            />
          </div>
          <div class="mt-5">
            <h2>Password*</h2>
            <input
              type="password"
              class="rounded-full w-full"
              v-model="password"
              required
            />
          </div>
          <div class="mt-5">
            <h2>Phone</h2>
            <input
              type="text"
              class="rounded-full w-full"
              v-model="phone"
              required
            />
          </div>
          <div class="mt-5">
            <h2>Address / city*</h2>
            <input
              type="text"
              class="rounded-full w-full"
              v-model="address"
              required
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 text-red-500 text-xl" v-if="error">{{ error }}</div>
    <div class="mt-4">
      <button class="p-4 bg-button rounded-2xl text-white">
        Update Profile
      </button>
    </div>
  </form>
</template>

<script>
import adminService from "@/services/adminService";
export default {
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
      address: "",
      error: "",
    };
  },
  methods: {
    async handlerSubmitStudent() {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await adminService.createNewStudent({
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
          phone: this.phone,
          address: this.address,
        });
        this.$router.push("/admin/students");
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
  },
};
</script>
