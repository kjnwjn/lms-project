<template>
  <button
    data-drawer-target="separator-sidebar"
    data-drawer-toggle="separator-sidebar"
    aria-controls="separator-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="separator-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <a
            href="/"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <font-awesome-icon :icon="['fas', 'house']" />
            <span class="ms-3">Home</span>
          </a>
        </li>
        <li>
          <router-link
            to="/admin/profile"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <font-awesome-icon :icon="['fas', 'user']" />
            <span class="flex-1 ms-3 whitespace-nowrap">Profile</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link
            to="/admin"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <font-awesome-icon :icon="['fas', 'user-tie']" />
            <span class="flex-1 ms-3 whitespace-nowrap">Admin Panel</span>
          </router-link>
        </li> -->
        <li>
          <router-link
            to="/admin/lecturers"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <font-awesome-icon :icon="['fas', 'person-chalkboard']" />
            <span class="flex-1 ms-3 whitespace-nowrap">Lecturers</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/students"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <font-awesome-icon :icon="['fas', 'graduation-cap']" />
            <span class="flex-1 ms-3 whitespace-nowrap">Students</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/courses"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <font-awesome-icon :icon="['fas', 'book-open']" />
            <span class="flex-1 ms-3 whitespace-nowrap"
              >Programs & Courses</span
            >
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/category"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <font-awesome-icon :icon="['fas', 'list-check']" />
            <span class="flex-1 ms-3 whitespace-nowrap"
              >Category</span
            ></router-link
          >
        </li>
        <li>
          <router-link
            to="/admin/blog"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <font-awesome-icon :icon="['fas', 'book-open']" />
            <span class="flex-1 ms-3 whitespace-nowrap">Blog</span></router-link
          >
        </li>
      </ul>
      <ul
        class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700"
      >
        <!-- <li>
          <router-link
            to="/account-settings"
            class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
          >
            <font-awesome-icon :icon="['fas', 'gears']" />
            <span class="ms-3">Account Settings</span>
          </router-link>
        </li> -->
        <!-- <li>
          <router-link
            to="/reset-password"
            class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
          >
            <font-awesome-icon :icon="['fas', 'key']" />
            <span class="ms-3">Change Password</span>
          </router-link>
        </li> -->
        <li>
          <a
            href="/login"
            @click="logout"
            class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
          >
            <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
            <span class="ms-3">Sign Out</span>
          </a>
        </li>
        <!-- <li>
          <router-link
            to="/contact"
            class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
          >
            <font-awesome-icon :icon="['fas', 'lightbulb']" />
            <span class="ms-3">Help</span>
          </router-link>
        </li> -->
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
