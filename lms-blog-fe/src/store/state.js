export default {
    toastify: null,
    accessToken: localStorage.getItem("x-access-token") ? JSON.parse(localStorage.getItem("x-access-token")) : "",
    payload: localStorage.getItem("payload") ? JSON.parse(localStorage.getItem("payload")) : "",
    // tableData: null,
    // menuIndex: null,
    // pendingOrderData: [],
    // menuList: [],
    // pendingOrderList: null,
    // pendingItemUpdateStatus: null,
    // dishData: null,
};
