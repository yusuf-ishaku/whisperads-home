"use client";

import React from 'react'
import { ChevronRight, User, Settings, HelpCircle, Phone, Shield, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Profile() {
  const router = useRouter();
  
  const menuItems = [
    { icon: User, label: 'Account', hasChevron: true },
    { icon: Settings, label: 'Preferences', hasChevron: true },
    { icon: HelpCircle, label: 'Help & Support', hasChevron: true },
    { icon: Phone, label: 'Contact us', hasChevron: true },
    { icon: Shield, label: 'Terms & Privacy Policy', hasChevron: true }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    toast.success('Logged out successfully');
    
    router.push('/');
  };

  return (
    <div className="max-w-full mx-auto bg-white min-h-screen">

      {/* Header */}
      <div className="bg-primary px-4 pt-4 pb-20 relative rounded-b-[3rem]">
        <h1 className="text-white text-lg font-medium">My Profile</h1>
      </div>

      {/* Profile Avatar - Overlapping the green background */}
      <div className="flex justify-center -mt-8 relative z-20 mb-4">
        <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white mx-4 -mt-8 rounded-lg p-6 pt-8 relative z-10">

        {/* Profile Info */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Abul Bashar</h2>
          <p className="text-sm text-gray-600">
            Abdsamad • Bangladesh <span className="text-green-500">+8801 955 014</span>
          </p>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900 text-sm font-medium">{item.label}</span>
              </div>
              {item.hasChevron && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>

        <div>
          <button 
            onClick={handleLogout}
            className="w-full text-center py-3 px-6 font-bold bg-primary text-white my-5 rounded hover:bg-primary/90 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  )
}

export default Profile