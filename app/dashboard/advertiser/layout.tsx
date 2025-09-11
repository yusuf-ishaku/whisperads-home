"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdvertiserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authStatus, setAuthStatus] = useState<"loading" | "authorized" | "unauthorized">("loading");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAuth = () => {
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      if (pathname?.includes("/create-profile")) {
        setAuthStatus("authorized");
        return;
      }

      if (!token || !userString) {
        router.push("/login?redirect=" + pathname);
        return;
      }

      try {
        const user = JSON.parse(userString);
        const userRole = (user?.role || '').toString().toLowerCase();

        // Validate role
        if (userRole !== "advertiser") { // or "agent" for agent layout
          setAuthStatus("unauthorized");
          return;
        }

        setAuthStatus("authorized");
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/login?redirect=" + pathname);
      }
    };

    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router, pathname]);

  useEffect(() => {
    if (authStatus === "unauthorized") {
      router.push("/unauthorized");
    }
  }, [authStatus, router]);

  if (authStatus === "loading" || authStatus === "unauthorized") {
    return <LoadingSpinner />;
  }

  return <div className="advertiser-dashboard">{children}</div>;
}