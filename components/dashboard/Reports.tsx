import { Battery, Signal, Wifi } from "lucide-react"
import { Card } from "@/components/ui/card"
import AdMetrics from "./AdMetrics"
import ActivityItem from "./ActivityItem"
import LineGraph from "./LineGraph"

export default function Reports() {
  return (
    <>
      <div className="bg-primary text-white p-4">
        <h1 className="text-lg font-medium">Report</h1>
      </div>
     <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}

      {/* Content */}
      <div className="px-4  space-y-5 pb-8">
        {/* Total Clicks Card */}
        <Card className="p-6 rounded-3xl shadow-sm mt-7">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-medium">Total Clicks</h2>
              <p className="text-xs text-gray-500">From sign up date</p>
            </div>
            <div className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">100,000</div>
          </div>
          <div className="mt-4">
            <LineGraph />
          </div>
        </Card>

        {/* Ads Metrics Card */}
        <Card className="p-4 rounded-3xl shadow-sm">
          <h2 className="text-sm font-medium mb-4">Ad Metrics</h2>
          <div className="grid grid-cols-3 gap-2">
            <AdMetrics value="120" label="Total Campaigns" />
            <AdMetrics value="₦950,000" label="Total Spent" className="border-x border-gray-200" />
            <AdMetrics value="230,000" label="Total Impressions" />
          </div>
        </Card>

        {/* Activities Card */}
        <Card className=" shadow-0 border-0">
          <h2 className="text-sm font-medium my-4">Your Activities</h2>
          <div className="space-y-3">
            <ActivityItem
              description="You created an ad for Reach Wears"
              amount="₦20,000"
              timestamp="12:00 PM"
              positive
            />
            <ActivityItem
              description="You created an ad for VIL Outlets"
              amount="₦10,000"
              timestamp="10:30 AM"
              positive
            />
            <ActivityItem description="Created 2,000 impressions" amount="₦5,000" timestamp="09:00 AM" negative />
            <ActivityItem description="Created 3,465 impressions" amount="₦4,000" timestamp="Yesterday" negative />
          </div>
        </Card>
      </div>
    </div>
    </>
   
  )
}
