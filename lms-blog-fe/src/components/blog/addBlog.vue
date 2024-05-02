<template>
    <div id="add-blog">
        <div id="section-1">
            <h2>Add a new blog post</h2>
            <Loader v-if="isLoading" />
            <form @submit.prevent="submitBlogFun" v-if="!submitted && !isLoading">
                <input class="mb-2" type="text" v-model="blog.title" required placeholder="Blog title" />
                <input class="mb-2" type="text" v-model="blog.description" required placeholder="Blog description" />
                <div id="content">
                    <ckeditor required :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
                </div>
                <div id="blog-categories" v-if="categories.length">
                    <div v-for="cate in categories" v-bind:key="cate?.id" class="blog-category">
                        <label :for="'cate-item' + cate?.id">{{ cate?.name }}: </label>
                        <input v-model="blog.categoryId" :id="'cate-item' + cate?.id" type="radio" :value="Number(cate?.id)" name="cate-item" />
                    </div>
                </div>
                <div class="buttons">
                    <button class="btn btn-primary">Submit Blog</button>
                    <button class="btn btn-danger" v-on:click.prevent="clear">Cancel</button>
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
import loader from "../partials/loader.vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import blogService from "@src/services/blogService";
export default {
    name: "addBlog",
    components: {
        // BlogCategories: blogCategories,
        ckeditor: CKEditor.component,
        Loader: loader,
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
                    tokenUrl: "https://106494.cke-cs.com/token/dev/OVKZhIo2SIv8R9KjTV4Mf2uu5n5rbCnLyEXk?limit=10",
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
            console.log(this.blog);
            this.blog.content = this.editorData;
            blogService
                .createBlog(this.blog)
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
        blogService
            .getAllCategory()
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
