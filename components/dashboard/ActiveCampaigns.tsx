"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import UploadProofPopup from "./UploadProofPopup";
import { Button } from "../ui/button";
import ParticipateSuccessModal from "../ParticipateSuccessModal";


export default function ActiveCampaigns() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [showUploadProof, setShowUploadProof] = useState(false);
  const [date, setDate] = useState('12/12/2025');
  const [viewCount, setViewCount] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showParticipationModal, setShowParticipationModal] = useState(false);
      const [isLoading, setIsLoading] = useState(false);




const campaigns = [
    {
      id: 1,
      title: "Summer Beach Wear",
      image: "/campaign-image-one.png",
      performance: 5,
      views: 5231,
      clicks: 812,
      caption: "Don't slack this summer, up your beach look with our summer body...",
      budget: "₦25000",
      status: "Active",
      gender: "All gender",
      adGoal: "Brand Awareness",
      startDate: "2023-06-01",
      endDate: "2023-06-30",
    },
    {
      id: 2,
      title: "Face Vitamins C Serum",
      image: "/campaign-image-two.png",
      performance: 4,
      views: 6785,
      clicks: 543,
      caption: "Boost your immunity with our first hand immunity booster...",
      budget: "₦50000",
      status: "Active",
            gender: "All gender",

      adGoal: "Sales Conversion",
      startDate: "2023-06-15",
      endDate: "2023-07-15",
    },
  ];

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
      setIsSheetOpen(false); // Close the sheet when showing modal
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
    // Add your submission logic here
    setIsSheetOpen(false); // Close sheet after submission
  };

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

         {/* Combined Sheet for both views */}
      <Sheet open={isSheetOpen} onOpenChange={(open) => {
        setIsSheetOpen(open);
        if (!open) {
          setShowUploadProof(false);
          // Reset form when closing
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
                {/* Campaign Image */}
                <div className="mb-4 w-[300px] h-auto mx-auto">
                  <Image
                    src={selectedCampaign.image}
                    alt={selectedCampaign.title}
                    width={318}
                    height={216}
                    className="w-full rounded-md bg-primary"
                  />
                </div>

                {/* Description */}
                <div className="mb-7">
                  <h3 className="font-medium mb-1">Ad Description:</h3>
                  <p className="text-gray-700">{selectedCampaign.caption}</p>
                </div>


                <div className="text-center my-3 mb-5">
                  <p className="text-gray-300 text-xs">Amount</p>
                  <p className="font-semibold text-lg">{selectedCampaign.budget}</p>
                </div>

                

                {/* Dates */}
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

                {/* Status & Goal */}
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
                  <button  onClick={handleParticipateClick}
                    disabled={isLoading} className="bg-primary w-[80%] mx-auto justify-center text-center flex py-2 text-white rounded-[0.5rem] text-base">Participate</button>
                </div>

              </div>
            </>
            )
          )}
        </SheetContent>
      </Sheet>

      {/* Participation Success Modal */}
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

function CampaignCard({ campaign, onDetailsClick, onUploadClick }: CampaignCardProps) {
  return (
    <div className="bg-white rounded-[0.5rem] overflow-hidden shadow-sm border border-[#00000080] ">
      <div className="relative h-[126px] bg-primary">
        <div className=" top-0 left-0 right-0 flex justify-between p-1">
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
          className="text-xs bg-white p-1  text-center rounded mx-auto border-primary border text-primary"
        >
          See Details
        </button>
        <button 
          onClick={onUploadClick}
          className="text-xs text-white bg-primary p-1  text-center rounded mx-auto"
        >
          Upload proof
        </button>
      </div>
      </div>
    </div>
  );
}
