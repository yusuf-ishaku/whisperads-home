"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function ChooseRoleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isExistingUser, setIsExistingUser] = useState(false);

  const handleProceed = () => {
    if (!selectedRole) return;
    
    const path = isExistingUser ? "/login" : "/create-account";
    const role = selectedRole.toLowerCase();
    
    router.push(`${path}?role=${role}`);
    
    sessionStorage.setItem('tempRole', role);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
 <h1 className="text-white text-lg font-bold">
          Choose Role
        </h1>      </header>
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
            {isExistingUser ? "Login with your role" : "Sign up for your role"}
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

           <div className="flex items-center justify-center mb-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-500">
              {isExistingUser ? "New user?" : "Existing user?"}
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <Button
            variant="outline"
            className="w-full mb-4"
            onClick={() => setIsExistingUser(!isExistingUser)}
          >
            {isExistingUser ? "Create New Account" : "Login Instead"}
          </Button>

          <Button
            className="w-full rounded-xl"
            size="lg"
            disabled={!selectedRole}
            onClick={handleProceed}
          >
            {isExistingUser ? "Continue to Login" : "Proceed to Sign Up"}
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
