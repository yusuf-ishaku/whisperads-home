// components/CampaignSummaryModal.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CampaignSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
  campaignData: {
    name: string;
    pricingModel: string;
    ageRange: string;
    gender: string;
    location: string;
    language: string;
    adDuration: string;
    totalAmount: number;
    tags: string;
  };
}

const CampaignSummaryModal: React.FC<CampaignSummaryModalProps> = ({
  isOpen,
  onClose,
  onPay,
  campaignData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Campaign Summary</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{campaignData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Price Model:</span>
            <span className="font-medium">{campaignData.pricingModel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Age Range:</span>
            <span className="font-medium">{campaignData.ageRange}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Gender:</span>
            <span className="font-medium">{campaignData.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">{campaignData.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Language:</span>
            <span className="font-medium">{campaignData.language}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ad Duration:</span>
            <span className="font-medium">{campaignData.adDuration}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="text-gray-800 font-semibold">Total Amount:</span>
            <span className="text-primary font-bold">₦{campaignData.totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <Button
          onClick={onPay}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Pay
        </Button>
      </div>
    </div>
  );
};

export default CampaignSummaryModal;