"use client"

import { useState } from "react"

export default function CardPaymentDetailsModal() {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [saveCard, setSaveCard] = useState(false)

  return (
   <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
     <div className="max-w-md w-full bg-white rounded-[0.5rem] shadow-md overflow-hidden py-6 p-4 mx-4">
      <div className="px-5 space-y-6">
        <div className="text-right">
          <h2 className="text-base font-semibold">₦ 5000</h2>
          <p className="text-gray-500 text-xs">Transaction breakdown</p>
        </div>

        <div className="space-y-5">
          <p className="text-xs text-black  text-center">Enter your card details to fund your wallet</p>

          <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-black mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              className="block w-full px-3 py-2 border border-gray-300 rounded-[0.5rem] shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-black mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="expiry"
                className="block w-full px-3 py-2 border border-gray-300 rounded-[0.5rem] shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="06/24"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-black mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="block w-full px-3 py-2 border border-gray-300 rounded-[0.5rem] shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="save-card"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
            />
            <label htmlFor="save-card" className="ml-2 block text-xs text-gray-700">
              Save card
            </label>
          </div>

          <button className="w-full bg-primary hover:bg-primary text-white font-medium py-3 px-4 rounded-[0.5rem] transition duration-150 ease-in-out my-3">
            Pay ₦5000
          </button>
        </div>
      </div>
    </div>
   </div>
  )
}
