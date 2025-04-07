import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Success from "./icons/Success";

function SetPasswordSuccessModal() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-center shadow-md rounded-xl space-y-3 w-[375px] h-[311px] p-6 ">
        <div className="flex justify-center">
        <Success />
        </div>
        <p className="font-medium text-lg">Successful</p>
        <p className="font-normal text-[#989898] text-sm w-[233px]  mx-auto">
        Password Updated! Click the button below to log in with your new password.
        </p>
        <div className="py-3">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SetPasswordSuccessModal;
