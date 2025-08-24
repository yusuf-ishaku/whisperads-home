"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampaignBudget from "../CampaignBudget";
import Image from "next/image";
import Dollars from "../icons/Dollars";
import { useForm, SubmitHandler } from "react-hook-form";
import { clsx } from "clsx";
import { useState } from "react";
import CreateCampaignSuccessModal from "../CreateCampaignSuccessModal";
import { useAuth } from "@/context/auth-context";
import { PricingModelSelect } from "../PricingModelSelect";
import AdGoalSelect from "../AdGoalSelect";
import AdCarousel from "../AdCarousel";
import { toast } from "sonner";

type CampaignFormInputs = {
  adName: string;
  campaignType: string;
  adGoal: string;
  adDescription: string;
  budget: string;
  startDate: string;
  endDate: string;
  // adFile: FileList;
  perViewAmount?: string;
  maxBudget?: string;
  perInfluencerAmount?: string; 
  influencerCount?: string;
  amountToSpend?: string; 
  viewGoal: string; 
};

const cn = clsx;

export const config = {
  api: {
    bodyParser: false,
  },
};

function SetUpCampaign() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<CampaignFormInputs>({
    mode: "onChange",
    defaultValues: {
    viewGoal: "1000"
  }
  });
  const router = useRouter();
  // const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDateRange, setShowDateRange] = useState(false);


  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setSelectedFileName(file.name);
  //   } else {
  //     setSelectedFileName(null);
  //   }
  // };

  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const onSubmit: SubmitHandler<CampaignFormInputs> = async (data) => {
    setLoading(true);
        const loadingToast = toast.loading('Creating campaign...');


    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "null");
      const token = sessionStorage.getItem("token");

      if (!user || !token) {
        throw new Error("Please log in first - no session found");
      }

      // const fileFormData = new FormData();
      // fileFormData.append("file", data.adFile[0]);

      // const fileUploadRes = await fetch("/api/upload/file", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: fileFormData,
      // });

      const uploadedFileUrl =
        "https://res.cloudinary.com/dv5v8l2lr/image/upload/v1738850383/samples/gg9yr8wgycomejpapsqv.png";

      // const fileUploadResult = await fileUploadRes.json();
      // if (!fileUploadRes.ok) {
      //   throw new Error(fileUploadResult.message || "Failed to upload file");
      // }

      // const uploadedFileUrl = fileUploadResult?.data;
      // if (!uploadedFileUrl) {
      //   throw new Error("File upload failed: No URL returned");
      // }

      const campaignPayload = {
        title: data.adName,
        campaignType: data.campaignType,
        adGoal: data.adGoal,
        caption: data.adDescription,
        mediaUrl: uploadedFileUrl,
        budget: data.budget || 1000,
        startDate: new Date(data.startDate).toISOString(), 
      endDate: new Date(data.endDate).toISOString(),
        status: "draft",
        advertiserId: user.advertiserId,
        perViewAmount: data.perViewAmount ? parseFloat(data.perViewAmount) : undefined,
      perInfluencerAmount: data.perInfluencerAmount ? parseFloat(data.perInfluencerAmount) : undefined,
      influencerCount: data.influencerCount ? parseInt(data.influencerCount) : undefined,
      
      amountToSpend: data.campaignType === "ppv" 
        ? (data.maxBudget ? parseFloat(data.maxBudget) : 0)
        : (data.perInfluencerAmount && data.influencerCount 
            ? parseFloat(data.perInfluencerAmount) * parseInt(data.influencerCount)
            : 0),
                  viewGoal: parseInt(data.viewGoal) || 1000
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

      const createCampaignResult = await createCampaignRes.json();
      if (!createCampaignRes.ok) {
        throw new Error(
          createCampaignResult.message || "Failed to create campaign"
        );
      }

       toast.dismiss(loadingToast);
      toast.success('Campaign created successfully!');
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
       toast.dismiss(loadingToast);
       
      if (error instanceof Error) {
        if (error.message.includes("token")) {
          toast.error('Session expired. Please log in again.');
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("token");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
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

  React.useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      if (firstError?.message) {
        toast.error(firstError.message);
      }
    }
  }, [errors]);


  return (
    <>
      {showSuccessModal && <CreateCampaignSuccessModal />}

      <main className="min-h-screen relative overflow-hidden ">
        <header className="bg-primary p-3 flex items-center h-[116px]">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-white text-lg font-medium">
            Set Up Your Campaign
          </h1>
        </header>

        <div className="p-4 mx-auto max-w-[400px] mt-5">
          <div className="px-4 py-4 relative overflow-hidden">
            <AdCarousel />

            <form
              className="mt-5 relative z-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="py-2">
                <p className="text-base font-medium">Campaign Details</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black py-1">
                    Ad Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("adName", {
                        required: "Ad Name is required",
                      })}
                      placeholder="Give your ad a name"
                      className="block w-full border border-gray-300 rounded-[0.5rem] p-3 marker:appearance-none  focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-400"
                    ></input>
                    {errors.adName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.adName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pricing Model */}

                <div>
                  <PricingModelSelect
                    register={register}
                    setValue={setValue}
                    error={errors.campaignType}
                  />
                </div>

                <AdGoalSelect
                  register={register}
                  setValue={setValue}
                  error={errors.adGoal}
                />

                {/* Campaign Message */}
                <div>
                  <label className="block text-sm font-medium text-black py-1">
                    Ad description
                  </label>
                  <textarea
                    {...register("adDescription", {
                      required: "Ad description is required",
                    })}
                    className="w-full border border-gray-300 bg-transparent  px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-400 rounded-[0.5rem] text-sm"
                    placeholder="Craft your ad message"
                  ></textarea>
                  {errors.adDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.adDescription.message}
                    </p>
                  )}
                </div>

                <div>
  <label className="block text-sm font-medium text-black py-1">
    View Goal
  </label>
  <div className="relative">
    <input
      type="number"
      {...register("viewGoal", {
        required: "View Goal is required",
        valueAsNumber: true,
        validate: value => Number(value) > 0 || "View Goal must be greater than 0"
      })}
      placeholder="Enter your view goal"
      className="block w-full border border-gray-300 rounded-[0.5rem] p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-400"
    />
    {errors.viewGoal && (
      <p className="text-red-500 text-sm mt-1">
        {errors.viewGoal.message}
      </p>
    )}
  </div>
</div>

                {/* <div>
  <label className="block text-sm font-medium text-black py-1">
    Schedule
  </label>

  {!showDateRange ? (
    // INITIAL collapsed input
    <input
      type="text"
      readOnly
      placeholder="When would you like your ad to start?"
      onClick={() => setShowDateRange(true)}
      className="block w-full border border-gray-300 rounded-[0.5rem] p-3 
                 focus:outline-none focus:ring-2 focus:ring-green-500 
                 text-sm text-gray-400 cursor-pointer"
    />
  ) : (
    // EXPANDED date range
    <div className="flex gap-2">
      <div className="relative flex-1">
        <input
          type="date"
          {...register("startDate", {
            required: "Start Date is required",
          })}
          className="block w-full border border-gray-300 rounded-[0.5rem] p-3 
                     focus:outline-none focus:ring-2 focus:ring-green-500 
                     text-sm text-gray-600"
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.startDate.message}
          </p>
        )}
      </div>

      <div className="relative flex-1">
        <input
          type="date"
          {...register("endDate", {
            required: "End Date is required",
          })}
          className="block w-full border border-gray-300 rounded-[0.5rem] p-3 
                     focus:outline-none focus:ring-2 focus:ring-green-500 
                     text-sm text-gray-600"
        />
        {errors.endDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.endDate.message}
          </p>
        )}
      </div>
    </div>
  )}
</div> */}

<div>
  <label className="block text-sm font-medium text-black py-1">
    Schedule
  </label>

  {!showDateRange ? (
    <input
      type="text"
      readOnly
      placeholder="When would you like your ad to start?"
      onClick={() => setShowDateRange(true)}
      className="block w-full border border-gray-300 rounded-[0.5rem] p-3 
                 focus:outline-none focus:ring-2 focus:ring-green-500 
                 text-sm text-gray-400 cursor-pointer"
    />
  ) : (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
        <input
          type="date"
          {...register("startDate", {
            required: "Start Date is required",
            validate: {
              notPast: value => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today || "Start date cannot be in the past";
              }
            }
          })}
          min={today}
          className="block w-full border border-gray-300 rounded-[0.5rem] p-3 
                     focus:outline-none focus:ring-2 focus:ring-green-500 
                     text-sm text-gray-600"
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.startDate.message}
          </p>
        )}
      </div>

      <div className="relative flex-1">
        <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
        <input
          type="date"
          {...register("endDate", {
            required: "End Date is required",
            validate: {
              notPast: value => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today || "End date cannot be in the past";
              },
              afterStart: (value, { startDate }) => {
                if (!startDate) return true;
                return new Date(value) > new Date(startDate) || "End date must be after start date";
              }
            }
          })}
          min={tomorrow}
          className="block w-full border border-gray-300 rounded-[0.5rem] p-3 
                     focus:outline-none focus:ring-2 focus:ring-green-500 
                     text-sm text-gray-600"
        />
        {errors.endDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.endDate.message}
          </p>
        )}
      </div>
    </div>
  )}
</div>
              

                <div>
                  <label className="block text-sm font-normal mb-1">
                    Ad Preview
                  </label>
                  <div className="flex flex-col border border-gray-300 p-3 rounded-[0.5rem]">
                    <div className="flex items-center justify-center bg-gray-100 rounded p-2">
                      <Image
                        src="https://res.cloudinary.com/dv5v8l2lr/image/upload/v1738850383/samples/gg9yr8wgycomejpapsqv.png"
                        alt="Ad preview"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-gray-500 text-xs mt-2 text-center">
                      Using sample ad image until uploads are fixed
                    </p>
                  </div>
                </div>

                {/* COMMENTED TILL FILE UPLOADS ARE FIXED */}

                {/* <div>
                  <label className="block text-sm font-normal mb-1">
                    Upload Ad file
                  </label>
                  <div className="flex flex-col border  border-gray-300 p-3 rounded-[0.5rem] hover:border-gray-400">
                    <label
                      htmlFor="file-input"
                      className="flex flex-row gap-3 items-center cursor-pointer"
                    >
                      <p className="font-medium text-sm bg-primary text-white px-4 py-1.5 rounded cursor-pointer">
                        Choose File
                      </p>
                      <p className="text-sm font-normal text-gray-500">
                        {selectedFileName || "No file chosen"}
                      </p>
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      {...register("adFile", {
                        required: "Please upload a file",
                        onChange: (e) => handleFileChange(e),
                      })}
                      className="hidden"
                    />
                  </div>

                  {errors.adFile && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.adFile.message}
                    </p>
                  )}

                  <p className="text-gray-500 text-xs">
                    Max. file video duration: 1 min. Supported formats: JPEG,
                    PNG, MP4.
                  </p>
                </div> */}
              </div>

              {/* Continue Button */}
              <div className="py-5">
                <Button
                  type="submit"
                  disabled={!isValid || loading}
                  className={cn(
                    "w-full transition-transform duration-150 active:scale-[0.98]",
                    isValid && !loading
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-[#009444] opacity-50 cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <div className="flex justify-center items-center space-x-2">
                      <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 opacity-1 z-0 ">
          <Image
            src="/ellipse.png"
            alt="Background Design"
            objectFit="contain"
            width={200}
            height={220}
          />
        </div>
      </main>
    </>
  );
}

export default SetUpCampaign;
