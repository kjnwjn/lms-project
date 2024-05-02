import axios from "axios";

const authService = {
  async login(credentials) {
    const response = await axios.post(`auth/login`, credentials);
    const token = response.data.data.access_token;
    return token;
  },
  logout() {
    localStorage.clear();
  },
};

export default authService;
