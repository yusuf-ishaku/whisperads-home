"use client";

import React from "react";
import Image from "next/image";
import More from "../icons/More";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define campaign data type
interface Campaign {
  id: number;
  company: string;
  title: string;
  description: string;
  image: string;
  logo: string;
  category: "for-you" | "real-estate" | "ecommerce" | "games";
}

function AvailableCampaigns() {
  const campaigns: Campaign[] = [
    {
      id: 1,
      company: "Logy Cosmetics",
      title: "Immune booster",
      description: "Healthy for every gender within the age of 20 - 50",
      image: "/campaign-card-img.png",
      logo: "/campaign-profile.png",
      category: "for-you",
    },
    {
      id: 5,
      company: "Harvey Beham",
      title: "Virtual Meeting",
      description: "Let's deal",
      image: "/ad-three.png",
      logo: "/campaign-profile.png",
      category: "for-you",
    },
    {
      id: 2,
      company: "Urban Estates",
      title: "Luxury Apartments",
      description: "Premium living spaces in the heart of the city",
      image: "/ad-two.png",
      logo: "/campaign-profile.png",
      category: "real-estate",
    },
    {
      id: 3,
      company: "ShopEasy",
      title: "Summer Sale",
      description: "Up to 50% off on all electronics",
      image: "/ad-one.png",
      logo: "/campaign-profile.png",
      category: "ecommerce",
    },
    {
      id: 4,
      company: "Epic Games",
      title: "New RPG Launch",
      description: "Embark on an epic fantasy adventure",
      image:  "/campaign-card-img.png",
      logo: "/campaign-profile.png",
      category: "games",
    },
  ];

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

        {/* For You Tab */}
        <TabsContent value="for-you" className="space-y-4">
          {campaigns
            .filter((campaign) => campaign.category === "for-you")
            .map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </TabsContent>

        {/* Real Estate Tab */}
        <TabsContent value="real-estate" className="space-y-4">
          {campaigns
            .filter((campaign) => campaign.category === "real-estate")
            .map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </TabsContent>

        {/* E-commerce Tab */}
        <TabsContent value="ecommerce" className="space-y-4">
          {campaigns
            .filter((campaign) => campaign.category === "ecommerce")
            .map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </TabsContent>

        {/* Games Tab */}
        <TabsContent value="games" className="space-y-4">
          {campaigns
            .filter((campaign) => campaign.category === "games")
            .map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
   <>
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

   
   </>
  );
}

export default AvailableCampaigns;