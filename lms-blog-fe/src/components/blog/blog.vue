<template>
    <router-link class="normal" v-bind:to="'/blog/' + blog.id">
        <div id="blog-item">
            <h2 class="font-bold uppercase text-2xl mb-3">{{ blog?.title }}</h2>
            <p class="text-sm font-thin mb-4">{{ blog?.description | snippet }}</p>

            <ul class="flex flex-wrap items-center justify-start text-gray-900 dark:text-white">
                <router-link v-bind:to="'/user/' + blog?.userId?.id" class="text-sm font-thin" v-if="blog?.userId">
                    <p class="me-4 hover:underline md:me-6">
                        <ThemifyIcon icon="user" /> {{ blog?.userId?.firstName + " " + blog?.userId?.lastName }}
                    </p>
                </router-link>
                <li class="text-sm font-thin">
                    <p class="me-4 md:me-6"><ThemifyIcon icon="calendar" /> {{ new Date(blog?.createdAt) | date("dd MMMM yyyy") }}</p>
                </li>
                <li class="text-sm font-thin">
                    <p class="me-4 md:me-6"><ThemifyIcon icon="comments" /> {{ blog?.blogComments?.length }} comment</p>
                </li>
            </ul>
            <BlogCategories v-if="blog?.categoryId" class="mt-2" v-bind:category="blog?.categoryId" />
        </div>
    </router-link>
</template>

<script>
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import blogCategoriesVue from "./blogCategories.vue";
export default {
    name: "viewBlogs",
    components: {
        ThemifyIcon,
        BlogCategories: blogCategoriesVue,
    },
    props: {
        blog: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
#blog-item {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
}

.normal {
    text-decoration: none;
    color: inherit;
}
</style>
