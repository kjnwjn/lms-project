<template>
    <nav>
        <ul>
            <li><router-link to="/" exact>Blogs</router-link></li>
            <li v-if="isRoleExist"><router-link to="/add" exact>Add a new blog</router-link></li>
            <li v-if="!accessToken"><router-link to="/login" exact>Login</router-link></li>
            <li v-if="accessToken" v-on:click="logout"><router-link to="/login" exact>Logout</router-link></li>
        </ul>
    </nav>
</template>

<script>
import { mapState } from "vuex";
import checkRoleExist from "@src/helpers";
export default {
    name: "navbarApp",
    data: () => {
        return {
            isRoleExist: false,
        };
    },
    methods: {
        logout() {
            localStorage.removeItem("x-access-token");
            this.$store.commit("set_access_token", null);
        },
    },
    mounted() {
        if (this.payload) {
            this.isRoleExist = checkRoleExist(this.payload, ["ADMIN", "LECTURER"]);
            console.log(this.isRoleExist);
        }
    },
    computed: { ...mapState(["accessToken", "payload"]) },
};
</script>

<style scoped>
ul {
    list-style-type: none;
    text-align: center;
    margin: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}

nav {
    background: #444;
    padding: 14px 0;
    margin-bottom: 40px;
}

.router-link-active {
    background: #eee;
    color: #444;
}
</style>
