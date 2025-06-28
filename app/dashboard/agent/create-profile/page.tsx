"use client"
import { useState, useEffect } from "react"
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
    userId: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Initialize user data from session storage
  useEffect(() => {
    const userData = sessionStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setFormData(prev => ({
        ...prev,
        userId: user.id
      }))
    }
  }, [])

  const handleFirstScreenSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentScreen("second")
  }

  const handleSecondScreenSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError("")

    try {
      const token = sessionStorage.getItem("token")
      const userId = formData.userId

      if (!token) {
        throw new Error("Please login first")
      }
      if (!userId) {
        throw new Error("User ID not found")
      }

      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          gender: formData.gender,
          location: data.location,
          ageRange: formData.age,
          statusViewCount: data.statusViewCount,
          // Add other required fields here
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create profile")
      }

      // Update user profile complete status
      const userData = sessionStorage.getItem("user")
      if (userData) {
        const user = JSON.parse(userData)
        sessionStorage.setItem("user", JSON.stringify({
          ...user,
          profileComplete: true
        }))
      }

      setCurrentScreen("success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Profile submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContinueAfterSuccess = () => {
    // Redirect to dashboard after successful profile creation
    const userData = sessionStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      window.location.href = `/dashboard/${user.role}`
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {currentScreen === "first" && <FirstScreen onSubmit={handleFirstScreenSubmit} />}
        {currentScreen === "second" && (
          <SecondScreen 
            onSubmit={handleSecondScreenSubmit} 
            isSubmitting={isSubmitting} 
            error={error}
          />
        )}
        {currentScreen === "success" && <SuccessModal onContinue={handleContinueAfterSuccess} />}
      </div>
    </main>
  )
}