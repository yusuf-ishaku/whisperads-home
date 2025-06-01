import BottomNavigation from '@/components/dashboard/BottomNavigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import Reports from '@/components/dashboard/Reports'
import React from 'react'

function page() {
  return (
    <div>
            <Reports/>
            <BottomNavigation />
    </div>
  )
}

export default page