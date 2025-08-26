"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampaignBudget from "../CampaignBudget";
import Image from "next/image";
import Dollars from "../icons/Dollars";
import { Search, MapPin } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PaymentConfirmationModal from "./PaymentConfirmationModal";
import CampaignSummaryModal from "./CampaignSummaryModal";
import PaymentSuccessModal from "./PaymentSuccessModal";

type TargetingFormInputs = {
  ageRange: string;
  gender: string;
  location: string;
  language: string;
};

type CampaignFormData = {
  adName: string;
  campaignType: string;
  adGoal: string;
  adDescription: string;
  startDate: string;
  endDate: string;
  perViewAmount?: string;
  maxBudget?: string;
  perInfluencerAmount?: string; 
  influencerCount?: string;
  amountToSpend?: string; 
  viewGoal: string;
};

function TargetAudience() {
  const router = useRouter();
   const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState<CampaignFormData | null>(null);
   const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TargetingFormInputs>({
    mode: "onChange",
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem('campaignFormData');
    if (storedData) {
      setCampaignData(JSON.parse(storedData));
    } else {
      toast.error('No campaign data found. Please start over.');
      router.push('/campaign/setup');
    }
  }, [router]);


  const calculateAdDuration = () => {
    if (!campaignData?.startDate || !campaignData?.endDate) return "N/A";
    
    const start = new Date(campaignData.startDate);
    const end = new Date(campaignData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const calculateTotalAmount = () => {
    if (!campaignData) return 0;
    
    let amount = 0;
    if (campaignData.campaignType === "ppv") {
      amount = campaignData.maxBudget ? parseFloat(campaignData.maxBudget) : 0;
    } else if (campaignData.campaignType === "ppi") {
      amount = campaignData.perInfluencerAmount && campaignData.influencerCount 
        ? parseFloat(campaignData.perInfluencerAmount) * parseInt(campaignData.influencerCount)
        : 0;
    }
    
    return amount;
  };


    const onSubmit: SubmitHandler<TargetingFormInputs> = async (targetingData) => {
    if (!campaignData) {
      toast.error('Campaign data not found');
      return;
    }

    const amount = calculateTotalAmount();
    setCalculatedAmount(amount);
    
    setShowSummaryModal(true);
  };

  const handlePay = () => {
    setShowSummaryModal(false);
    setShowPaymentConfirmModal(true);
  };

  const handleConfirmPayment = async () => {
    setShowPaymentConfirmModal(false);
    setLoading(true);
    const loadingToast = toast.loading('Processing payment and creating campaign...');

    try {
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user") || "null");

      if (!user || !token) {
        throw new Error("Please log in first - no session found");
      }


      let amountToSpend = 0;
      let budget = 0;
      
      if (campaignData!.campaignType === "ppv") {
        amountToSpend = campaignData!.maxBudget ? parseFloat(campaignData!.maxBudget) : 0;
        budget = amountToSpend;
      } else if (campaignData!.campaignType === "ppi") {
        amountToSpend = campaignData!.perInfluencerAmount && campaignData!.influencerCount 
          ? parseFloat(campaignData!.perInfluencerAmount) * parseInt(campaignData!.influencerCount)
          : 0;
        budget = amountToSpend;
      }

      if (amountToSpend <= 0) {
        throw new Error("Amount to spend must be greater than 0");
      }

      const campaignPayload = {
        title: campaignData!.adName,
        campaignType: campaignData!.campaignType,
        adGoal: campaignData!.adGoal,
        caption: campaignData!.adDescription,
        mediaUrl: "https://res.cloudinary.com/dv5v8l2lr/image/upload/v1738850383/samples/gg9yr8wgycomejpapsqv.png",
        budget: budget,
        startDate: new Date(campaignData!.startDate).toISOString(), 
        endDate: new Date(campaignData!.endDate).toISOString(),
        status: "active", 
        advertiserId: user.advertiserId,
        perViewAmount: campaignData!.perViewAmount ? parseFloat(campaignData!.perViewAmount) : undefined,
        perInfluencerAmount: campaignData!.perInfluencerAmount ? parseFloat(campaignData!.perInfluencerAmount) : undefined,
        influencerCount: campaignData!.influencerCount ? parseInt(campaignData!.influencerCount) : undefined,
        amountToSpend: amountToSpend,
        viewGoal: parseInt(campaignData!.viewGoal) || 1000,
        targetingRules: {
          ageRange: targetingData.ageRange,
          location: targetingData.location,
          preferredGender: targetingData.gender,
          language: targetingData.language
        }
      };

      const createCampaignRes = await fetch("/api/campaign-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          campaignData: campaignPayload,
          userData: user,
        }),
      });

      if (!createCampaignRes.ok) {
        const errorData = await createCampaignRes.json();
        throw new Error(errorData.message || `HTTP error! status: ${createCampaignRes.status}`);
      }

      const createCampaignResult = await createCampaignRes.json();
      
      toast.dismiss(loadingToast);
      setShowSuccessModal(true);

    } catch (error) {
      console.error("Error:", error);
      toast.dismiss(loadingToast);
      
      if (error instanceof Error) {
        if (error.message.includes("token") || error.message.includes("401")) {
          toast.error('Session expired. Please log in again.');
          sessionStorage.clear();
          setTimeout(() => router.push("/login"), 2000);
        } else {
          toast.error(error.message || 'Failed to create campaign');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    sessionStorage.removeItem('campaignFormData');
    router.push('/dashboard');
  };

  if (!campaignData) {
    return <div>Loading...</div>;
  }

  const targetingData = watch();
  const adDuration = calculateAdDuration();
  const totalAmount = calculateTotalAmount();

  


  return (
    <main className="min-h-screen relative overflow-hidden">
      <header className="bg-primary p-3 flex items-center h-[116px]">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-white text-lg font-medium">Target Audience</h1>
      </header>

      <div className="p-4 max-w-[400px] mx-auto">
        <div className="px-4 py-4 relative overflow-hidden">
          <div className="bg-primary rounded-xl p-4 flex justify-between items-center relative h-[149px]">
            {/* Left Text Content */}
            <div className="flex flex-col justify-center h-full w-[317px]">
              <div className="flex items-center gap-2">
                <Dollars />
                <h2 className="text-sm font-bold text-white">
                  Ads on a budget
                </h2>
              </div>
              <p className="text-xs font-normal text-white py-2 w-[133px]">
                Stretch your brand reach, get noticed without overspending.
              </p>
            </div>

            {/* Image Positioned at the Bottom Right */}
            <div className="absolute bottom-0 right-4 w-[133px] h-[145px]">
              <Image
                src="/budget-man.png"
                alt="Ad Promo"
                width={133}
                height={145}
                className="object-contain"
              />
            </div>
          </div>

          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2">
              <p className="text-base font-medium">Demographics</p>
            </div>
            {/* Pricing Model */}
            <div className="space-y-4">
                 <div>
                <label className="block text-sm font-medium text-black py-1">
                  Age Range
                </label>
                <div className="relative">
                  <select
                    {...register("ageRange", { required: "Age range is required" })}
                    className="block w-full border border-gray-300 rounded-[0.5rem] p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500"
                  >
                    <option value="">Select age range</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55+">55+</option>
                  </select>
                  <ChevronDown className="absolute top-4 right-3 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
                {errors.ageRange && (
                  <p className="text-red-500 text-sm mt-1">{errors.ageRange.message}</p>
                )}
                <small className="text-gray-400 text-[10px]">Choosing under-18 restricts targeting options in certain locations and age group.</small>
              </div>

              <div>
                <label className="block text-sm font-medium text-black py-1">
                  Gender
                </label>
                <div className="relative">
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className="block w-full border border-gray-300 rounded-[0.5rem] p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="all">All</option>
                  </select>
                  <ChevronDown className="absolute top-4 right-3 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>

            <div>
                <label className="block text-sm font-medium text-black py-1">
                  Locations
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-4 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    {...register("location", { required: "Location is required" })}
                    placeholder="Search locations"
                    className="block w-full border border-gray-300 rounded-[0.5rem] p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500"
                  />
                  <MapPin className="absolute right-3 top-4 w-4 h-4 text-gray-500" />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                )}
                <small className="text-gray-400 text-[10px]">Reach people who live in, or are currently located within the area you&apos;ve selected.</small>
              </div>

              <div>
                <label className="block text-sm font-medium text-black py-1">
                  Language
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-4 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    {...register("language", { required: "Language is required" })}
                    placeholder="Search languages"
                    className="block w-full border border-gray-300 rounded-[0.5rem] p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500"
                  />
                </div>
                {errors.language && (
                  <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>
                )}
              </div>
            </div>

            {/* Continue Button */}
              <div className="py-5">
              <Button
                type="submit"
                disabled={!isValid || loading}
                className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-transform duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      
      {/* Campaign Summary Modal */}
      <CampaignSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        onPay={handlePay}
        campaignData={{
          name: campaignData.adName,
          pricingModel: campaignData.campaignType.toUpperCase(),
          ageRange: targetingData.ageRange || "Not selected",
          gender: targetingData.gender || "Not selected",
          location: targetingData.location || "Not selected",
          language: targetingData.language || "Not selected",
          adDuration: adDuration,
          totalAmount: totalAmount
        }}
      />

      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal
        isOpen={showPaymentConfirmModal}
        onClose={() => setShowPaymentConfirmModal(false)}
        onConfirm={handleConfirmPayment}
        amount={calculatedAmount}
      />

      {/* Payment Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
      />

      <div className="absolute bottom-0 left-0 opacity-1 ">
        <Image
          src="/ellipse.png"
          alt="Background Design"
          objectFit="contain"
          width={200}
          height={220}
        />
      </div>
    </main>
  );
}

export default TargetAudience;
