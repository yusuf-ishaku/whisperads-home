"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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
  targetingRules: {
    genders?: string[];
    ageRange?: string;
    locations?: string[];
  };
}

export default function AgentCampaignDetail() {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        if (!token) throw new Error("Not authenticated");

        const response = await fetch(`/api/campaigns/${campaignId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch campaign");
        }

        const data = await response.json();
        setCampaign(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load campaign");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  if (loading) return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100">
      <div className="bg-primary text-white px-4 py-3 flex items-center">
        <Link href="/dashboard/agent/campaigns">
          <ChevronLeft size={24} />
        </Link>
        <span className="ml-2 font-medium text-lg">Loading Campaign...</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500">Loading campaign details...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100">
      <div className="bg-primary text-white px-4 py-3 flex items-center">
        <Link href="/dashboard/agent/campaigns">
          <ChevronLeft size={24} />
        </Link>
        <span className="ml-2 font-medium text-lg">Error</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    </div>
  );

  if (!campaign) return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100">
      <div className="bg-primary text-white px-4 py-3 flex items-center">
        <Link href="/dashboard/agent/campaigns">
          <ChevronLeft size={24} />
        </Link>
        <span className="ml-2 font-medium text-lg">Not Found</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500">Campaign not found</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-primary text-white px-4 py-3 flex items-center">
        <Link href="/dashboard/agent/campaigns">
          <ChevronLeft size={24} />
        </Link>
        <span className="ml-2 font-medium text-lg">{campaign.title}</span>
      </div>

      {/* Campaign Content */}
      <div className="flex-1 overflow-auto p-4">
        {campaign.mediaUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={campaign.mediaUrl} 
              alt={campaign.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="font-bold text-lg mb-2">{campaign.title}</h2>
          <p className="text-gray-700 mb-4">{campaign.caption}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className={`font-medium ${
                campaign.status === 'active' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {campaign.status}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Budget</p>
              <p className="font-medium">₦{parseFloat(campaign.budget).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{new Date(campaign.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium">{new Date(campaign.endDate).toLocaleDateString()}</p>
            </div>
          </div>

          {campaign.callToActionUrl && (
            <a
              href={campaign.callToActionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-primary text-white text-center py-2 rounded-lg mt-4"
            >
              Visit Campaign
            </a>
          )}
        </div>

        {/* Targeting Rules */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="font-bold mb-2">Targeting Rules</h3>
          <div className="space-y-2">
            {campaign.targetingRules.genders && (
              <div>
                <p className="text-sm text-gray-500">Genders</p>
                <p className="font-medium">
                  {campaign.targetingRules.genders.join(", ")}
                </p>
              </div>
            )}
            {campaign.targetingRules.ageRange && (
              <div>
                <p className="text-sm text-gray-500">Age Range</p>
                <p className="font-medium">{campaign.targetingRules.ageRange}</p>
              </div>
            )}
            {campaign.targetingRules.locations && (
              <div>
                <p className="text-sm text-gray-500">Locations</p>
                <p className="font-medium">
                  {campaign.targetingRules.locations.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}