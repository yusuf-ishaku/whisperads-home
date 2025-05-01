// "use client";

// export function getCurrentUser() {
//   if (typeof window === "undefined") return null;
//   const user = sessionStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// }

// export function getAuthToken() {
//   if (typeof window === "undefined") return null;
//   return sessionStorage.getItem("token");
// }

// export function isAuthenticated() {
//   return !!getAuthToken();
// }

// export function logout() {
//   sessionStorage.removeItem("user");
//   sessionStorage.removeItem("token");
// }