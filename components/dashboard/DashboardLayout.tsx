import type { ReactNode } from "react"
import BottomNavigation from "./BottomNavigation"
import StatusBar from "./StatusBar"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col bg-white ">
      <StatusBar />
      <main className="flex-1 overflow-y-auto ">{children}</main>
      <BottomNavigation />
    </div>
  )
}
