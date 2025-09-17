"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { authFetch } from "@/utils/api";

interface Campaign {
  id: number;
  title: string;
  image: string;
  performance: number;
  views: number;
  clicks: number;
  caption: string;
  budget: string;
  status: string;
  adGoal: string;
  startDate: string;
  gender: string;
  endDate: string;
}

export default function ActiveCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.role) {
          setRole(user.role.toLowerCase());
        } else {
          console.error("No role found in user data");
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchActiveCampaigns = async () => {
      try {
        const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) throw new Error("Not authenticated");

        const response = await authFetch("https://whisperads-api-production.up.railway.app/campaigns/my-campaigns", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json", }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch active campaigns");
        }

        const data = await response.json();
         const activeCampaigns = data.filter((campaign: Campaign) => campaign.status === "active");
        setCampaigns(activeCampaigns);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCampaigns();
  }, []);

  const handleDetailsClick = (campaignId: number) => {
    if (!role) {
      console.error("Role not available");
      // You might want to handle this case differently - maybe redirect to role selection
      return;
    }
    router.push(`/dashboard/${role}/campaigns/${campaignId}`);
  };

  if (loading) {
    return (
      <div className="space-y-1">
        <h2 className="font-semibold text-base">Active Campaigns</h2>
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-500">Loading campaigns...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-1">
        <h2 className="font-semibold text-base">Active Campaigns</h2>
        <div className="flex flex-col items-center justify-center h-40 space-y-2">
          <div className="text-red-500">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="text-primary text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

    const activeCampaigns = campaigns.filter(campaign => campaign.status === "active");


  if (activeCampaigns.length === 0) {
    return (
      <div className="space-y-1">
        <h2 className="font-semibold text-base">Active Campaigns</h2>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-center space-y-1">
            <h3 className="font-medium text-lg">No active campaigns</h3>
            <p className="text-gray-500 text-sm">
              There are no active campaigns at the moment. Please check back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <h2 className="font-semibold text-base">Active Campaigns</h2>
      <div className="grid grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard 
            key={campaign.id} 
            campaign={campaign} 
            onDetailsClick={() => handleDetailsClick(campaign.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface CampaignCardProps {
  campaign: Campaign;
  onDetailsClick: () => void;
}

function CampaignCard({ campaign, onDetailsClick }: CampaignCardProps) {
  return (
    <div className="bg-white rounded-[0.5rem] overflow-hidden shadow-sm border border-[#00000080]">
      <div className="relative h-[126px] bg-primary">
        <div className="top-0 left-0 right-0 flex justify-between p-1">
          <div className="bg-primary text-white text-xs px-2 py-0.5 rounded-sm flex items-center">
            <span className="mr-1">Performance:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3"
                fill={i < campaign.performance ? "yellow" : "none"}
              />
            ))}
          </div>
        </div>
        <Image
          src={campaign.image || "/placeholder.svg"}
          alt={campaign.title}
          width={100}
          height={100}
          className="text-center flex items-center justify-center object-cover w-[100px] h-[100px] bottom-0 left-0 right-0 mx-auto absolute"
        />
      </div>
      <div className="p-2">
        <h3 className="font-medium text-sm">{campaign.title}</h3>
        <div className="flex gap-2 text-xs text-black my-1 font-semibold">
          <span>Views: {campaign.views}</span>
          <span>Clicks: {campaign.clicks}</span>
        </div>
        <div className="flex my-2 gap-1 mt-3">
          <button 
            onClick={onDetailsClick}
            className="text-xs bg-white p-1 text-center rounded mx-auto border-primary border text-primary w-full"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}