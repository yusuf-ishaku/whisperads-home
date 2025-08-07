import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check cookies via API route
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
              router.push(`/dashboard/${normalizedRole}`);
            } else {
              router.push(`/dashboard/${normalizedRole}/create-profile`);
            }
          }
        }
      })
      .catch(() => {
        // Clear any invalid data
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      });
    };

    checkAuth();
  }, [router]);
}