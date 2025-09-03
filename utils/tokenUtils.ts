// // utils/tokenUtils.ts
// export function extractTokens(responseData: any): {
//   accessToken: string;
//   refreshToken: string;
//   user: any;
// } {
//   // Handle different response formats
//   const accessToken = responseData.accessToken || responseData.token;
//   const refreshToken = responseData.refreshToken;
  
//   if (!accessToken) {
//     throw new Error("Access token missing in response");
//   }

//   return {
//     accessToken,
//     refreshToken,
//     user: responseData.user || responseData // Some responses put user data at root
//   };
// }



// const result = await response.json();
// const { accessToken, refreshToken, user } = extractTokens(result);

// localStorage.setItem("accessToken", accessToken);
// localStorage.setItem("refreshToken", refreshToken);
// localStorage.setItem("user", JSON.stringify(user));