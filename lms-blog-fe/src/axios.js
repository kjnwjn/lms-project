import axios from "axios";
axios.defaults.baseURL = `${process.env.VUE_APP_API_BASE_URL}`;
axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(localStorage.getItem("x-access-token"))}`;
export default axios;
