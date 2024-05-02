import Vue from "vue";
import VueRouter from "vue-router";
import viewUserBlogs from "./components/blog/viewUserBlogs.vue";
import viewCategoryBlogs from "./components/blog/viewCategoryBlogs.vue";
import viewBlogs from "./components/blog/viewBlogs.vue";
import addBlog from "./components/blog/addBlog.vue";
import singleBlog from "./components/blog/singleBlog.vue";
import loginComponent from "./components/layouts/loginComponent.vue";
import NotFound from "./components/partials/notFound.vue";
import auth from "@src/middlewares/auth";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: viewBlogs,
    },
    {
        path: "/user/:idUser",
        component: viewUserBlogs,
    },
    {
        path: "/blog/category/:idCategory",
        component: viewCategoryBlogs,
    },
    {
        path: "/add",
        beforeEnter: auth,
        component: addBlog,
    },
    {
        path: "/add/:id",
        component: addBlog,
    },
    {
        path: "/blog/:id",
        component: singleBlog,
    },

    {
        path: "/login",
        component: loginComponent,
    },
    {
        path: "*",
        component: NotFound,
    },
];
const router = new VueRouter({
    mode: "history",
    linkExactActiveClass: "is-active",
    base: location.pathname,
    routes,
});

export default router;
