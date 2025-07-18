"use client"

import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface AdSuccessModalProps {
  onClose: () => void
}

export default function AdProfileSuccessModal({ onClose }: AdSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="text-white w-10 h-10" />
          </div>

          <h2 className="text-xl font-semibold mb-2">Successful</h2>

          <p className="text-gray-600 mb-8">Your profile set up was successful and is under review.</p>

          <Link
            href="/dashboard/advertiser"
            onClick={onClose}
            className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}
