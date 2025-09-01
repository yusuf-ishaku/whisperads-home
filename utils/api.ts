// utils/api.ts
import { refreshAuthToken } from "./client-auth";

export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  let accessToken = localStorage.getItem("accessToken");
  
  // Make the initial request
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If token expired, refresh and retry
  if (response.status === 401) {
    console.log("Token expired, attempting refresh...");
    const newToken = await refreshAuthToken();
    
    if (newToken) {
      // Retry the request with new token
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    }
  }

  return response;
}