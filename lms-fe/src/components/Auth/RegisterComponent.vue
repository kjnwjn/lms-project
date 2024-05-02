<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white login flex justify-center items-center">
      <div class="w-1/2">
        <div class="w-3/5 mx-40">
          <h1 class="text-4xl pb-10">WELCOME TO US</h1>
          <div class="mb-5">
            <h2 class="mb-2">Email</h2>
            <input
              type="text"
              placeholder="Enter your email"
              class="rounded-full w-full"
            />
          </div>
          <div class="mb-5">
            <h2>Password</h2>
            <input type="password" class="rounded-full w-full" />
          </div>
          <div class="mb-5">
            <h2>Re - Password</h2>
            <input type="password" class="rounded-full w-full" />
          </div>
          <div class="text-center px-5 py-3 bg-button rounded-full mb-3">
            <button class="text-white">Sign Up</button>
          </div>
          <div>
            <span>Already have an account?</span>
            <router-link to="/login" class="text-button">Log In</router-link>
          </div>
        </div>
      </div>
      <div>
        <img src="@/assets/images/course-login.png" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.login {
  width: 1080px;
  height: 650px;
}
</style>
