"use client";

import { useState } from "react";
import BankAcctTransferModal from "./BankAcctTransferModal";
useState;

interface BankCardModalProps {
  onClose: () => void;
  amount: string;
}

export default function BankCardModal({ onClose, amount }: BankCardModalProps) {
  const [showBankAcctModal, setShowBankAcctModal] = useState(false);

  const handleFundWallet = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user") || "null");

      if (!token || !user) return;

    try {
      const res = await fetch(`/api/wallet/${user.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
              Enter your card details to fund your wallet
            </p>

            <div className="py-2">
              <label className="block text-sm font-normal mb-1">
                Card Number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="0000 0000 0000 0000"
                className=" text-sm placeholder:text-black placeholder:font-normal focus:outline-none w-full font-medium border border-gray-300  rounded-[0.5rem] p-2 bg-white "
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="py-2">
                <label className="block text-sm font-normal mb-1">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  placeholder="06/24"
                  className=" text-sm p-1 placeholder:text-black placeholder:font-normal focus:outline-none w-full font-medium border border-gray-300  rounded-[0.5rem] py-2 bg-white"
                />
              </div>
              <div className="py-2">
                <label className="block text-sm font-normal mb-1">CVV</label>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  placeholder="042"
                  className=" text-sm p-1 placeholder:text-black placeholder:font-normal focus:outline-none w-full font-medium border border-gray-300  rounded-[0.5rem] py-2 bg-white"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" name="save card" id="saveCard" />
              <label
                htmlFor="saveCard"
                className="ml-1 text-xs text-gray-500 font-normal"
              >
                Save card
              </label>
            </div>
            <button
              className="w-full bg-primary hover:bg-primary text-white font-medium py-3 px-4 rounded-[0.5rem] transition duration-150 ease-in-out mt-5"
              onClick={handleFundWallet}
            >
              Pay ₦{amount}
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
}
