<template>
    <div class="container">
        <h2>All Blogs</h2>
        <div id="search-filter">
            <input type="text" v-model="search" placeholder="Search blogs" />
        </div>
        <Loader v-if="isLoading" />
        <Blog v-for="blog in filteredBlogs" v-bind:key="blog.id" v-bind:blog="blog" />
        <div v-if="!isLoading && filteredBlogs.length == 0">
            <h3>No blogs found!</h3>
        </div>
    </div>
</template>

<script>
import blog from "./blog.vue";
import loader from "../partials/loader.vue";
import blogService from "@src/services/blogService";

export default {
    name: "viewCategoryBlogs",
    components: {
        Blog: blog,
        Loader: loader,
    },
    data() {
        return {
            blogs: [],
            search: "",
            isLoading: true,
        };
    },
    computed: {
        filteredBlogs() {
            return this.blogs.filter((blog) => {
                return blog.title.match(this.search);
            });
        },
    },
    methods: {},
    async mounted() {
        this.isLoading = true;
        blogService
            .getBlogsByCategoryId(this.$route.params.idCategory)
            .then((res) => {
                console.log(res);
                const blogsArr = [];
                if (res.data.status) {
                    for (let key in res.data.data) {
                        blogsArr.push({ ...res.data.data[key] });
                    }
                    this.blogs = blogsArr;
                    this.$toast.success("Blogs user loaded successfully");
                }
            })
            .catch((err) => {
                console.log(err);
                this.$toast.error("Failed to load blogs");
            });

        this.isLoading = false;
    },
};
</script>

<style scoped>
#search-filter {
    margin: 20px 0;
}

#search-filter input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}
</style>
