"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import More from "../icons/More";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface ApiCampaign {
  campaign: {
    id: string;
    title: string;
    mediaUrl: string;
    caption: string;
    budget: string;
    status: string;
    adGoal: string;
    targetingRules: {
      genders?: string[];
      ageRange?: string;
      locations?: string[];
    };
  };
  score: number;
}

interface Campaign {
  id: string;
  company: string;
  title: string;
  description: string;
  image: string;
  logo: string;
  category: "for-you" | "real-estate" | "ecommerce" | "games";
}

function AvailableCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const response = await fetch("/api/campaigns", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch campaigns");
        }

        const apiData: ApiCampaign[] = await response.json();
        
        const transformedCampaigns = apiData.map((item, index) => {
          const categories: ("for-you" | "real-estate" | "ecommerce" | "games")[] = [
            "for-you", "real-estate", "ecommerce", "games"
          ];
          const category = categories[index % categories.length];

          return {
            id: item.campaign.id,
            company: "Advertiser",
            title: item.campaign.title,
            description: item.campaign.caption,
            image: item.campaign.mediaUrl || "/default-campaign.png",
            logo: "/default-logo.png",
            category
          };
        });

        setCampaigns(transformedCampaigns);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-gray-500">Loading campaigns...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-40 space-y-2">
        <div className="text-red-500">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="text-primary text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state when no campaigns are available
  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
       
        <div className="text-center space-y-1">
          <h3 className="font-medium text-lg">No campaigns available</h3>
          <p className="text-gray-500 text-sm">
            There are no active campaigns at the moment. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-lg mt-3 font-semibold">Available Campaigns</h1>
      
      <Tabs defaultValue="for-you" className="w-full">
        <TabsList className="grid grid-cols-4 my-3">
          <TabsTrigger value="for-you" className="py-2 text-sm">
            For You
          </TabsTrigger>
          <TabsTrigger value="real-estate" className="py-2 text-sm">
            Real Estate
          </TabsTrigger>
          <TabsTrigger value="ecommerce" className="py-2 text-sm">
            E-commerce
          </TabsTrigger>
          <TabsTrigger value="games" className="py-2 text-sm">
            Games
          </TabsTrigger>
        </TabsList>

        {["for-you", "real-estate", "ecommerce", "games"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {filterCampaignsByCategory(campaigns, category).length > 0 ? (
              filterCampaignsByCategory(campaigns, category).map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-gray-500">No ads in this category</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

       <div className="flex justify-center items-center mt-3 mb-12">
          <Link href="/dashboard/agent/available-campaigns" className="bg-primary py-1 px-2  text-white text-xs rounded-[0.5rem]">
            see more ads
          </Link>
        </div>
    </div>
  );
}

// Helper function to filter campaigns by category
function filterCampaignsByCategory(campaigns: Campaign[], category: string) {
  return campaigns.filter((campaign) => campaign.category === category);
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={campaign.logo}
            width={40}
            height={40}
            alt={`${campaign.company} logo`}
            className="rounded-full"
          />
          <div className="space-y-1">
            <p className="font-medium">{campaign.company}</p>
            <small className="text-gray-400">{campaign.title}</small>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <More />
        </button>
      </div>

      <div className="py-3">
        <Image
          src={campaign.image}
          width={380}
          height={173}
          alt={campaign.title}
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="py-1">
        <p className="text-gray-700">{campaign.description}</p>
      </div>
    </div>
  );
}

export default AvailableCampaigns;