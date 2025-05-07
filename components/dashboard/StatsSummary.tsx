import DashboardRight from "../icons/DashboardRight"

interface StatsSummaryProps {
    walletBalance: number
    totalCampaigns: number
    totalAdSpend: number
    totalImpressions: number
    statusViews: number
    clickThrough: number
  }
  
  export default function StatsSummary({
    walletBalance,
    totalCampaigns,
    totalAdSpend,
    totalImpressions,
    statusViews,
    clickThrough,
  }: StatsSummaryProps) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-[0.7rem] border border-[#00000080] space-y-1">
            <p className="text-sm font-medium text-[#00000080]">Wallet Balance</p>
            <p className="font-semibold text-sm">₦{walletBalance.toLocaleString()}</p>
            <button className="text-[10px] text-primary  px-2 py-0.5 rounded-full mt-1 flex gap-3  border border-primary items-center">Top Up wallet
            <DashboardRight/>
            </button>
            

          </div>
          <div className="bg-white p-3 rounded-[0.7rem] border border-[#00000080] space-y-1">
            <p className="text-sm font-medium text-[#00000080]">Total Campaign Run</p>
            <p className="font-bold">{totalCampaigns}</p>
          </div>
        </div>
  
        <div className="space-y-1 p-2 bg-[#f9f9f9] rounded">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#00000080] font-medium">Total Ad Spend</span>
            <span className="font-semibold text-sm ">₦{totalAdSpend.toLocaleString()}</span>
          </div>
  
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-[#00000080]">Total Impressions (Last 30 Days)</span>
            <div className="flex items-center gap-1">
              <div className="flex items-end h-4 space-x-0.5">
                {[3, 5, 4, 6, 7, 5, 8].map((height, i) => (
                  <div key={i} className="w-0.5 bg-primary" style={{ height: `${height * 0.1}rem` }} />
                ))}
              </div>
            </div>
              <span className="font-semibold text-sm">{totalImpressions.toLocaleString()}</span>
          </div>
  
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-[#00000080]">Status Views:</span>
            <span className="text-xs font-medium text-[#00000080]">{statusViews.toLocaleString()}</span>
          </div>
  
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-[#00000080]">Click Through</span>
            <span className="text-xs font-medium text-[#00000080]">{clickThrough.toLocaleString()}</span>
          </div>
        </div>
      </div>
    )
  }
  