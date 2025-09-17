"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  Target,
  Users,
  DollarSign,
  MapPin,
  Globe,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

interface CampaignDetailsProps {
  params: {
    id: string;
  };
}

interface Campaign {
  id: string;
  campaignType: string;
  perViewAmount: string;
  perInfluencerAmount: string;
  influencerCount: number;
  amountToSpend: string;
  title: string;
  mediaUrl: string;
  caption: string;
  callToActionUrl: string | null;
  budget: string;
  viewGoal: string;
  allowedParticipants: any;
  startDate: string;
  endDate: string;
  targetingRules: {
    ageRange: string;
    location: string;
    preferredGender: string;
    language: string;
  } | null;
  status: string;
  adGoal: string;
  advertiserId: string;
  createdAt: string;
  updatedAt: string;
}

export default function CampaignDetails({ params }: CampaignDetailsProps) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const router = useRouter();
  // inside CampaignDetails component

const [updating, setUpdating] = useState(false);

const handleToggleStatus = async () => {
  if (!campaign) return;

  const newStatus = campaign.status === "active" ? "draft" : "active";

  try {
    setUpdating(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Authentication required");
      return;
    }

    const campaignId = campaign.id;

    const res = await fetch(
      `https://whisperads-api-production.up.railway.app/campaigns/campaign/${campaignId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!res.ok) {
      toast({ variant: "destructive", title: "Failed to update campaign status" });
    }

    // update UI
    setCampaign({ ...campaign, status: newStatus });
  } catch (err) {
    console.error(err);
    setError(err instanceof Error ? err.message : "Unknown error");
  } finally {
    setUpdating(false);
  }
};


  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const campaignData = urlParams.get("campaign");

      if (campaignData) {
        try {
          const parsedCampaign = JSON.parse(campaignData);
          setCampaign(parsedCampaign);
          setLoading(false);
          return;
        } catch (e) {
          console.error("Error parsing campaign data:", e);
        }
      }
    }

    const fetchCampaign = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

         const endpoints = [
          `https://whisperads-api-production.up.railway.app/campaigns/campaign/${params.id}`,
          `https://whisperads-api-production.up.railway.app/campaigns/${params.id}`,
          // `https://whisperads-api-production.up.railway.app/campaigns/my-campaigns/${params.id}`,
        ];

        let campaignData = null;

        for (const endpoint of endpoints) {
          try {
            const res = await fetch(endpoint, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (res.ok) {
              campaignData = await res.json();
              break;
            }
          } catch (err) {
            console.warn(`Endpoint ${endpoint} failed:`, err);
          }
        }

        if (campaignData) {
          setCampaign(campaignData);
        } else {
          throw new Error("Campaign not found - all endpoints failed");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "paused":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading)
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div>Loading campaign details...</div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );

  if (!campaign)
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center">
        <div>Campaign not found</div>
      </div>
    );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="p-4 flex items-center">
            <Link href="/dashboard/advertiser/campaigns" className="mr-2">
              <ChevronLeft size={24} className="text-gray-600" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Campaign Details
            </h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Campaign Card */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            {/* Campaign Header */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {campaign.title}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  campaign.status
                )}`}
              >
                {campaign.status.toUpperCase()}
              </span>
            </div>

            {/* Campaign Image */}
            {campaign.mediaUrl && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <Image
                  src={campaign.mediaUrl}
                  alt={campaign.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                  priority
                />
              </div>
            )}

            {/* Description */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Ad Description
              </h3>
              <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                {campaign.caption}
              </p>
            </div>

            {/* Budget */}
            <div className="bg-primary/10 rounded-lg p-4 text-center mb-4">
              <p className="text-gray-600 text-sm mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-primary">
                ₦{parseFloat(campaign.budget).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Toggle Status Control */}
<div className="flex items-center justify-between bg-white rounded-xl shadow-sm border p-4">
  <div>
    <p className="text-sm font-medium text-gray-900">Campaign Status</p>
    <p className="text-xs text-gray-500">Toggle Active/Draft</p>
  </div>

  <button
    onClick={handleToggleStatus}
    disabled={updating}
    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
      campaign.status === "active" ? "bg-primary" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        campaign.status === "active" ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
</div>


          {/* Campaign Details Grid */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Campaign Timeline
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-gray-500 text-xs">Start Date</p>
                <p className="text-gray-900 font-medium">
                  {new Date(campaign.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-xs">End Date</p>
                <p className="text-gray-900 font-medium">
                  {new Date(campaign.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-xs">Status</p>
                <p className="text-gray-900 font-medium capitalize">
                  {campaign.status}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-xs">Goal</p>
                <p className="text-gray-900 font-medium capitalize">
                  {campaign.adGoal}
                </p>
              </div>
            </div>
          </div>

          {/* Campaign Type Details */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              {campaign.campaignType.toUpperCase()} Details
            </h3>

            {campaign.campaignType === "ppv" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Per View Amount</span>
                  <span className="font-semibold">
                    ₦{parseFloat(campaign.perViewAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">View Goal</span>
                  <span className="font-semibold">
                    {parseInt(campaign.viewGoal).toLocaleString()} views
                  </span>
                </div>
              </div>
            )}

            {campaign.campaignType === "ppi" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Per Influencer</span>
                  <span className="font-semibold">
                    ₦{parseFloat(campaign.perInfluencerAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Influencer Count</span>
                  <span className="font-semibold">
                    {campaign.influencerCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold">
                    ₦{parseFloat(campaign.amountToSpend).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Targeting Rules */}
          {campaign.targetingRules && (
            <div className="bg-white rounded-xl shadow-sm border p-4">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Targeting Audience
              </h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-3 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Age Range</p>
                    <p className="text-sm font-medium">
                      {campaign.targetingRules.ageRange}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">
                      {campaign.targetingRules.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-3 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="text-sm font-medium capitalize">
                      {campaign.targetingRules.preferredGender}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-3 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Language</p>
                    <p className="text-sm font-medium">
                      {campaign.targetingRules.language}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-medium text-gray-900 mb-4">
              Additional Information
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Campaign Type</span>
                <span className="font-medium uppercase">
                  {campaign.campaignType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created</span>
                <span className="font-medium">
                  {new Date(campaign.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium">
                  {new Date(campaign.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
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
  );
}
