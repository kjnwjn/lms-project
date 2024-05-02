import axios from "axios";

const userService = {
  async getUserProfile(user_email) {
    const response = await axios.get(`/user/${user_email}`);
    return response;
  },
  async upLoadAvatar(data) {
    const response = await axios.patch("/user/picture/upload-avatar", data);
    return response;
  },
  async updateProfile(data) {
    const response = await axios.patch("/user/update-profile", data);
    return response;
  },
  async getCourseByUserId(user_id) {
    const response = await axios.get(`/course/user/${user_id}`);
    return response;
  },
  async studentRegister(data) {
    const response = await axios.post("/user/students/signup", data);
    return response;
  },
  async lecturerRegister(data) {
    const response = await axios.post("/user/lecturers/signup", data);
    return response;
  },
};
export default userService;
