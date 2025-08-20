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

type CampaignFormInputs = {
  adName: string;
  pricingModel: string;
  adGoal: string;
  adDescription: string;
  budget: string;
  adFile: FileList;
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
  });
  const router = useRouter();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }
  };

  const { user } = useAuth();

  const onSubmit: SubmitHandler<CampaignFormInputs> = async (data) => {
    setLoading(true);

    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "null");
      const token = sessionStorage.getItem("token");

      if (!user || !token) {
        throw new Error("Please log in first - no session found");
      }

      const fileFormData = new FormData();
      fileFormData.append("file", data.adFile[0]);

      const fileUploadRes = await fetch("/api/upload/file", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fileFormData,
      });

      const fileUploadResult = await fileUploadRes.json();
      if (!fileUploadRes.ok) {
        throw new Error(fileUploadResult.message || "Failed to upload file");
      }

      const uploadedFileUrl = fileUploadResult?.data;
      if (!uploadedFileUrl) {
        throw new Error("File upload failed: No URL returned");
      }

     
      const campaignPayload = {
        title: data.adName,
        pricingModel: data.pricingModel,
        adGoal: data.adGoal,
        caption: data.adDescription,
        mediaUrl: uploadedFileUrl,
        budget: data.budget || 1000, 
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: "draft",
        advertiserId: user.advertiserId, 
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

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error && error.message.includes("token")) {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

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


            <AdCarousel/>

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
                    error={errors.pricingModel}
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
                </div>
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
