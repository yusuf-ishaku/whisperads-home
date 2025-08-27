"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link"

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your campaign has been created successfully and payment has been processed.
        </p>

        <Link
          href="/dashboard/advertiser"
          className="bg-primary hover:bg-primary/90 text-white p-2 text-sm rounded"
        >
          Continue to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;