"use client";
import { useState } from "react";


interface BankTransferModalProps {
  onClose: () => void;
  amount: string;
}

export default function BankAcctTransferModal({ onClose, amount }: BankTransferModalProps) {

   const handleMakeTransfer = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const user = JSON.parse(sessionStorage.getItem("user") || "null");

      if (!accessToken || !user) return;

    try {
      const res = await fetch(`/api/wallet/${user.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Funding failed:", data.message);
      } else {
        console.log("Funding successful:", data);
        onClose();
      }
    } catch (err) {
      console.error("Error funding wallet:", err);
    }
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="max-w-md w-full bg-white rounded-[0.5rem] shadow-md overflow-hidden py-6 p-4 mx-4">
        <div className="p-5 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <button onClick={onClose}>&times;</button>
            </div>
            <div className="text-right">
              <h2 className="text-base font-semibold">₦ {amount}</h2>
              <p className="text-gray-500 text-xs">Transaction breakdown</p>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-xs text-black text-center">
              Transfer to the account below to fund your wallet
            </p>

            <p className="font-medium text-center">GTBANK</p>

            <div className="bg-[#00944414] rounded-md p-3 flex items-center w-[200px] mx-auto text-center justify-center">
              <div className="bg-white rounded-md p-1 mr-2">
                <span className="text-primary">₦</span>
              </div>
              <span className="font-medium text-primary">234567891011</span>
            </div>

            <div className="text-center">
              <p className="text-xs text-black">WhisperAds</p>
            </div>

            <div className="text-center  text-xs text-black px-6">
              <p>
                This account is valid for 1 hour and can only be used for this
                transaction
              </p>
            </div>

            <button className="w-full bg-primary hover:bg-primary text-white font-medium py-3 px-4 rounded-[0.5rem] transition duration-150 ease-in-out mt-5"
            onClick={handleMakeTransfer}
            >
              I've paid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
