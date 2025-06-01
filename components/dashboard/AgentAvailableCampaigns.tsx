import React from "react";
import Image from "next/image";
import More from "../icons/More";
import { ChevronLeft } from "lucide-react";
import AvailableCampaigns from "./AvailableCampaigns";

function AgentAvailableCampaigns() {
  return (
    <div>
      <div className="bg-primary text-white p-4 flex items-center">
        <button className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Available Campaigns</h1>
      </div>
      <div className="py-3">
              <AvailableCampaigns/>

      </div>
    </div>
  );
}

export default AgentAvailableCampaigns;
