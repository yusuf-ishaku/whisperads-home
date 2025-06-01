"use client";

import { ChevronLeft, Wifi, Battery, Signal } from "lucide-react";
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


  // const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   const storedToken = sessionStorage.getItem("token");
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);
  useEffect(() => {
    const fetchCampaigns = async () => {

      try {
          const token = sessionStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem("user") || "null");

        if (!token || !user) {
          setError("Authentication required");
          return;
        }

        const res = await fetch(`/api/campaigns`, {
          headers: {
            Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",

          },
        });

       if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch campaigns");
        }

        const data = await res.json();
         setCampaignData(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
       setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

    if (loading) return <div>Loading campaigns...</div>;
  if (error) return <div>Error: {error}</div>;

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
        {campaignData.map((campaign) => (
          <Link
            key={campaign.id}
            href={`/dashboard/campaigns/${campaign.id}`}
            className="block border-b border-gray-200 px-7 py-5 h-28 bg-white"
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
                    {/* Ad Running • {campaign.days} days */}
                    Ad Running • 20 days
                  </div>
                  {campaign.status && (
                    <span className="text-xs text-green-600">Active</span>
                  )}
                  {campaign.startDate && (
                    <span className="text-xs text-gray-500">
                      {campaign.endDate}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-700 mt-1 pr-4">
                  {campaign.caption}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
