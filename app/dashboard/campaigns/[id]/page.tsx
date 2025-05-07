import CampaignDetails from '@/components/dashboard/CampaignDetails'
import React from 'react'
import { useParams } from 'next/navigation'


function CampaignDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const campaignParams = { id } // Ensure params has the required structure
  return (
    <div>
        <CampaignDetails params={campaignParams}/>
    </div>
  )
}

export default CampaignDetailsPage