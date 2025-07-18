import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Success from "./icons/Success";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  role: string;
  onClose: () => void;
}

export default function LoginSuccessModal({ role, onClose }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (!user.profileComplete) {
      router.push(`/dashboard/${role}`);
    }
  }, [role, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-center shadow-md rounded-xl space-y-3 w-[375px] h-[311px] p-6 ">
        <div className="flex justify-center">
          <Success />
        </div>
        <p className="font-medium text-lg">Successful</p>
        <p className="font-normal text-[#989898] text-sm w-[233px] mx-auto">
          Welcome Back! <br /> Click the button below to get to your dashboard
        </p>
        <div className="py-3">
          <Link href={`/dashboard/${role}`}>
            <Button
              className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-transform duration-150"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Continue to Dashboard"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}