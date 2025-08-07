"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"

interface SecondScreenProps {
    onSubmit: (data: {
    location: string
    statusViewCount: string
    screenshot: File | null
  }) => void
  isSubmitting: boolean
  error: string
}

export default function ProfileSecondScreen({ onSubmit, isSubmitting, error  }: SecondScreenProps) {
  const [location, setLocation] = useState("")
  const [statusViewCount, setStatusViewCount] = useState("")
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [fileName, setFileName] = useState("No file chosen")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ location, statusViewCount, screenshot })
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm h-screen">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center">
        <button className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Profile Set Up</h1>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-semibold mb-1">Set Up Your Agent Account</h2>
        <p className="text-sm text-gray-500 mb-6">Get started with advertising on your status</p>

        {/* Illustration */}
        <div className="flex justify-center mb-6 ">
          <div className="relative w-full flex justify-center">
            <Image
              src="/profile-account.png"
              alt="Agent illustration"
              width={261}
              height={178}
              className="object-contain"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-3">
            <div>
              <label htmlFor="location" className="block text-sm font-semibold mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="What's your location?"
                className="w-full p-2 text-sm border border-gray-300 rounded-[0.5rem]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="statusViewCount" className="block text-sm font-semibold mb-1">
                Status View Count Per Day
              </label>
              <input
                id="statusViewCount"
                type="text"
                placeholder="1000 Views"
                className="w-full p-2 border border-gray-300 text-sm rounded-[0.5rem]"
                value={statusViewCount}
                onChange={(e) => setStatusViewCount(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="screenshot" className="block text-sm font-semibold mb-1">
                Upload Screenshot of Your Status Views
              </label>
              <div className="flex">
                <label
                  htmlFor="screenshot-upload"
                  className="cursor-pointer bg-primary text-white  px-4 py-2 rounded-l-[0.5rem] hover:bg-green-700 transition-colors"
                >
                  Choose File
                </label>
                <div className="flex-1 border border-gray-300 border-l-0 rounded-r-[0.5rem] p-2 bg-white">
                  <span className="text-gray-500 text-sm">{fileName}</span>
                </div>
                <input
                  id="screenshot-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Max. file size 2MB. Supported formats: JPEG, PNG</p>
            </div>

            {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
          </div>

           <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-[0.5rem] mt-8 font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        </form>
      </div>
    </div>
  )
}
