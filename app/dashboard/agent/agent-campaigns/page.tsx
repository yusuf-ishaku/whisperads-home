import AgentBottomNav from '@/components/dashboard/AgentBottomNav'
import AllAgentCampaigns from '@/components/dashboard/AllAgentCampaigns'
import AllCampaigns from '@/components/dashboard/AllCampaigns'
import React from 'react'

function page() {
  return (
    <div>
        <AllAgentCampaigns/>
        <AgentBottomNav/>
    </div>
  )
}

export default page