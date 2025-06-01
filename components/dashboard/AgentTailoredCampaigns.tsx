import React from 'react'
import AvailableCampaigns from './AvailableCampaigns'
import AgentBottomNav from './AgentBottomNav'
import Image from "next/image";
import More from "../icons/More";
import StatusBar from './StatusBar';

function AgentTailoredCampaigns() {
  return (

    <div>
        <StatusBar/>
        <div className="max-w-[400px] mx-auto h-screen">
        <div className='p-3 flex justify-between text-black'>
            <p>For you</p>
            <p>Real estate</p>
            <p>E-commerce</p>
            <p>Games </p>
        </div>
        <div className='space-y-3 mt-5'>
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
        <AgentBottomNav/>
    </div>
    </div>
    
  )
}

export default AgentTailoredCampaigns