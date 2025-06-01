"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdvertiserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (!user?.role || user.role.toLowerCase() !== 'advertiser') {
      router.replace('/unauthorized');
    }
  }, []);

  return (
    <div className="advertiser-dashboard">
      {children}
    </div>
  );
}