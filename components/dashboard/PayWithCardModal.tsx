"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";

export default function PayWithCardModal() {
  const [amount, setAmount] = useState("");

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="max-w-md w-full bg-white rounded-[0.5rem] p-4 mx-4 ">
        <div className="p-5 space-y-6 mb-7">
          <div className="flex items-center">
            <button className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold">Pay with card</h2>
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

            <button className="w-full bg-primary hover:bg-primary text-white font-medium py-3 px-4 rounded-[0.5rem] transition duration-150 ease-in-out ">
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
