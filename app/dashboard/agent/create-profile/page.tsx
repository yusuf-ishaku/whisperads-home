"use client"
import { useState, useEffect } from "react"
import FirstScreen from "@/components/ProfileFirstScreen"
import SecondScreen from "@/components/ProfileSecondScreen"
import SuccessModal from "@/components/ProfileSuccessModal"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Home() {
  const router = useRouter()
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
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentScreen("second")
  }

  // const handleSecondScreenSubmit = async (data: any) => {
  //   setIsSubmitting(true)
  //   setError("")

  //   try {
  //     const token = localStorage.getItem("accessToken")
  //     const userId = formData.userId

  //     if (!token) {
  //       throw new Error("Please login first")
  //     }
  //     if (!userId) {
  //       throw new Error("User ID not found")
  //     }

  //     const response = await fetch("/api/profile", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         userId,
  //         gender: formData.gender,
  //         location: data.location,
  //         ageRange: formData.age,
  //         statusViewCount: data.statusViewCount,
  //         // Add other required fields here
  //       })
  //     })

  //     if (!response.ok) {
  //       const errorData = await response.json()
  //       throw new Error(errorData.message || "Failed to create profile")
  //     }

  //     // Update user profile complete status
  //     const userData = localStorage.getItem("user")
  //     if (userData) {
  //       const user = JSON.parse(userData)
  //       localStorage.setItem("user", JSON.stringify({
  //         ...user,
  //         profileComplete: true
  //       }))
  //     }

  //     setCurrentScreen("success")
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "An error occurred")
  //     console.error("Profile submission error:", err)
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

 const handleSecondScreenSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError("")

    try {
      // Update user profile complete status
      const userData = localStorage.getItem("user")
      if (userData) {
        const user = JSON.parse(userData)
        const updatedUser = {
          ...user,
          profileComplete: true,
          profile: {
            whatsappNumber: formData.whatsappNumber,
            gender: formData.gender,
            age: formData.age,
            location: data.location,
            statusViewCount: data.statusViewCount
          }
        }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        
        // Also update the token to include profile completion info
        // This simulates what the backend would do
        const token = localStorage.getItem("accessToken")
        if (token) {
          // In a real app, the backend would issue a new token with updated claims
          // For simulation, we'll just store a flag
          localStorage.setItem('hasProfile', 'true')
        }
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