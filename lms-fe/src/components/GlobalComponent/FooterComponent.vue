<template>
  <div class="footer px-10 pt-5 bg-footer">
    <div class="flex justify-between items-center mb-6">
      <div class="w-2/5">
        <img src="@/assets/images/logo.png" alt="" class="w-52" />
        <div class="ml-5">
          <span class="text-textColor2"
            >Veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </span>
        </div>
      </div>
      <div>
        <span class="text-white text-2xl">Quick Links</span>
        <div class="flex mt-4 text-textColor2">
          <div>
            <div>About</div>
            <div>Course</div>
          </div>
          <div class="ml-3">
            <div>Blog</div>
            <div>Contact</div>
          </div>
        </div>
      </div>
      <div>
        <div class="text-white text-2xl">Contact Us</div>
        <div class="mt-4 text-textColor2">
          <div class="">
            <font-awesome-icon :icon="['fas', 'phone']" />
            <span class="ml-2">0907048435</span>
          </div>
          <div>
            <font-awesome-icon :icon="['fas', 'envelope']" />
            <span class="ml-2">anhdung5c1@gmail.com</span>
          </div>
        </div>
      </div>
      <div class="text-textColor2">
        <font-awesome-icon :icon="['fas', 'location-dot']" />
        <span class="ml-2">Ton Duc Thang University</span>
      </div>
    </div>
    <div class="py-8 border-t mx-4 text-textColor2">
      <div>Copyright 2023 | All Rights Reserved</div>
    </div>
  </div>
</template>
