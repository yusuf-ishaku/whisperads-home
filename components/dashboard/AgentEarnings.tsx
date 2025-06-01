import { Battery, Signal, Wifi, ArrowDown, ArrowUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import EarningsChart from "./EarningsChart"

export default function AgentEarnings() {
  return (
    <div className=" mx-auto bg-white min-h-screen">

      {/* Header */}
      <div className="bg-primary text-white p-4">
        <h1 className="text-lg font-medium">Earnings</h1>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Overview Section */}
        <div>
          <h2 className="text-base font-medium mb-3">Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 border">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-semibold">₦300,000</p>
                <p className="text-xs text-gray-500">From sign up date</p>
              </div>
            </Card>
            <Card className="p-4 border">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Pending Payouts</p>
                <p className="text-2xl font-semibold">₦25000</p>
                <p className="text-xs text-gray-500">1 active campaign</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Chart Section */}
        <div className="h-64">
          <EarningsChart />
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-medium">Recent Transactions</h2>
            <Link href="#" className="text-sm text-green-500">
              See All
            </Link>
          </div>

          <div className="space-y-4">
            <TransactionItem
              type="received"
              title="Payment Received"
              description="Vitamin C serum Campaign"
              date="05/09/24"
              amount="₦5000"
            />
            <TransactionItem
              type="payout"
              title="Payout"
              description="To Bank Account"
              date="05/09/24"
              amount="₦5000"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface TransactionItemProps {
  type: "received" | "payout"
  title: string
  description: string
  date: string
  amount: string
}

function TransactionItem({ type, title, description, date, amount }: TransactionItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            type === "received" ? "bg-green-100" : "bg-green-100"
          }`}
        >
          {type === "received" ? (
            <ArrowDown className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowUp className="h-4 w-4 text-green-500" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>
      <p className="text-sm font-medium">{amount}</p>
    </div>
  )
}
