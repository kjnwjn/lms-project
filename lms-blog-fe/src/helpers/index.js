export default async function checkRoleExist(user, roleCheck = []) {
    return user?.roles.some((role) => roleCheck.includes(role?.role_name));
}
