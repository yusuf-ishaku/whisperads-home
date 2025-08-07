import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Success from "./icons/Success";
import Link from "next/link";

function CreateCampaignSuccessModal() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-center shadow-md rounded-xl space-y-3 w-[375px] p-6 ">
        <div className="flex justify-center">
          <Success />
        </div>
        <p className="font-medium text-lg">Successful</p>
        <p className="font-normal text-[#989898] text-sm w-[233px]  mx-auto">
          Campaign Created!
        </p>
        <div className="py-3">
          <Link href={"/dashboard/advertiser/target-audience"}>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Continue"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateCampaignSuccessModal;
