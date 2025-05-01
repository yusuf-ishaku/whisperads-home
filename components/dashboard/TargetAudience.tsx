"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampaignBudget from "../CampaignBudget";
import Image from "next/image";
import Dollars from "../icons/Dollars";
import { Search, MapPin } from "lucide-react";

function SetUpCampaign() {
  const router = useRouter();

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

      <div className="p-4">
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

          <form className="mt-5">
            <div className="py-2">
              <p className="text-base font-medium">Demographics</p>
            </div>
            {/* Pricing Model */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black py-1">
                  Age
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select age range"
                    className="block w-full border border-gray-300 rounded-[0.5rem] p-3 marker:appearance-none  focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500"
                  ></input>
                  <ChevronDown className="absolute top-4 right-3 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
                <small className="text-gray-400 text-[10px]">Choosing under-18 restricts targeting options in certain locations and age group.</small>
              </div>
              {/* Pricing Model */}
              <div>
                <label className="block text-sm font-medium text-black py-1">
                  Gender
                </label>
                <div className="relative">
                  <select className="block w-full border border-gray-300 rounded-[0.5rem] p-3 marker:appearance-none  focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500">
                    <option value="">Select your gender</option>
                  </select>
                  <ChevronDown className="absolute top-4 right-3 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black py-1">
                  Locations
                </label>
                <div className="relative">
                  {/* Search Icon on the Left */}
                  <Search className="absolute left-3 top-4 w-4 h-4 text-gray-500" />

                  <input
                    type="text"
                    placeholder="Search locations"
                    className="block w-full border border-gray-300 rounded-[0.5rem] p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500"
                  />

                  {/* Location Icon on the Right */}
                  <MapPin className="absolute right-3 top-4 w-4 h-4 text-gray-500" />
                </div>
                
                <small className="text-gray-400 text-[10px]">Reach people who live in, or are currently located within the area you&apos;ve selected.</small>
              </div>

              <div>
                <label className="block text-sm font-medium text-black py-1">
                  Language
                </label>
                <div className="relative">
                  {/* Search Icon on the Left */}
                  <Search className="absolute left-3 top-4 w-4 h-4 text-gray-500" />

                  <input
                    type="text"
                    placeholder="Search languages"
                    className="block w-full border border-gray-300 rounded-[0.5rem] p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="py-5">
              <Button
                className="w-full  bg-primary hover:bg-primary/90 active:scale-[0.98] transition-transform duration-150"
                type="submit"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>

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

export default SetUpCampaign;
