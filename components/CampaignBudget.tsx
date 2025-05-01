import React from "react";
import Dollars from "./icons/Dollars";
import Image from "next/image";

function CampaignBudget() {
  return (
    <div className="flex justify-between items-center p-6 bg-primary w-[317px] rounded-lg mx-auto relative ">
      <div className="text-white">
        <div className="flex items-center gap-2">
          <Dollars />
          <h1>Ads on a budget</h1>
        </div>
        <p>Stretch your brand reach, get noticed without overspending.</p>
      </div>
      <div className="items-end">
        <Image
          src="/pagination.png"
          width={50}
          height={18}
          alt="Ads on a budget"
        />
      </div>
      <div className="relative top-[25px]">
        <Image
          src="/budget-man.png"
          width={133}
          height={145}
          alt="Ads on a budget"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default CampaignBudget;
