// hooks/useAuthCheck.ts
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useAuthCheck() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run auth check on public pages
    const isPublicPage = [
      '/choose-role',
      '/login', 
      '/create-account',
      '/forgot-password'
    ].some(path => pathname?.startsWith(path));

    if (!isPublicPage) return;

    const checkAuth = () => {
      // First check localStorage for quick client-side check
      const token = localStorage.getItem("accessToken");
      const userStr = localStorage.getItem("user");
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          const normalizedRole = user.role?.toLowerCase();
          
          if (normalizedRole && ['agent', 'advertiser'].includes(normalizedRole)) {
            if (user.profileComplete) {
              router.replace(`/dashboard/${normalizedRole}`);
            } else {
              router.replace(`/dashboard/${normalizedRole}/create-profile`);
            }
            return;
          }
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }

      // Fallback to server check
      fetch('/api/auth/check', {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          const user = data.user;
          const normalizedRole = user.role?.toLowerCase();
          
          if (normalizedRole && ['agent', 'advertiser'].includes(normalizedRole)) {
            if (user.profileComplete) {
              router.replace(`/dashboard/${normalizedRole}`);
            } else {
              router.replace(`/dashboard/${normalizedRole}/create-profile`);
            }
          }
        }
      })
      .catch(() => {
        // Clear any invalid data
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      });
    };

    checkAuth();
  }, [router, pathname]);
}