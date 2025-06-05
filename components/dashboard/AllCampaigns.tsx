"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CampaignData {
  id: string;
  title: string;
  mediaUrl: string;
  caption: string;
  callToActionUrl: string | null;
  budget: string;
  status: string;
  adGoal: string;
  advertiserId: string;
  startDate: string;
  endDate: string;
}

export default function AllCampaigns() {
  const [campaignData, setCampaignData] = useState<CampaignData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const dummyData: CampaignData[] = [
          {
            id: "1",
            title: "Summer Beach Collection",
            mediaUrl: "/campaign-image-one.png",
            caption: "New summer collection with 30% discount on all items",
            callToActionUrl: "https://example.com/shop",
            budget: "₦150,000",
            status: "Active",
            adGoal: "Brand Awareness",
            advertiserId: "adv-001",
            startDate: "2023-05-01",
            endDate: "2023-06-30",
          },
          {
            id: "2",
            title: "Tech Gadgets Sale",
            mediaUrl: "/campaign-image-two.png",
            caption: "Latest tech gadgets with free shipping nationwide",
            callToActionUrl: "https://example.com/tech",
            budget: "₦250,000",
            status: "Active",
            adGoal: "Sales Conversion",
            advertiserId: "adv-002",
            startDate: "2023-06-15",
            endDate: "2023-07-15",
          },
          {
            id: "3",
            title: "Real Estate Investment",
            mediaUrl: "/real-estate-img.png",
            caption: "Premium properties with flexible payment plans",
            callToActionUrl: "https://example.com/properties",
            budget: "₦500,000",
            status: "Pending",
            adGoal: "Lead Generation",
            advertiserId: "adv-003",
            startDate: "2023-07-01",
            endDate: "2023-09-30",
          },
          {
            id: "4",
            title: "Summer Beach Collection",
            mediaUrl: "/campaign-image-one.png",
            caption: "New summer collection with 30% discount on all items",
            callToActionUrl: "https://example.com/shop",
            budget: "₦150,000",
            status: "Active",
            adGoal: "Brand Awareness",
            advertiserId: "adv-001",
            startDate: "2023-05-01",
            endDate: "2023-06-30",
          },
          {
            id: "5",
            title: "Tech Gadgets Sale",
            mediaUrl: "/campaign-image-two.png",
            caption: "Latest tech gadgets with free shipping nationwide",
            callToActionUrl: "https://example.com/tech",
            budget: "₦250,000",
            status: "Active",
            adGoal: "Sales Conversion",
            advertiserId: "adv-002",
            startDate: "2023-06-15",
            endDate: "2023-07-15",
          },
          {
            id: "6",
            title: "Real Estate Investment",
            mediaUrl: "/real-estate-img.png",
            caption: "Premium properties with flexible payment plans",
            callToActionUrl: "https://example.com/properties",
            budget: "₦500,000",
            status: "Pending",
            adGoal: "Lead Generation",
            advertiserId: "adv-003",
            startDate: "2023-07-01",
            endDate: "2023-09-30",
          },
        ];
        
        setCampaignData(dummyData);
        setLoading(false);
      } catch (error) {
        setError("Failed to load dummy data");
        setLoading(false);
      }
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100">
      <div className="bg-primary text-white px-4 py-1 flex justify-between items-center text-xs"></div>
      <div className="bg-primary text-white px-4 py-3 flex items-center">
        <Link href={"/dashboard/agent"}>
          <ChevronLeft size={24} />
        </Link>
        <span className="ml-2 font-medium text-lg">All Campaigns</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500">Loading campaigns...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100">
      <div className="bg-primary text-white px-4 py-1 flex justify-between items-center text-xs"></div>
      <div className="bg-primary text-white px-4 py-3 flex items-center">
        <Link href={"/dashboard/advertiser/wallet"}>
          <ChevronLeft size={24} />
        </Link>
        <span className="ml-2 font-medium text-lg">All Campaigns</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100">
      {/* Status Bar */}
      <div className="bg-primary text-white px-4 py-1 flex justify-between items-center text-xs"></div>

      {/* Header */}
      <div className="bg-primary text-white px-4 py-3 flex items-center">
        <Link href={"/dashboard/advertiser/wallet"}>
          <ChevronLeft size={24} />
        </Link>
        <span className="ml-2 font-medium text-lg">All Campaigns</span>
      </div>

      {/* Campaign List */}
      <div className="flex-1 overflow-auto">
        {campaignData.length > 0 ? (
          campaignData.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/dashboard/campaigns/${campaign.id}`}
              className="block border-b border-gray-200 px-7 py-5 h-28 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex">
                {/* Icon */}
                <div className="mr-3 mt-1">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 text-primary">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 16V12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8H12.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">
                      {campaign.title}
                    </h3>
                    <span className="font-medium text-gray-900">
                      {campaign.budget}
                    </span>
                  </div>

                  <div className="flex justify-between items-start mt-1">
                    <div className="text-xs text-gray-500">
                      {calculateDaysRemaining(campaign.endDate)} days remaining
                    </div>
                    <span className={`text-xs ${
                      campaign.status === "Active" 
                        ? "text-green-600" 
                        : "text-yellow-600"
                    }`}>
                      {campaign.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 mt-1 pr-4 line-clamp-2">
                    {campaign.caption}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-gray-500">No campaigns available</div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to calculate days remaining
function calculateDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const today = new Date();
  const timeDiff = end.getTime() - today.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
}