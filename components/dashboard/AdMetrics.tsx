import { cn } from "@/lib/utils"

interface AdMetricsProps {
  value: string
  label: string
  className?: string
}

export default function AdMetrics({ value, label, className }: AdMetricsProps) {
  return (
    <div className={cn("text-center py-1", className)}>
      <p className="text-sm font-medium">{value}</p>
      <p className="text-[10px] text-gray-500 mt-0.5">{label}</p>
    </div>
  )
}
