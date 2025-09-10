import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
    <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
  </div>;
}