"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Campaign {
  campaign: {
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
    createdAt: string;
    updatedAt: string;
  };
  score: number;
}

export default function AllCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.role) {
          setRole(user.role.toLowerCase());
        } else {
          router.push("/choose-role");
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        router.push("/choose-role");
      }
    } else {
      router.push("/choose-role");
    }
  }, [router]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = sessionStorage.getItem("token");
            console.log('Token from sessionStorage:', token); 

        if (!token) {
          throw new Error("Not authenticated");
        }

        const response = await fetch("https://whisperads-api-production.up.railway.app/campaigns/my-campaigns", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch campaigns");
        }

        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
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
        <Link href={"/dashboard/agent"}>
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
        <Link href={"/dashboard/agent"}>
          <ChevronLeft size={24} />
        </Link>
        <span className="ml-2 font-medium text-lg">All Campaigns</span>
      </div>

      {/* Campaign List */}
      <div className="flex-1 overflow-auto">
        {campaigns.length > 0 ? (
          campaigns.map(({ campaign }) => (
            <Link
              key={campaign.id}
              href={`/dashboard/agent/agent-campaigns/${campaign.id}`}
              className="block border-b border-gray-200 px-7 py-5 h-28 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex">
                {/* Campaign Image */}
                {campaign.mediaUrl && (
                  <div className="mr-3 mt-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={campaign.mediaUrl} 
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">
                      {campaign.title}
                    </h3>
                    <span className="font-medium text-gray-900">
                      ₦{parseFloat(campaign.budget).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-start mt-1">
                    <div className="text-xs text-gray-500">
                      {calculateDaysRemaining(campaign.endDate)} days remaining
                    </div>
                    <span className={`text-xs ${
                      campaign.status === "active" 
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
            <button 
              className="mt-2 text-primary text-sm"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        )}
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