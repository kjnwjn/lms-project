<template>
    <div>
        <ul>
            <li>
                <router-link class="normal" v-bind:to="'/blog/category/' + Number(category?.id)">{{ category?.name }} </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "blogCategories",
    props: {
        category: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

li {
    list-style: none;
    background-color: #444;
    color: white;
    margin-right: 5px;
    padding: 5px;
    border-radius: 3px;
}
</style>
