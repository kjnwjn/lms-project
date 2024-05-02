import { createStore } from "vuex";
import jwt from "jsonwebtoken";

const store = createStore({
  state: {
    userInfor: null,
  },
  mutations: {
    updateUserInfo(state, userInfor) {
      // Cập nhật thông tin người dùng từ token giải mã
      state.userInfor = userInfor;
    },
  },
  actions: {
    decodeToken({ commit }, token) {
      // Giải mã token và cập nhật thông tin người dùng
      try {
        const decoded = jwt.decode(token);
        // Thực hiện bất kỳ xử lý nào cần thiết với thông tin giải mã
        // Ví dụ: cập nhật thông tin người dùng trong store
        commit("updateUserInfo", decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    },
  },
  getters: {
    getUserInfo(state) {
      return state.userInfor;
    },
  },
});
export default store;
