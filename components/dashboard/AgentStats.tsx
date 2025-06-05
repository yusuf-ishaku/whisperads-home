import React from "react";
import { useState, useEffect } from "react";
import DashboardRight from "../icons/DashboardRight";
import Image from "next/image";


function AgentStats() {
  return (
    <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-[0.7rem] border border-[#00000080] ">
            <div className="flex items-center gap-1">
                <Image src="/stats.png" width={30} height={30} alt="stats summary"/>
                <p>Total Campaigns Posted</p>
            </div>
            <div>
                <p>0</p>
            </div>
        </div>
      <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-[0.7rem] border border-[#00000080] space-y-1">
          <p className="text-sm font-medium text-[#00000080]">
            Total Earnings
          </p>
          <p className="font-bold"> ₦0</p>
        </div>
        <div className="bg-white p-3 rounded-[0.7rem] border border-[#00000080] space-y-1">
          <p className="text-sm font-medium text-[#00000080]">
            Avail. Balance
          </p>
          <p className="font-semibold text-sm">₦0</p>
          <button className="text-[10px] text-primary px-2 py-0.5 rounded-full mt-1 flex gap-3 border border-primary items-center">
            Request Withdrawal
            <DashboardRight />
          </button>
        </div>
      
      </div>
    </div>
  );
}

export default AgentStats;
