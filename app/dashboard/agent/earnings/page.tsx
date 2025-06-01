import AgentBottomNav from '@/components/dashboard/AgentBottomNav'
import AgentEarnings from '@/components/dashboard/AgentEarnings'
import React from 'react'

function page() {
  return (
    <div>
        <AgentEarnings/>
        <AgentBottomNav/>
    </div>
  )
}

export default page