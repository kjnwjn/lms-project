import axios from "@src/axios";

const blogService = {
    async getBlogById(idBlog) {
        const response = await axios.get(`blog/${idBlog}`);
        return response;
    },
    getBlogs() {
        const response = axios.get(`blog`);
        return response;
    },
    getBlogsByUserId(idUser) {
        const response = axios.get(`blog/find-by-user-id/${idUser}`);
        return response;
    },
    getBlogsByCategoryId(idCategory) {
        const response = axios.get(`blog/find-by-category-id/${idCategory}`);
        return response;
    },
    getBlogsCommentByIdBlog(blogId) {
        const response = axios.get(`blog-comment/blog/${blogId}`);
        return response;
    },
    async createBlog(blog) {
        const response = await axios.post(`blog`, { ...blog });
        return response;
    },
    async createComment(blogId, desc) {
        const response = await axios.post(`blog-comment`, { blogId, desc });
        return response;
    },
    getAllCategory() {
        const response = axios.get(`category`);
        return response;
    },
};

export default blogService;
