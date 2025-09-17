"use client"
import { useState, useEffect } from "react"
import FirstScreen from "@/components/ProfileFirstScreen"
import SecondScreen from "@/components/ProfileSecondScreen"
import SuccessModal from "@/components/ProfileSuccessModal"
import { toast } from "sonner"

export default function ProfileCreationPage() {
  const [currentScreen, setCurrentScreen] = useState<"first" | "second" | "success">("first")
  const [formData, setFormData] = useState({
    whatsappNumber: "",
    gender: "",
    ageRange: "",
    location: "",
    bio: "",
    statusViewCount: "",
    tags: [] as string[],
    screenshot: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Initialize user data from local storage
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData && userData !== "undefined") {
      const user = JSON.parse(userData)
      setFormData(prev => ({
        ...prev,
        userId: user.id
      }))
    }
  }, [])

  const handleFirstScreenSubmit = (data: any) => {
    setFormData((prev) => ({ 
      ...prev, 
      whatsappNumber: data.whatsappNumber,
      gender: data.gender,
      ageRange: data.age
    }))
    setCurrentScreen("second")
  }

  const handleSecondScreenSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError("")

    try {
      const token = localStorage.getItem("accessToken")
      const userData = localStorage.getItem("user")
      
      if (!token) {
        throw new Error("Please login first")
      }
      
      if (!userData) {
        throw new Error("User data not found")
      }
      
      const user = JSON.parse(userData)
      
      // Prepare the request body according to the API specification
      const requestBody = {
        gender: formData.gender,
        location: data.location,
        ageRange: formData.ageRange,
        bio: data.bio || "", // You might want to add a bio field to your form
        statusViewCount: data.statusViewCount.toString(), 
        tags: [] // You might want to add tags collection to your form
      }

          console.log("Sending payload:", requestBody)

      const response = await fetch(
        "https://whisperads-api-production.up.railway.app/user/targeting-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(requestBody)
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        console.error("API Error:", errorData)
        throw new Error(errorData.message || "Failed to create profile")
      }

      const result = await response.json()
      console.log("Profile created successfully:", result)

      // Update user profile complete status
      localStorage.setItem("user", JSON.stringify({
        ...user,
        profileComplete: true
      }))

      setCurrentScreen("success")
      toast.success("Profile created successfully!")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      toast.error(errorMessage)
      console.error("Profile submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContinueAfterSuccess = () => {
    // Redirect to dashboard after successful profile creation
    const userData = localStorage.getItem("user")
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