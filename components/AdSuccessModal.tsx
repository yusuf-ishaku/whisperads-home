"use client";

import React from 'react'
import { Check, X } from "lucide-react";

function AdSuccessModal() {
  return (
    <div className="max-w-md w-full flex rounded-lg shadow-md bg-white overflow-hidden">
      {/* Left Icon Section */}
      <div className="bg-green-100 flex items-center justify-center w-16">
        <div className="bg-white rounded-full p-1">
          <Check className="text-green-600 w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-sm font-semibold text-green-600">
              Ad Successfully Created
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Your ad has been successfully created and is ready for review and
              approval. See it in your dashboard.
            </p>
          </div>

          {/* Close Button */}
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdSuccessModal