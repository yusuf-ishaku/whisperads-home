"use client"

import { CheckCircle } from "lucide-react"

interface SuccessModalProps {
  onContinue: () => void
}

export default function ProfileSuccessModal({ onContinue }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="text-white w-10 h-10" />
          </div>

          <h2 className="text-xl font-semibold mb-2">Successful</h2>

          <p className="text-gray-600 mb-8">Your agent profile set up was successful and is under reviewed.</p>

          <button
            onClick={onContinue}
            className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
