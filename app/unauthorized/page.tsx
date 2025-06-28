"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-red-600">401 - Unauthorized</h1>
        <p className="text-lg text-muted-foreground">
          You don't have permission to access this page.
        </p>
        <div className="pt-4">
          <Button asChild>
            <Link href="/login">Return to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}