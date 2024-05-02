<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white login flex justify-center items-center">
      <div class="w-1/2">
        <form @submit.prevent="handleSubmit">
          <div class="w-3/5 mx-40">
            <h1 class="text-4xl pb-10">WELCOME TO US</h1>

            <div class="mb-5 form-group">
              <h2 class="mb-2">Email</h2>
              <input
                type="text"
                placeholder="Enter your email"
                class="rounded-full w-full"
                v-model="email"
                required
              />
            </div>

            <div class="mb-2 form-group">
              <h2>Password</h2>
              <input
                type="password"
                class="rounded-full w-full"
                v-model="password"
                required
              />
            </div>
            <div class="text-red-500 mb-3" v-if="error">
              <span>{{ error }}</span>
            </div>

            <button
              class="text-white text-center px-5 py-3 bg-button rounded-full mb-3 w-full"
            >
              Sign In
            </button>

            <div>
              <span>Don't have an account? </span>
              <router-link to="/register-student" class="text-button"
                >Sign up</router-link
              >
            </div>
          </div>
        </form>
      </div>
      <div class="image-right">
        <img src="@/assets/images/course-login.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import authService from "@/services/authService";
import userService from "@/services/userService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        console.log("login");
        const response = await authService.login({
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;

        localStorage.setItem("user", this.email);
        const user = localStorage.getItem("user");
        const responseUser = await userService.getUserProfile(user);
        const userRole = responseUser.data.data.roles;
        localStorage.setItem("userRole", userRole[0].role_name);

        if (userRole[0].role_name === "ADMIN") {
          this.$router.push("/admin");
        } else {
          this.$router.push("/");
        }
      } catch (error) {
        this.error = "Invalid email or password";
      }
    },
  },
};
</script>

<style lang="css" scoped>
.login {
  width: 1080px;
  height: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1080px) {
  .login {
    width: 100%;
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .login > div {
    width: 100%;
  }
  .login > div > form > div {
    width: 100%;
    margin: 0;
  }
  .image-right {
    display: none;
  }
}
</style>
