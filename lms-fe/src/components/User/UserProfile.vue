<template>
  <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div class="container max-w-screen-lg mx-auto">
      <div>
        <h2 class="font-semibold text-xl text-gray-600">AI Learning</h2>
        <p class="text-gray-500 mb-6">Profile</p>

        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="text-gray-600">
              <p class="font-medium text-lg mb-2">Personal Details</p>

              <img
                :src="userInfor ? userInfor.picture : ''"
                alt=""
                class="rounded-3xl"
              />
              <button
                v-if="!isUpdateImage"
                @click="isUpdateImage = true"
                type="button"
                class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Image
              </button>
              <div v-if="isUpdateImage" class="mt-3">
                <input
                  @change="handleUploadAvatar"
                  type="file"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 mb-4"
                />
                <button
                  @click="updateAvatar"
                  type="button"
                  class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                  Save
                </button>
                <button
                  @click="isUpdateImage = false"
                  type="button"
                  class="ml-2 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div class="lg:col-span-2">
              <div
                class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
              >
                <div class="md:col-span-5">
                  <label for="first_name">FirstName</label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    v-model="firstName"
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="full_name">LastName</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    v-model="lastName"
                  />
                </div>
                <div class="md:col-span-5">
                  <label for="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    v-model="phone"
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="email">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="email@domain.com"
                    :value="userInfor ? userInfor.email : ''"
                    readonly
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="address">Address / Street</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    v-model="address"
                    placeholder=""
                  />
                </div>

                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end">
                    <button
                      @click="updateProfile"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/services/userService";
export default {
  data() {
    return {
      userProfile: null,
      userInfor: null,
      isUpdateImage: false,
      avatarFile: null,
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    };
  },
  methods: {
    async getUserProfile() {
      try {
        var user = this.userProfile.email;
        const response = await userService.getUserProfile(user);
        this.userInfor = response.data.data;
        this.firstName = this.userInfor.firstName;
        this.lastName = this.userInfor.lastName;
        this.phone = this.userInfor.phone;
        this.address = this.userInfor.address;
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
        this.isUpdateImage = false;
        this.getUserProfile();
        this.$toast.success("Avatar updated successfully");
      } catch (error) {
        console.log(error);
        this.$toast.error("Failed to update avatar");
      }
    },
    handleUploadAvatar(event) {
      this.avatarFile = event.target.files[0];
    },
    async updateProfile() {
      try {
        const response = await userService.updateProfile({
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          address: this.address,
        });
        console.log(response);
        this.$toast.success("Profile updated successfully");
      } catch (error) {
        console.log(error);
        this.$toast.error("Failed to update profile");
      }
    },
  },
  mounted() {
    this.userProfile = this.$store.getters["getUserInfo"];
    this.getUserProfile();
  },
};
</script>
