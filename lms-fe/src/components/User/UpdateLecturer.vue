<template>
  <h2 class="text-2xl text-white">Home > Account Settings</h2>
  <form @submit.prevent="handlerSubmit">
    <div class="mt-4 flex">
      <div class="w-1/2 bg-white">
        <div class="text-center py-4 bg-gradient-to-r from-indigo-500">
          Email & Personal Info
        </div>
        <div class="px-5 py-5">
          <div class="mt-5">
            <h2>Email Address*</h2>
            <input type="text" class="rounded-full w-full" v-model="email" />
          </div>
          <div class="mt-5">
            <h2>First Name*</h2>
            <input
              type="text"
              class="rounded-full w-full"
              v-model="firstName"
            />
          </div>
          <div class="mt-5">
            <h2>Last Name*</h2>
            <input type="text" class="rounded-full w-full" v-model="lastName" />
          </div>
          <div class="mt-5">
            <h2>Phone</h2>
            <input type="text" class="rounded-full w-full" v-model="phone" />
          </div>
          <div class="mt-5">
            <h2>Address / city*</h2>
            <input type="text" class="rounded-full w-full" v-model="address" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button class="p-4 bg-button rounded-2xl text-white">
        Update Profile
      </button>
    </div>
  </form>
</template>

<script>
import adminService from "@/services/adminService";
import userService from "@/services/userService";

export default {
  data() {
    return {
      userProfiles: {},
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    };
  },
  methods: {
    async getUserProfileByEmail() {
      try {
        const email = this.$route.params.email;
        const response = await userService.getUserProfile(email);
        this.userProfiles = response.data.data;
        this.email = this.userProfiles.email;
        this.firstName = this.userProfiles.firstName;
        this.lastName = this.userProfiles.lastName;
        this.phone = this.userProfiles.phone;
        this.address = this.userProfiles.address;
      } catch (error) {
        console.log(error);
      }
    },
    async updateProfile() {
      try {
        const email = this.$route.params.email;
        const response = await adminService.updateUser(email, {
          email: this.userProfiles.email,
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          address: this.address,
        });
        console.log(response);
        this.$router.push("/admin/lecturers");
      } catch (error) {
        console.log(error);
      }
    },
    handlerSubmit() {
      this.updateProfile();
    },
  },
  mounted() {
    this.getUserProfileByEmail();
  },
};
</script>
