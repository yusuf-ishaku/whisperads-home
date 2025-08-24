"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import AdProfileSuccessModal from "./AdProfileSuccessModal";

interface AdFirstScreenProps {
    onSubmit: (data: {
        companyName: string
        phoneNumber: string
        industry: string
    }) => void
}

export default function AdProfileFirstScreen({ onSubmit }: AdFirstScreenProps) {
    const [companyName, setCompanyName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [industry, setIndustry] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

       const industryOptions = [
        "Select Industry",
        "Technology",
        "Healthcare",
        "Finance",
        "Retail",
        "Education",
        "Manufacturing",
        "Real Estate",
        "Hospitality",
        "Entertainment",
        "Transportation",
        "Energy",
        "Agriculture",
        "Construction",
        "Telecommunications",
        "Marketing & Advertising",
        "Non-profit",
        "Government",
        "Other"
    ];

    // Check form validity whenever any field changes
    useEffect(() => {
        setIsFormValid(
             companyName.trim() !== "" && 
            phoneNumber.trim() !== "" && 
            industry.trim() !== "" &&
            industry !== "Select Industry"
        )
    }, [companyName, phoneNumber, industry])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isFormValid) {
            onSubmit({ companyName, phoneNumber, industry })
            setShowSuccess(true)
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
                <h2 className="text-lg font-semibold mb-1">Set Up Your Advertiser Account</h2>
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
                            <label htmlFor="company" className="block text-sm font-semibold mb-1">
                                Company/Brand Name
                            </label>
                            <input
                                id="company"
                                type="text"
                                placeholder="Enter Business Name"
                                className="w-full text-sm p-2 border border-gray-300 rounded-[0.5rem]"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold mb-1">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="text"
                                placeholder="Enter Phone Number"
                                className="w-full text-sm p-2 border border-gray-300 rounded-[0.5rem]"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="industry" className="block text-sm font-semibold mb-1">
                                Industry/Niche
                            </label>
                             <select
                                id="industry"
                                className="w-full text-sm p-2 border border-gray-300 rounded-[0.5rem] bg-white"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                required
                            >
                                {industryOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white py-3 rounded-[0.5rem] mt-8 font-medium transition-colors ${
                            isFormValid 
                                ? "bg-primary hover:bg-green-700" 
                                : "bg-[#00944466] cursor-not-allowed"
                        }`}
                        disabled={!isFormValid}
                    >
                        Continue
                    </button>
                </form>
            </div>

            {showSuccess && (
                <AdProfileSuccessModal onClose={() => setShowSuccess(false)} />
            )}
        </div>
    )
}