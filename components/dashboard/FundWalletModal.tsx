"use client";

import ArrowLeft from "../icons/ArrowLeft";
import Image from "next/image";
import PayWithCardModal from "./PayWithCardModal";
import { useState } from "react";
import BankAccountTransferModal from "./BankAcctTransferModal";
import PayWithCardTransfer from "./PayWithCardTransfer";

interface FundWalletModalProps {
  onClose?: () => void;
  onSelectOption?: (option: "card" | "bank") => void;
}

export default function FundWalletModal({
  onClose,
  onSelectOption,
}: FundWalletModalProps) {
  const [showPayWithCardModal, setShowPayWithCardModal] = useState(false);
  const [showPayWithCardTransfer, setShowPayWithCardTransfer] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md rounded-[0.5rem] py-6 p-4 mx-4">
        <div className="flex items-center mb-4">
          <button onClick={onClose} className="p-1 -ml-1 mr-3">
            <ArrowLeft />
          </button>
          <h1 className="text-lg font-semibold">Fund wallet</h1>
        </div>

        <p className="text-gray-500 mb-8">
          Fund your wallet with one of the options provided
        </p>

        <div className="space-y-5 mb-10">
          <button
            onClick={() => setShowPayWithCardModal(true)}
            className="w-full flex items-center justify-between px-5 py-3 border border-gray-300 rounded-[0.5rem] hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-600 text-xs">Pay with card</span>
            <div className="flex items-center space-x-2">
              <Image
                src="/cards.png"
                alt="Mastercard Visa card"
                width={48}
                height={24}
              />
            </div>
          </button>
          {showPayWithCardModal && (
            <PayWithCardModal onClose={() => setShowPayWithCardModal(false)} />
          )}

          <button
            onClick={() => setShowPayWithCardTransfer(true)}
            className="w-full flex items-center justify-between px-5 py-3 border border-gray-300 rounded-[0.5rem] hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-600 text-xs">Bank Transfer</span>
          </button>
          {showPayWithCardTransfer && (
            <PayWithCardTransfer
              onClose={() => setShowPayWithCardTransfer(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
