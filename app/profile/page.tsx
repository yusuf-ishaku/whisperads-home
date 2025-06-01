"use client"

import { useState } from "react"
import FirstScreen from "@/components/ProfileFirstScreen"
import SecondScreen from "@/components/ProfileSecondScreen"
import SuccessModal from "@/components/ProfileSuccessModal"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"first" | "second" | "success">("first")
  const [formData, setFormData] = useState({
    whatsappNumber: "",
    gender: "",
    age: "",
    location: "",
    statusViewCount: "",
    screenshot: null,
  })

  const handleFirstScreenSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentScreen("second")
  }

  const handleSecondScreenSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentScreen("success")
  }

  const handleContinueAfterSuccess = () => {
    setFormData({
      whatsappNumber: "",
      gender: "",
      age: "",
      location: "",
      statusViewCount: "",
      screenshot: null,
    })
    setCurrentScreen("first")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {currentScreen === "first" && <FirstScreen onSubmit={handleFirstScreenSubmit} />}
        {currentScreen === "second" && <SecondScreen onSubmit={handleSecondScreenSubmit} />}
        {currentScreen === "success" && <SuccessModal onContinue={handleContinueAfterSuccess} />}
      </div>
    </main>
  )
}
