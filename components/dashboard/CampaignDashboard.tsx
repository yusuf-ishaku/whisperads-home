import UserGreeting from "./UserGreeting"
import StatsSummary from "./StatsSummary"
import ActiveCampaigns from "./ActiveCampaigns"
import ActionButtons from "./ActionButtons"

export default function CampaignDashboard() {
  return (
    <div className="p-4 flex flex-col gap-4  max-w-[400px] mx-auto h-screen overflow-y-auto">
      <UserGreeting name="Abdul" />
      <StatsSummary
        walletBalance={300000}
        totalCampaigns={12}
        totalAdSpend={950000}
        totalImpressions={10500}
        statusViews={8000}
        clickThrough={2540}
      />
      <ActiveCampaigns />
      <ActionButtons />
    </div>
  )
}
