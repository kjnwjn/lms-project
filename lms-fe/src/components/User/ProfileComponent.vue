<template>
  <h1 class="text-white mb-5 text-3xl">Home > Profile</h1>
  <div class="flex">
    <div
      class="text-center bg-white m-1 p-3 border-yellow-100 border-2 rounded-2xl"
    >
      <div class="border-b-2 border-gray-300 rounded-2x">
        <img :src="userProfile.picture" alt="" class="rounded-2xl w-80" />
        <p class="mt-3">
          {{ userProfile.firstName }}{{ userProfile.lastName }}
        </p>
        <p class="mb-3">Role: {{ userRoles.role_name }}</p>
      </div>
      <div class="py-4">
        <button
          @click="showUpdateAvatar = true"
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Update Avatar
        </button>
        <div v-if="showUpdateAvatar" class="mt-4">
          <input
            type="file"
            @change="handleAvatarUpload"
            class="border-2 border-gray-300 p-2 w-full"
          />
          <button
            @click="updateAvatar"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
          >
            Save
          </button>
          <button
            @click="showUpdateAvatar = false"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <div
      class="bg-white m-1 border-yellow-100 border-2 rounded-2xl p-10 w-full"
    >
      <div class="border-b-2 border-gray-200 py-3">
        <h2><font-awesome-icon :icon="['fas', 'user']" /> Personal Info</h2>
        <p>First Name: {{ userProfile.firstName }}</p>
        <p>Last Name: {{ userProfile.lastName }}</p>
      </div>
      <div class="border-b-2 border-gray-200 py-3">
        <h3><font-awesome-icon :icon="['fas', 'phone']" /> Contact Info</h3>
        <p>Email: {{ userProfile.email }}</p>
        <p>
          Tel No.: {{ userProfile.phone ? userProfile.phone : "No contact" }}
        </p>
        <p>
          Address/city:
          {{ userProfile.address ? userProfile.address : "No contact" }}
        </p>
      </div>
      <div class="py-3">
        <h3>
          <font-awesome-icon :icon="['fas', 'calendar-days']" /> Important Dates
        </h3>

        <p>Last login: {{ formatDate(userProfile.lastLogin) }}</p>
        <p>Registered Date: {{ formatDate(userProfile.dateJoined) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/services/userService";

export default {
  name: "ProfileComponent",
  data() {
    return {
      userProfile: {},
      userRoles: {},
      showUpdateAvatar: false,
      avatarFile: null,
    };
  },
  methods: {
    handleAvatarUpload(event) {
      this.avatarFile = event.target.files[0];
    },
    async getUserProfile() {
      try {
        const userEmail = localStorage.getItem("user");
        const response = await userService.getUserProfile(userEmail);
        this.userProfile = response.data.data;
        console.log(this.userProfile);
        this.userRoles = response.data.data.roles[0];
      } catch (error) {
        console.log(error);
      }
    },
    async updateAvatar() {
      try {
        const formData = new FormData();
        formData.append("picture", this.avatarFile);
        const response = await userService.upLoadAvatar(formData);
        console.log(response);
        this.showUpdateAvatar = false;
        this.getUserProfile();
        this.$toast.success("Avatar updated successfully");
      } catch (error) {
        console.log(error);
        this.$toast.error("Failed to update avatar");
      }
    },
    formatDate(dateString) {
      var date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const minutes = date.getMinutes();
      const hours = date.getHours();
      const seconds = date.getSeconds();
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    },
  },

  mounted() {
    this.getUserProfile();
  },
};
</script>
