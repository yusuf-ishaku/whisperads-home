"use client"

import type React from "react"
import { useEffect, useState } from "react"
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
  const [verificationStep, setVerificationStep] = useState<"input" | "otp">("input")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

   useEffect(() => {
    if (verificationStep === "input") {
      setIsFormValid(validatePhoneNumber(whatsappNumber))
    } else {
      setIsFormValid(
        otp.length === 6 && 
        gender.trim() !== "" && 
        age.trim() !== ""
      )
    }
  }, [whatsappNumber, gender, age, otp, verificationStep])

  const validatePhoneNumber = (number: string): boolean => {
    // Basic validation for international format
    const regex = /^\+[1-9]\d{1,14}$/
    return regex.test(number)
  }

  const handleSendOtp = async () => {
    if (!validatePhoneNumber(whatsappNumber)) {
      setError("Please enter a valid WhatsApp number in international format (e.g., +1234567890)")
      return
    }

    setIsLoading(true)
    setError("")
    
    try {
      // In a real app, you would call your backend API here to send the OTP
      // For demo purposes, we'll simulate this with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      setVerificationStep("otp")
    } catch (err) {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError("OTP must be 6 digits")
      return
    }

    // In a real app, you would verify the OTP with your backend
    // For demo purposes, we'll assume any 6-digit code is valid
    onSubmit({ whatsappNumber, gender, age })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (verificationStep === "input") {
      handleSendOtp()
    } else {
      handleVerifyOtp()
    }
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
              {verificationStep === "input" ? (
                <>
                  <input
                    id="whatsapp"
                    type="text"
                    placeholder="Enter WhatsApp Number with country code (e.g., +1234567890)"
                    className="w-full text-sm p-2 border border-gray-300 rounded-[0.5rem]"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send a verification code via WhatsApp
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium">{whatsappNumber}</span>
                    <button 
                      type="button" 
                      className="ml-2 text-xs text-primary"
                      onClick={() => setVerificationStep("input")}
                    >
                      Change
                    </button>
                  </div>
                  <input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit verification code"
                    className="w-full text-sm p-2 border border-gray-300 rounded-[0.5rem]"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </>
              )}
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            {verificationStep === "otp" && (
              <>
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
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-[0.5rem] mt-8 font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              "Processing..."
            ) : verificationStep === "input" ? (
              "Send Verification Code"
            ) : (
              "Verify and Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}