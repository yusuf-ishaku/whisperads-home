import Image from "next/image"

interface NotificationItemProps {
  title: string
  message: string
  time: string
}

export default function NotificationItem({ title, message, time }: NotificationItemProps) {
  return (
    <div className="flex items-start gap-3 p-3">
      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        <Image
          src="/placeholder.svg?height=32&width=32"
          alt="User avatar"
          width={32}
          height={32}
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xs font-medium">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{message}</p>
      </div>
      <div className="text-[10px] text-gray-400 whitespace-nowrap pl-2">{time}</div>
    </div>
  )
}
