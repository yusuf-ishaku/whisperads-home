"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import UploadProofPopup from "./UploadProofPopup";
import { Button } from "../ui/button";
import ParticipateSuccessModal from "../ParticipateSuccessModal";

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

interface CampaignCardProps {
  campaign: Campaign;
  onDetailsClick: (campaign: Campaign) => void;
  onUploadClick: () => void;
}

export default function AgentActiveCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showUploadProof, setShowUploadProof] = useState(false);
  const [date, setDate] = useState('12/12/2025');
  const [viewCount, setViewCount] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showParticipationModal, setShowParticipationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchActiveCampaigns = async () => {
      try {
        const token = sessionStorage.getItem("token");
          console.log("Token:", token);
        if (!token) throw new Error("Not authenticated");

        const response = await fetch("https://whisperads-api-production.up.railway.app/campaigns/match", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch active campaigns");
        }

        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCampaigns();
  }, []);

  const handleDetailsClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsSheetOpen(true);
    setShowUploadProof(false);
  };

  const handleUploadClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsSheetOpen(true);
    setShowUploadProof(true);
  };

  const handleParticipateClick = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowParticipationModal(true);
      setIsSheetOpen(false);
    }, 1000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting:', { date, viewCount, selectedFile });
    setIsSheetOpen(false);
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

  if (campaigns.length === 0) {
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
            onDetailsClick={handleDetailsClick}
            onUploadClick={() => handleUploadClick(campaign)}
          />
        ))}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={(open) => {
        setIsSheetOpen(open);
        if (!open) {
          setShowUploadProof(false);
          setDate('12/12/2025');
          setViewCount('');
          setSelectedFile(null);
        }
      }}>
        <SheetContent side="bottom" className="h-[90vh] max-w-md overflow-y-auto">
          {selectedCampaign && (
            showUploadProof ? (
              <div className="h-full">
                <button 
                  onClick={() => setShowUploadProof(false)}
                  className="flex items-center mb-4"
                >
                  <ChevronLeft className="mr-2" />
                  Back to Details
                </button>
                <UploadProofPopup />
              </div>
            ) : (
              <>
                <div><h1 className="text-lg font-semibold">Campaign Details</h1></div>
                <SheetHeader>
                  <SheetTitle className="text-left font-normal text-base">{selectedCampaign.title}</SheetTitle>
                </SheetHeader>
                
                <div className="mt-4">
                  <div className="mb-4 w-[300px] h-auto mx-auto">
                    <Image
                      src={selectedCampaign.image}
                      alt={selectedCampaign.title}
                      width={318}
                      height={216}
                      className="w-full rounded-md bg-primary"
                    />
                  </div>

                  <div className="mb-7">
                    <h3 className="font-medium mb-1">Ad Description:</h3>
                    <p className="text-gray-700">{selectedCampaign.caption}</p>
                  </div>

                  <div className="text-center my-3 mb-5">
                    <p className="text-gray-300 text-xs">Amount</p>
                    <p className="font-semibold text-lg">{selectedCampaign.budget}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-500">Start Date:</p>
                      <p>{new Date(selectedCampaign.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-500">End Date:</p>
                      <p>{new Date(selectedCampaign.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-500">Goal:</p>
                      <p>{selectedCampaign.adGoal}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-500">Gender:</p>
                      <p>{selectedCampaign.gender}</p>
                    </div>
                  </div>

                  <div className="mt-10 mb-4">
                    <button 
                      onClick={handleParticipateClick}
                      disabled={isLoading} 
                      className="bg-primary w-[80%] mx-auto justify-center text-center flex py-2 text-white rounded-[0.5rem] text-base"
                    >
                      {isLoading ? "Processing..." : "Participate"}
                    </button>
                  </div>
                </div>
              </>
            )
          )}
        </SheetContent>
      </Sheet>

      {showParticipationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-center shadow-md rounded-xl space-y-3 w-[375px] h-[311px] p-6">
            <div className="flex justify-center">
              <Image 
                src="/success-emoji.png" 
                alt="Success Emoji" 
                width={62} 
                height={64}
              />
            </div>
            <p className="font-medium text-lg">Successful</p>
            <p className="font-normal text-[#989898] text-sm w-[233px] mx-auto">
              You've been added to this campaign. Click the button below to post ad on your WhatsApp status.
            </p>
            <div className="py-3">
              <Button
                className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-transform duration-150"
                onClick={() => setShowParticipationModal(false)}
              >
                Post Ad
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CampaignCard({ campaign, onDetailsClick, onUploadClick }: CampaignCardProps) {
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
            onClick={() => onDetailsClick(campaign)}
            className="text-xs bg-white p-1 text-center rounded mx-auto border-primary border text-primary"
          >
            See Details
          </button>
          <button 
            onClick={onUploadClick}
            className="text-xs text-white bg-primary p-1 text-center rounded mx-auto"
          >
            Upload proof
          </button>
        </div>
      </div>
    </div>
  );
}