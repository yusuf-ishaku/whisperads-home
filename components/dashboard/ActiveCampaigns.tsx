import { Star } from "lucide-react";
import Image from "next/image";

export default function ActiveCampaigns() {
  const campaigns = [
    {
      id: 1,
      title: "Summer Beach Wear",
      image: "/campaign-image-one.png",
      performance: 5,
      views: 5231,
      clicks: 812,
    },
    {
      id: 2,
      title: "Face Vitamins C Serum",
      image: "/campaign-image-two.png",
      performance: 4,
      views: 6785,
      clicks: 543,
    },
  ];

  return (
    <div className="space-y-1">
      <h2 className="font-semibold text-base">Active Campaigns</h2>
      <div className="grid grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
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
}

interface CampaignCardProps {
  campaign: Campaign;
}

function CampaignCard({ campaign }: CampaignCardProps) {
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
        <div className="flex my-2">
          <button className="text-xs text-white bg-primary py-1 px-3  text-center rounded mx-auto">
            See Details
          </button>
        </div>
      </div>
    </div>
  );
}
