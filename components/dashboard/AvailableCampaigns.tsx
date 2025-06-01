import React from "react";
import Image from "next/image";
import More from "../icons/More";

function AvailableCampaigns() {
  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold">Available Campaigns</h1>
      </div>
      <div className="py-2">
        <p className=" text-sm font-medium">For you</p>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/campaign-profile.png"
              width={40}
              height={40}
              alt="campaigns image"
            />
            <div className="space-y-2">
                <p>Logy Cosmetics</p>
                <small className="text-gray-400">Immune booster</small>
            </div>
          </div>
          <div>
            <More/>
          </div>
        </div>

        <div className="py-3">
             <Image
          src="/campaign-card-img.png"
          width={380}
          height={173}
          alt="campaigns card image"
        />
        </div>

        <div className="py-1">
            <p className="text-black">Healthy for every gender within the age of 20 - 50</p>
        </div>
       
      </div>
    </div>
  );
}

export default AvailableCampaigns;
