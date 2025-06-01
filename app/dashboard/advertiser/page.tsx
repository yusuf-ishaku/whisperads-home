import BottomNavigation from "@/components/dashboard/BottomNavigation";
import CampaignDashboard from "@/components/dashboard/CampaignDashboard";
import StatusBar from "@/components/dashboard/StatusBar";
import React from "react";

function page() {
  return (
    <div className="flex flex-col bg-white">
      <StatusBar />
      <CampaignDashboard />
      <BottomNavigation />
    </div>
  );
}

export default page;
