"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (!user?.role || user.role.toLowerCase() !== "agent") {
      router.replace("/unauthorized");
    }
  }, []);

  return <div className="agent-dashboard">{children}</div>;
}
