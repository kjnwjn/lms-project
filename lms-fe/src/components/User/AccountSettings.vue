<template>
  <h2 class="text-2xl text-white">Home > Account Settings</h2>
  <div class="mt-4 flex">
    <div class="w-1/2 bg-white">
      <div class="text-center py-4 bg-gradient-to-r from-indigo-500">
        Email & Personal Info
      </div>
      <div class="px-5 py-5">
        <div class="mt-5">
          <h2>Email Address*</h2>
          <input type="text" class="rounded-full w-full" />
        </div>
        <div class="mt-5">
          <h2>First Name*</h2>
          <input type="text" class="rounded-full w-full" />
        </div>
        <div class="mt-5">
          <h2>Last Name*</h2>
          <input type="text" class="rounded-full w-full" />
        </div>
        <div class="mt-5">
          <h2>Gender*</h2>
          <input type="text" class="rounded-full w-full" />
        </div>
        <div class="mt-5">
          <h2>Phone No.*</h2>
          <select name="" id="" class="rounded-full w-full">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="mt-5">
          <h2>Address / city*</h2>
          <input type="text" class="rounded-full w-full" />
        </div>
      </div>
    </div>
    <div class="w-1/2 bg-white ml-4">
      <div class="text-center py-4 bg-gradient-to-r from-indigo-500">
        Others
      </div>
      <div class="px-5 py-5">
        <div class="mt-5">
          <h2>Picture*</h2>
          <div class="flex my-4 border-2 border-gray-400 rounded-full">
            <div class="mr-4 bg-gray-400 rounded-full px-4 py-2">
              <span class="">Currently</span>
            </div>
            <div class="px-2 py-2">
              <span><a href="#" class="text-blue-400">test</a></span>
            </div>
          </div>
          <input
            type="file"
            class="rounded-full w-full border-2 border-gray-400"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <button class="p-4 bg-button rounded-2xl text-white">Update Profile</button>
  </div>
</template>
