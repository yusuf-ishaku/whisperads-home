// "use client";

// import { useEffect, useState } from "react";

// export function useAuth() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = sessionStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   return {
//     user,
//     isAuthenticated: !!user,
//     logout: () => {
//       sessionStorage.removeItem("user");
//       sessionStorage.removeItem("token");
//       setUser(null);
//     }
//   };
// }