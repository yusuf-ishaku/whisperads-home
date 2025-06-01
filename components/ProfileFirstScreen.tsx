"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"

interface FirstScreenProps {
  onSubmit: (data: {
    whatsappNumber: string
    gender: string
    age: string
  }) => void
}

export default function ProfileFirstScreen({ onSubmit }: FirstScreenProps) {
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ whatsappNumber, gender, age })
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
        <div className="flex mx-auto justify-center mb-6 py-4">
          <div className="relative flex w-full justify-center ">
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
              <label htmlFor="whatsapp" className="block text-sm font-semibold mb-1">
                WhatsApp Number
              </label>
              <input
                id="whatsapp"
                type="text"
                placeholder="Enter WhatsApp Number"
                className="w-full text-sm p-2 border border-gray-300 rounded-[0.5rem]"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-semibold mb-1">
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  className="w-full p-2 text-sm border border-gray-300 rounded-[0.5rem] appearance-none bg-white text-gray-400"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-semibold mb-1">
                Age
              </label>
              <input
                id="age"
                type="text"
                placeholder="Select your date of birth"
                className="w-full text-sm p-2 border border-gray-300 rounded-[0.5rem]"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-[0.5rem] mt-8 font-medium hover:bg-green-700 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
