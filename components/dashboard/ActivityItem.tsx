interface ActivityItemProps {
  description: string
  amount: string
  timestamp: string
  positive?: boolean
  negative?: boolean
}

export default function ActivityItem({ description, amount, timestamp, positive, negative }: ActivityItemProps) {
  return (
    <div className="flex justify-between items-start p-2  bg-gray-100 rounded-sm">
      <div className="flex items-start gap-2">
        <div className={`w-2 h-2 rounded-full mt-1.5 ${positive ? "bg-green-500" : "bg-red-500"}`} />
        <div>
          <p className="text-xs font-medium">{description}</p>
          <p className="text-[10px] text-gray-500">{timestamp}</p>
        </div>
      </div>
      <p className={`text-xs font-medium ${negative ? "text-red-500" : "text-green-500"}`}>{amount}</p>
    </div>
  )
}
