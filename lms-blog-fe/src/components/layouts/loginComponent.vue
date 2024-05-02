<template>
    <div class="flex justify-center items-center h-screen">
        <div class="bg-white login flex justify-center items-center">
            <div class="w-1/2">
                <form @submit.prevent="handleSubmit">
                    <div class="w-3/5 mx-40">
                        <h1 class="text-4xl pb-10">WELCOME TO US</h1>

                        <div class="mb-5 form-group">
                            <h2 class="mb-2">Email</h2>
                            <input type="text" placeholder="Enter your email" class="rounded-full w-full" v-model="email" required />
                        </div>

                        <div class="mb-2 form-group">
                            <h2>Password</h2>
                            <input type="password" class="rounded-full w-full" v-model="password" required />
                        </div>
                        <div class="text-red-500 mb-3" v-if="error">
                            <span>{{ error }}</span>
                        </div>

                        <button class="text-white text-center px-5 py-3 bg-button rounded-full mb-3 w-full">Sign In</button>

                        <div>
                            <span>Don't have an account? </span>
                            <router-link to="/register" class="text-button">Sign up</router-link>
                        </div>
                    </div>
                </form>
            </div>
            <div class="image-right">
                <img src="@/assets/course-login.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "@src/routes";
import { jwtDecode } from "jwt-decode";

export default {
    name: "loginComponent",
    data() {
        return {
            email: "",
            password: "",
            error: "",
        };
    },
    methods: {
        async handleSubmit(e) {
            e.preventDefault();
            axios
                .post(`${process.env.VUE_APP_API_BASE_URL}auth/login`, { email: this.email, password: this.password })
                .then((res) => {
                    if (!res.data.status) {
                        this.$toast.error(res.data?.message || "Something went wrong");
                    } else {
                        this.$toast.success(`Login successfully`);
                        localStorage.setItem("x-access-token", JSON.stringify(res.data.data.access_token));
                        localStorage.setItem("payload", JSON.stringify(jwtDecode(res.data.data.access_token)));
                        this.$store.commit("set_payload", jwtDecode(res.data.data.access_token));
                        this.$store.commit("set_access_token", res.data.data.access_token);
                        router.push("/");
                    }
                })
                .catch((err) => {
                    this.$toast.error(err?.response?.statusText || "Something went wrong");
                });
        },
    },
};
</script>

<style lang="css" scoped>
.login {
    width: 1080px;
    height: 650px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 1080px) {
    .login {
        width: 100%;
        padding: 20px;
    }
}

@media (max-width: 768px) {
    .login > div {
        width: 100%;
    }
    .login > div > form > div {
        width: 100%;
        margin: 0;
    }
    .image-right {
        display: none;
    }
}
</style>
