import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import Success from "../icons/Success";

function FundWalletSuccessModal() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-center shadow-md rounded-xl space-y-3 w-[375px] p-6 ">
        <div className="flex justify-center">
          <Success />
        </div>
        <p className="font-medium text-lg"> Your Wallet Has Been Funded</p>
        
      </div>
    </div>
  );
}

export default FundWalletSuccessModal;
