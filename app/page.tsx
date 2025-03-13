"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SplashScreen() {
  const router = useRouter()
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const timer = setTimeout(() => {
      router.push("/choose-role")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div
        className={`transform transition-all duration-1000 ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-primary text-xl font-bold">w</span>
          </div>
          <h1 className="text-white text-2xl font-bold">WhisperAds</h1>
        </div>
      </div>
    </div>
  )
}

