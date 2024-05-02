<template>
  <h1 class="text-white text-2xl">Home > Category</h1>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="my-5">
      <button
        class="text-white p-2 rounded-md px-5 py-3"
        :class="isCategoryNew ? 'bg-button2' : 'bg-button'"
        @click="() => (isCategoryNew = !isCategoryNew)"
      >
        Add New Category
      </button>
    </div>
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">Category Name</th>
          <th scope="col" class="px-6 py-3">status</th>
          <th scope="col" class="px-6 py-3">blogs</th>
          <th scope="col" class="px-6 py-3">createdBy</th>
          <th scope="col" class="px-6 py-3">updatedBy</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(category, key) in categoryList"
          :key="key"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ key + 1 }}
          </th>
          <td class="px-6 py-4">{{ category?.name }}</td>
          <td class="px-6 py-4">
            <button
              class="rounded-md w-24 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              :class="
                !category?.active
                  ? `bg-indigo-600 hover:bg-indigo-500 `
                  : `bg-red-600 hover:bg-red-500`
              "
              @click="handleActiveBtn(category?.id)"
            >
              {{ category?.active ? `Deactivate` : `Active` }}
            </button>
          </td>

          <td class="px-6 py-4">{{ category?.blogs?.length }}</td>
          <td class="px-6 py-4">{{ category?.createdBy }}</td>
          <td class="px-6 py-4">{{ category?.updatedBy }}</td>
          <td class="flex items-center px-6 py-4">
            <p
              @click="() => handleCategoryUpdate(key)"
              class="font-medium text-blue-600 cursor-pointer dark:text-blue-500 hover:underline"
            >
              Update
            </p>
            <p
              @click="handleRemoveBtn(category.id)"
              class="font-medium text-red-600 cursor-pointer dark:text-red-500 hover:underline ms-3"
            >
              Remove
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <form
      class="bg-white rounded mt-5"
      v-if="isCategoryNew"
      @submit.prevent="CreateCategory"
    >
      <div class="space-y-12 p-5">
        <div class="border-b border-gray-900/10 pb-3">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            New Category
          </h2>
          <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >name</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model="name"
                    name="name"
                    id="name"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
          @click="() => (isCategoryNew = !isCategoryNew)"
        >
          Cancel
        </button>
        <button
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    <form
      class="bg-white rounded mt-5"
      v-if="isCategoryUpdate"
      @submit.prevent="handleUpdateBtn"
    >
      <div class="space-y-12 p-5">
        <div class="border-b border-gray-900/10 pb-3">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Update Category
          </h2>
          <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label
                for="content"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Content</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model="nameUpdate"
                    name="content"
                    id="content"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
          @click="() => (isCategoryUpdate = !isCategoryUpdate)"
        >
          Cancel
        </button>
        <button
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  </div>
  <div class="mt-5">
    <p class="text-red-300">
      * If you remove the category, all the blogs related to this
    </p>
  </div>
</template>
<script>
import adminService from "@/services/adminService";
export default {
  data() {
    return {
      categorySelected: null,
      name: "",
      nameUpdate: "",
      showActions: false,
      categoryList: [],
      isCategoryNew: false,
      isCategoryUpdate: false,
    };
  },
  methods: {
    async getAllCategoryList() {
      try {
        const response = await adminService.getListCategory();
        console.log(response.data.data);
        this.categoryList = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async handleActiveBtn(id) {
      console.log(id);
      // try {
      //   await adminService.activeCourse(id);
      //   this.getListCategory();
      // } catch (error) {
      //   console.log(error);
      //   this.$toast.error(error?.response?.data?.message);
      // }
    },
    handleCategoryUpdate(i) {
      this.categorySelected = this.categoryList[i];
      this.isCategoryUpdate = true;
      this.nameUpdate = this.categorySelected.name;
    },

    async CreateCategory() {
      try {
        await adminService.createNewCategory({
          name: this.name,
        });
        this.getAllCategoryList();
        this.isQuizQuestionForm = false;
        this.name = "";
        this.$toast.success("Create new quiz question success");
      } catch (error) {
        console.log(error);
      }
    },
    async handleRemoveBtn(id) {
      try {
        await adminService.removeCategory(id);
        this.getAllCategoryList();
      } catch (error) {
        console.log(error);
        this.$toast.error(error?.response?.data?.message);
      }
    },
    async handleUpdateBtn() {
      try {
        await adminService.updateCategory(this.categorySelected.id, {
          name: this.nameUpdate,
        });
        this, (this.isCategoryUpdate = false);
        this.getAllCategoryList();
      } catch (error) {
        console.log(error);
        this.$toast.error(error?.response?.data?.message);
      }
    },
  },
  mounted() {
    this.getAllCategoryList();
  },
};
</script>
