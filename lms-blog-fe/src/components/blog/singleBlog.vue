<template>
    <div class="container">
        <div id="blog-item">
            <Loader v-if="isLoading" />
            <h2 class="text-center text-2xl">{{ blog?.title }}</h2>
            <h3 class="text-center text-2xl">{{ blog?.description }}</h3>
            <div class="preview-section mt-8" v-html="blog?.content"></div>
        </div>
        <BlogComment v-bind:blogId="id" />
        <!-- <div class="buttons">
            <button v-bind:disabled="isLoading" class="btn btn-danger" v-on:click.prevent="deleteBlog">Delete Blog</button>
        </div> -->
    </div>
</template>

<script>
import loader from "../partials/loader.vue";
import blogService from "@src/services/blogService";
import blogComment from "@src/components/blog-comment/blogComment.vue";

export default {
    name: "singleBlog",
    components: {
        Loader: loader,
        BlogComment: blogComment,
    },
    data() {
        return {
            blog: {},
            id: this.$route.params.id,
            isLoading: true,
        };
    },

    async created() {
        this.isLoading = true;
        try {
            const res = await blogService.getBlogById(this.id);
            if (res.data.status) {
                this.blog = res.data.data;
            } else {
                this.$toast.error(res?.data?.message || "Something went wrong");
            }
            this.isLoading = false;
            this.$toast.success("Blog loaded successfully");
        } catch (error) {
            this.$toast.error(error?.response?.statusText || "Something went wrong");
        }
    },
    methods: {
        // deleteBlog() {
        //     axios.delete(`${apiBaseUrl.apiBaseUrl}/posts/${this.id}.json`).then((data) => {
        //         console.log(data.data);
        //         this.$router.push("/");
        //     });
        // },
    },
};
</script>

<style scoped>
#blog-item {
    padding: 20px;
    margin: 20px auto;
    box-sizing: border-box;
    background: #eee;
    min-height: 150px;
}
</style>
