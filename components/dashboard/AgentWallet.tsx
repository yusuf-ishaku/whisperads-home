"use client"

import React from "react";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link"

interface WithdrawalScreenProps {
  onConfirm: () => void
  amount: string
  setAmount: (value: string) => void
  accountNumber: string
  setAccountNumber: (value: string) => void
  balanceVisible: boolean
  setBalanceVisible: (value: boolean) => void
}

function AgentWallet({onConfirm,
  amount,
  setAmount,
  accountNumber,
  setAccountNumber,
  balanceVisible,
  setBalanceVisible,}: WithdrawalScreenProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm h-screen ">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center">
        <button className="mr-2">
          <Link href={"/agent/agent-dashboard"}>
          <ChevronLeft size={24} />
          </Link>
        </button>
        <h1 className="text-lg font-medium">Withdrawal</h1>
      </div>

      <div className="p-6 max-w-[400px] mx-auto">
        <div className="p-8 rounded-[1rem] bg-primary ">
       
            <div className="flex justify-between items-center">
              <div>
            <div className="flex items-center">
              <p className="text-xs text-white">Available Balance</p>
              <button onClick={() => setBalanceVisible(!balanceVisible)} className="ml-2 text-white">
                {balanceVisible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>
            <h2 className="text-xl font-bold text-white">{balanceVisible ? "N20,935" : "••••••"}</h2>
          </div>
              <button className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                View History
              </button>
          </div>
        </div>

        <form className="mt-10">
          <div className="space-y-6 py-3">
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium mb-1"
              >
                Withdraw Money
              </label>
              <input
                id="withdraw"
                type="text"
                placeholder="Enter 10 digit account number"
                className="w-full text-sm p-2 border border-gray-300 rounded-[0.5rem]"
              />
            </div>

            <div>
              <div className="relative">
                <select
                  id="gender"
                  className="w-full p-2 text-sm border border-gray-300 rounded-[0.5rem] appearance-none bg-white text-gray-400"
                >
                  <option value="" disabled>
                    Search bank
                  </option>
                  <option value="opay">Opay</option>
                  <option value="kuda">Kuda</option>
                  <option value="palmpay">Palmpay</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-1">
                Amount
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
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-[0.5rem] mt-8 font-medium hover:bg-green-700 transition-colors"
          >
            Confirm Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
}

export default AgentWallet;
