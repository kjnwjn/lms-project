<template>
  <div id="add-blog" class="bg-white p-5 rounded">
    <div id="section-1">
      <h2>Add a new blog post</h2>
      <form @submit.prevent="submitBlogFun" v-if="!submitted && !isLoading">
        <input
          class="mb-2"
          type="text"
          v-model="blog.title"
          required
          placeholder="Blog title"
        />
        <input
          class="mb-2"
          type="text"
          v-model="blog.description"
          required
          placeholder="Blog description"
        />
        <div id="content">
          <ckeditor
            required
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
          ></ckeditor>
        </div>
        <div id="blog-categories" v-if="categories.length">
          <label
            for="level"
            class="block mt-0 text-sm font-medium text-gray-900"
            >Select an level</label
          >
          <select
            id="level"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="blog.categoryId"
          >
            <option disabled value="">Please select one level</option>
            <option
              v-for="(cate, key) in categories"
              :key="key"
              :value="Number(cate?.id)"
            >
              {{ cate?.name }}
            </option>
          </select>
        </div>
        <div class="buttons">
          <button
            class="rounded-md w-30 px-3 py-1 bg-green-600 text-white hover:bg-green-600"
          >
            Submit Blog
          </button>
          <button
            class="rounded-md w-30 px-3 py-1 bg-red-600 text-white hover:bg-red-500"
            v-on:click.prevent="clear"
          >
            Cancel
          </button>
        </div>
      </form>
      <div v-if="submitted" class="success">
        <h3>Blog submitted successfully!</h3>
      </div>
    </div>
    <div id="section-2">
      <h3>Preview Blog</h3>
      <div v-if="!isLoading">
        <div class="preview-section" v-html="editorData"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import blogCategories from "./blogCategories.vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import adminService from "@/services/adminService";
export default {
  name: "addBlog",
  components: {
    // BlogCategories: blogCategories,
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      blog: {
        title: "",
        description: "",
        content: "",
        categoryId: null,
      },
      categories: [],
      submitted: false,
      isLoading: true,
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        cloudServices: {
          tokenUrl:
            "https://106494.cke-cs.com/token/dev/OVKZhIo2SIv8R9KjTV4Mf2uu5n5rbCnLyEXk?limit=10",
          uploadUrl: "https://106494.cke-cs.com/easyimage/upload/",
        },
      },
    };
  },
  watch: {
    // editorData(newData) {
    //     this.updatePreview(newData); // Update preview when editorData changes
    // },
  },
  methods: {
    submitBlogFun(e) {
      e.preventDefault();

      this.blog.content = this.editorData;
      adminService
        .createNewBlog(this.blog)
        .then((res) => {
          if (res.data.status) {
            this.submitted = true;
            this.$toast.success("Blog submitted successfully");
          }
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            this.$router.push("/login");
          }
          this.$toast.error("Failed to submit blog");
        });
    },
    clear() {
      this.blog.title = "";
      this.blog.description = "";
      this.blog.content = "";
      this.blog.categoryId = null;
      this.editorData = "";
    },
    updatePreview(data) {
      // You can manipulate the data here before updating the preview
      this.blog.content = data;
    },
  },
  created() {
    this.isLoading = true;
    adminService
      .getListCategory()
      .then((res) => {
        const cateArray = [];
        if (res.data.status) {
          for (let key in res.data.data) {
            cateArray.push({ ...res.data.data[key] });
          }
          this.categories = cateArray;
          this.$toast.success("Categories loaded successfully");
        }
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
        this.$toast.error("Failed to load Categories");
      });
  },
};
</script>

<style scoped>
#add-blog {
  margin: 20px 30px;
  display: flex;
  min-height: 0;
  position: relative;
}
.ck-content img {
  max-width: 100%;
  height: auto;
}
#section-1 {
  flex: 1 1;

  width: 100%;
}
#section-2 {
  flex: 1 1;

  width: 100%;
}

#section-2 img {
  max-width: 100%;
  height: auto;
}

input {
  display: block;
  width: 100%;
  padding: 8px;
}

#blog-categories {
  display: flex;
  justify-content: start;
  margin: 10px 0;
}

.blog-category {
  display: flex;
  justify-content: start;
  margin-right: 10px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.success {
  background-color: #4caf50;
  padding: 10px;
  text-align: center;
}

.success h3 {
  margin: 0;
  color: #fff;
}

.preview-section {
  padding: 2px 20px;
  margin: 0 0;
}
.preview-section img {
  max-width: 100%;
  height: auto;
}
</style>
