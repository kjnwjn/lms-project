<template>
    <div class="comment">
        <ul v-if="blogComments.length" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <li v-for="comment in blogComments" v-bind:key="comment?.id" class="pb-3 sm:pb-4">
                <div class="flex items-center space-x-4 rtl:filteredBlogsspace-x-reverse">
                    <div class="flex-shrink-0">
                        <img
                            class="w-8 h-8 rounded-full"
                            :src="
                                comment?.email?.picture ||
                                'data:image/jpeg;base64,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'
                            "
                            alt="Neil image"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-bold text-gray-900 truncate dark:text-white">
                            {{ comment?.email?.firstName + " " + comment?.email?.lastName }}
                        </p>

                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            {{ comment?.desc }}
                        </p>
                    </div>
                </div>
            </li>
        </ul>

        <div class="w-full">
            <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leave a comment</label>
                    <textarea
                        id="desc"
                        rows="4"
                        v-model="desc"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                    ></textarea>
                </div>
                <button class="bg-button2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Post comment
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import blogService from "@src/services/blogService";
export default {
    name: "blogComment",
    components: {},
    props: {
        blogId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            blogComments: [],
            desc: "",
            isLoading: true,
        };
    },
    methods: {
        async handleSubmit(e) {
            try {
                e.preventDefault();
                const res = await blogService.createComment(this.blogId, this.desc);
                console.log(res);
                if (res?.data?.status) {
                    this.$router.go();
                } else {
                    this.$toast.error(res?.data?.message || "Something went wrong");
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        this.isLoading = true;
        try {
            const res = await blogService.getBlogsCommentByIdBlog(Number(this.blogId));
            console.log(res);
            const blogsArr = [];
            if (res.data.status) {
                for (let key in res.data.data) {
                    blogsArr.push({ ...res.data.data[key] });
                }
                this.blogComments = blogsArr;
                console.log(this.blogComments);
            }
            this.isLoading = false;
        } catch (error) {
            this.$toast.error(error?.response?.statusText || "Something went wrong");
        }
    },
};
</script>

<style scoped></style>
