"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function ChooseRoleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (selectedRole: string) => {
    const redirect = searchParams.get("redirect") || "/create-account";
    router.push(`${redirect}?role=${selectedRole.toLowerCase()}`);
  };

   const handleProceed = () => {
    if (selectedRole) {
      handleRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary p-4 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-white text-lg font-bold">Sign Up</h1>
      </header>
      <div className="p-4 max-w-md mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-center mb-6">
            <Image
              src="/agentoradvertiser.png"
              alt="Choose role illustration"
              width={200}
              height={200}
              className="w-60 h-60"
            />
          </div>
          <h2 className="font-medium text-lg  mb-2">Choose Your Role</h2>
          <p className="text-[#00000080] text-xs mb-6">
            Sign up for the role that fits you
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedRole === "Advertiser"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedRole("Advertiser")}
            >
              <span className="font-medium">Advertiser</span>
            </button>
            <button
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedRole === "Agent"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedRole("Agent")}
            >
              <span className="font-medium">Agent</span>
            </button>
          </div>

          <Button
            className="w-full rounded-xl"
            size="lg"
            disabled={!selectedRole}
            onClick={handleProceed}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
  
}


export default function ChooseRole() {
 return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChooseRoleContent />
    </Suspense>
  );

  
}
