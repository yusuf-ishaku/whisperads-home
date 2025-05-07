"use client"

import { ChevronLeft, Wifi, Battery, Signal } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface Campaign {
  id: number
  name: string
  description: string
  price: string
  days: number
  isActive?: boolean
  date?: string
}

export default function AllCampaigns() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: 1,
      name: "Summer Beach Wears",
      description: "Don't slack this summer, up your beach look with our...",
      price: "₦25000",
      days: 7,
      isActive: true,
    },
    {
      id: 2,
      name: "Face Vitamins Serum",
      description: "Boost your immunity with our first hand immunity booster...",
      price: "₦50000",
      days: 7,
      isActive: true,
    },
    {
      id: 3,
      name: "Stretch Mark Remover",
      description: "Never loose your confidence to stretch marks, get our...",
      price: "₦10000",
      days: 7,
      date: "14/02/24",
    },
    {
      id: 4,
      name: "Flower Vase",
      description: "Durable and portable vase for your flower...",
      price: "₦10000",
      days: 7,
      date: "14/02/24",
    },
    {
      id: 5,
      name: "Sneakers",
      description: "Speak loud and clear with our durable and stylish sneakers...",
      price: "₦10000",
      days: 7,
      date: "14/02/24",
    },
    {
      id: 6,
      name: "Stretch Mark Remover",
      description: "Never loose your confidence to stretch marks, get our...",
      price: "₦10000",
      days: 7,
      date: "14/02/24",
    },
    {
      id: 7,
      name: "Sneakers",
      description: "Speak loud and clear with our durable and stylish sneakers...",
      price: "₦10000",
      days: 7,
      date: "14/02/24",
    },
    {
      id: 8,
      name: "Stretch Mark Remover",
      description: "Never loose your confidence to...",
      price: "₦10000",
      days: 7,
    },
  ])

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-100">
      {/* Status Bar */}
      <div className="bg-primary text-white px-4 py-1 flex justify-between items-center text-xs">
      </div>

      {/* Header */}
      <div className="bg-primary text-white px-4 py-3 flex items-center">
        <Link href={"/dashboard/wallet"}>
          <ChevronLeft size={24} />
        </Link>
        <span className="ml-2 font-medium text-lg">All Campaigns</span>
      </div>

      {/* Campaign List */}
      <div className="flex-1 overflow-auto">
        {campaigns.map((campaign) => (
          <Link 
            key={campaign.id} 
            href={`/campaigns/${campaign.id}`}
            className="block border-b border-gray-200 px-7 py-5 h-28 bg-white"
          >
            <div className="flex">
              {/* Icon */}
              <div className="mr-3 mt-1">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 text-primary">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8H12.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                  <span className="font-medium text-gray-900">{campaign.price}</span>
                </div>

                <div className="flex justify-between items-start mt-1">
                  <div className="text-xs text-gray-500">Ad Running • {campaign.days} days</div>
                  {campaign.isActive && <span className="text-xs text-green-600">Active</span>}
                  {campaign.date && <span className="text-xs text-gray-500">{campaign.date}</span>}
                </div>

                <p className="text-xs text-gray-700 mt-1 pr-4">{campaign.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}