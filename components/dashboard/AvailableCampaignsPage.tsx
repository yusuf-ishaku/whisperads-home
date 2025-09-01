"use client";

import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface Campaign {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  logo: string;
  budget: string;
  status: string;
  startDate: string;
  endDate: string;
  benefits?: string[];
  offer?: string;
  gender?: string;
  views?: number;
  clicks?: number;
}

export default function AvailableCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Not authenticated");
        }

        const response = await fetch("/api/campaigns", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch campaigns");
        }

        const data = await response.json();
        
        // Transform API data to match our component's expected format
        const transformedCampaigns = data.map((item: any) => ({
          id: item.campaign.id,
          title: item.campaign.title,
          company: "Advertiser Company", // You might want to fetch this from another endpoint
          description: item.campaign.caption,
          image: item.campaign.mediaUrl || "/default-campaign-image.png",
          logo: "/default-company-logo.png",
          budget: item.campaign.budget,
          status: item.campaign.status.toLowerCase() === "active" ? "Active" : "Inactive",
          startDate: item.campaign.startDate,
          endDate: item.campaign.endDate,
          benefits: ["Benefit 1", "Benefit 2"], // Add actual benefits if available
          offer: "Special offer", // Add actual offer if available
          gender: item.campaign.targetingRules?.genders?.join(", ") || "All genders",
          views: Math.floor(Math.random() * 10000), // Replace with actual views if available
          clicks: Math.floor(Math.random() * 1000) // Replace with actual clicks if available
        }));

        setCampaigns(transformedCampaigns);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  
  const handleCardClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsSheetOpen(true);
  };

  if (loading) return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500">Loading campaigns...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-white">
      <Header />
      
        {/* Campaign List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign}
              onClick={() => handleCardClick(campaign)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-gray-500">No campaigns available</div>
          </div>
        )}
      </div>


            {/* Campaign Details Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          {selectedCampaign && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left">{selectedCampaign.title}</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Company Info */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src={selectedCampaign.logo}
                      alt={`${selectedCampaign.company} logo`}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{selectedCampaign.company}</p>
                    <p className="text-sm text-gray-500">{selectedCampaign.budget}</p>
                  </div>
                </div>

                {/* Campaign Image */}
                <div className="relative h-56 rounded-lg overflow-hidden">
                  <Image
                    src={selectedCampaign.image}
                    alt={selectedCampaign.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-gray-700">{selectedCampaign.description}</p>
                </div>

                {/* Benefits */}
                {selectedCampaign.benefits && (
                  <div>
                    <h3 className="font-medium mb-2">Benefits</h3>
                    <ul className="space-y-2">
                      {selectedCampaign.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Views</p>
                    <p className="font-medium">{selectedCampaign.views?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Clicks</p>
                    <p className="font-medium">{selectedCampaign.clicks?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Status</p>
                    <p className={`font-medium ${
                      selectedCampaign.status === "Active" 
                        ? "text-green-600" 
                        : "text-yellow-600"
                    }`}>
                      {selectedCampaign.status}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-500 text-sm">Days Remaining</p>
                    <p className="font-medium">
                      {calculateDaysRemaining(selectedCampaign.endDate)}
                    </p>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Start Date</p>
                    <p>{new Date(selectedCampaign.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">End Date</p>
                    <p>{new Date(selectedCampaign.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Special Offer */}
                {selectedCampaign.offer && (
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-primary font-medium">{selectedCampaign.offer}</p>
                  </div>
                )}

                {/* Action Button */}
                <button className="w-full bg-primary text-white py-3 rounded-lg font-medium">
                 Participate
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>


    </div>
  );
}

function Header() {
  return (
   <>
      {/* Status Bar */}
      <div className="bg-primary text-white px-4 py-1"></div>
      
      {/* Page Header */}
      <div className="bg-primary text-white px-4 py-3 flex items-center sticky top-0 z-10">
        <Link href="/dashboard/agent">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="ml-2 font-medium text-lg">Available Campaigns</h1>
      </div>
    </>
  );
}

interface CampaignCardProps {
  campaign: Campaign;
  onClick: () => void;
}

function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  return (
     <div 
      onClick={onClick}
      className="block bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src={campaign.logo}
              alt={`${campaign.company} logo`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{campaign.company}</p>
            <p className="text-sm text-gray-500">{campaign.title}</p>
          </div>
        </div>
        <span className="font-medium text-primary">{campaign.budget}</span>
      </div>

      <div className="relative h-40 rounded-md overflow-hidden mb-3">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover"
        />
      </div>

      <p className="text-gray-700 mb-3">{campaign.description}</p>

      <div className="flex justify-between items-center text-sm">
        <div className="text-gray-500">
          {calculateDaysRemaining(campaign.endDate)} days remaining
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          campaign.status === "Active" 
            ? "bg-green-100 text-green-800" 
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {campaign.status}
        </span>
      </div>
    </div>
  );
}

function calculateDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const today = new Date();
  const timeDiff = end.getTime() - today.getTime();
  return Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));
}