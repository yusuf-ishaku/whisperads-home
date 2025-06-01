"use effect"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react";


interface CampaignDetailsProps {
  params: {
    id: string
  }
}

interface Campaign {
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


// const mockCampaigns = [
//   {
//     id: 1,
//     name: "Summer Beach Wears",
//     description: "Don't slack this summer, up your beach look with our...",
//     price: "₦25000",
//     days: 7,
//     isActive: true,
//     image: "/campaign-details.png",
//     benefits: [
//       "Hydrates and nourishes",
//       "Reduces dark spots and hyperpigmentation",
//       "Reveals brighter, smoother skin.",
//     ],
//     offer: "Limited Time Offer: Buy One, Get One 50% Off!",
//     amount: "₦25000",
//     duration: "7 days",
//     gender: "All gender",
//     views: 8765,
//     clicks: 8765,
//   },
//   {
//     id: 2,
//     name: "Face Vitamins Serum",
//     description: "Boost your immunity with our first hand immunity booster...",
//     price: "₦50000",
//     days: 7,
//     isActive: true,
//     image: "/campaign-details.png",
//     benefits: [
//       "Hydrates and nourishes",
//       "Reduces dark spots and hyperpigmentation",
//       "Reveals brighter, smoother skin.",
//     ],
//     offer: "Limited Time Offer: Buy One, Get One 50% Off!",
//     amount: "₦50000",
//     duration: "7 days",
//     gender: "All gender",
//     views: 8765,
//     clicks: 8765,
//   },
// ];

export default function CampaignDetails({ params }: CampaignDetailsProps) {

    const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


    useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          return;
        }

        const res = await fetch(`/api/campaigns/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch campaign");
        }

        const data = await res.json();
        setCampaign(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [params.id]);

   if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!campaign) return <div>Campaign not found</div>;



  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-3 py-2">
          <Link href="/dashboard/campaigns" className="mr-2">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-semibold">Campaign Details</h1>
        </div>

        {/* Campaign Name */}
        <h2 className="text-md font-medium py-3">{campaign.title}</h2>

        {/* Campaign Image */}
           {campaign.mediaUrl && (
          <div className="mb-4">
            <Image
              src={campaign.mediaUrl}
              alt={campaign.title}
              width={316}
              height={210}
              className="w-full h-auto rounded-md"
              priority
            />
          </div>
        )}

        {/* Ad Description */}
        <div className="mb-4 py-2">
          <h3 className="font-medium mb-1">Ad Description:</h3>
          <p className="text-gray-700">{campaign.caption}</p>
        </div>

          <div className="mb-4 py-2">
            <p className="font-medium mb-1">Our {campaign.title}:</p>
            <ul className="list-none pl-2">
                <li key={campaign.title} className="flex items-start mb-1">
                  <span className="mr-2">•</span>
                  <span className="text-gray-700">{campaign.caption}</span>
                </li>
            </ul>
          </div>

        {/* Offer */}
        {campaign.budget && <p className="text-gray-700 mb-6">{campaign.budget}</p>}

        {/* Amount */}
        <div className="text-center mb-6">
          <p className="text-gray-400 ">Amount</p>
          <p className="text-xl font-medium">{campaign.budget}</p>
        </div>

         <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-700">Start Date: {new Date(campaign.startDate).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700">End Date: {new Date(campaign.endDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-700">Status: {campaign.status}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700">Goal: {campaign.adGoal}</p>
          </div>
        </div>

        {/* Campaign Stats */}
        {/* <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-700">Duration: {campaign.endDate}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700">Gender: {campaign.gender}</p>
          </div>
          <div>
            <p className="text-gray-700">Views: {campaign.views.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700">Clicks: {campaign.clicks.toLocaleString()}</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}