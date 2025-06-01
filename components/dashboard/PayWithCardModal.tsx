"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";
import { fundWallet } from "@/services/wallet";
import FundWalletFailureModal from "./FundWalletFailureModal";
import FundWalletSuccessModal from "./FundWalletSuccessModal";
// import BankCardModal from "./BankCardModal";

interface PayWithCardModalProps {
  onClose: () => void;
  userId: string;
  token: string;
  userEmail: string;
}

export default function PayWithCardModal({
  onClose,
  userId,
  token,
  userEmail,
}: PayWithCardModalProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  // const [showBankCardModal, setShowBankCardModal] = useState(false);

  const handlePayment = async () => {
    if (!token) {
      setError("Authentication token is missing");
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      setError("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    setError("");
    // try {
    //   const response = await fundWallet(
    //     userId,
    //     amount,
    //     userEmail,
    //     window.location.origin,
    //     token
    //   );

    try {
      const response = await fetch(`/api/wallet/fund/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          email: userEmail,
          callbackUrl: `${window.location.origin}/dashboard/advertiser`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to initiate payment");
      }

      if (data.data?.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error("Authorization URL not received");
      }

      // if (response.status && response.data?.authorization_url) {
      //   window.location.href = response.data.authorization_url;
      // } else {
      //   setError(response.message || "Failed to initiate payment");
      // }
    } catch (err: any) {
      setError(
        err.message || "An error occurred while processing your payment"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="max-w-md w-full bg-white rounded-[0.5rem] p-4 mx-4 ">
        <div className="p-5 space-y-6 mb-7">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button className="mr-2">
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-lg font-semibold">Fund Wallet</h2>
            </div>
            <div>
              <button onClick={onClose}>&times;</button>
            </div>
          </div>

          <div className="space-y-7">
            <div>
              <label
                htmlFor="amount"
                className="block text-xs font-medium text-black mb-1"
              >
                Enter Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₦</span>
                </div>
                <input
                  type="text"
                  id="amount"
                  className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-[0.5rem] shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-xs"
                  placeholder="0.00 - 500,000.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <button
              className="w-full bg-primary hover:bg-primary text-white font-medium py-3 px-4 rounded-[0.5rem] transition duration-150 ease-in-out"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Fund"}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
