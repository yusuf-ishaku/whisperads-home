import type React from "react"
import { Home, FileText, Bell, User } from "lucide-react"

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 max-w-[400px] mx-auto">
      <NavItem icon={<Home className="h-5 w-5" />} label="Dashboard" active />
      <NavItem icon={<FileText className="h-5 w-5" />} label="Report" />
      <NavItem icon={<Bell className="h-5 w-5" />} label="Notification" />
      <NavItem icon={<User className="h-5 w-5" />} label="Profile" />
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={`${active ? "text-primary" : "text-gray-500"}`}>{icon}</div>
      <span className={`text-xs ${active ? "text-primary" : "text-gray-500"}`}>{label}</span>
    </div>
  )
}
