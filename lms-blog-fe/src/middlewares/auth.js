export default async function (to, from, next) {
    const token = JSON.parse(localStorage.getItem("x-access-token"));
    if (token) {
        // User is authenticated, proceed to the route
        next();
    } else {
        // User is not authenticated, redirect to login
        next("/login");
    }
}
