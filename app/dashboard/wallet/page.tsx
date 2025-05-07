import CampaignDashboard from '@/components/dashboard/CampaignDashboard'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import FundWalletModal from '@/components/dashboard/FundWalletModal'
import PayWithCardModal from '@/components/dashboard/PayWithCardModal'
import CardPaymentDetailsModal from '@/components/dashboard/CardPaymentDetailsModal'
import BankTransferModal from '@/components/dashboard/BankTransferModal'


import React from 'react'

function WalletPage() {
  return (
    <div className="">
        <DashboardLayout>
            <CampaignDashboard/>
        </DashboardLayout>
    </div>
  )
}

export default WalletPage