"use client";

import { useState, useEffect } from "react";
import UserGreeting from "./UserGreeting";
import StatsSummary from "./StatsSummary";
import ActiveCampaigns from "./ActiveCampaigns";
import ActionButtons from "./ActionButtons";



export default function CampaignDashboard() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState("there");
  const [paymentStatus, setPaymentStatus] = useState<'idle'|'success'|'error'>('idle');
    const [user, setUser] = useState<any>(null);



  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
        const storedUser = sessionStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.name) {
        setUserName(parsedUser.name.split(" ")[0]);
      }
    }
  }, []);

    const fetchWallet = async () => {

          if (!token || !user?.id) return;

      try {
        const res = await fetch(`/api/wallet/fund/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch wallet");

        const data = await res.json();
        setWalletBalance(parseFloat(data.balance));
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
    };


 const verifyTransaction = async (reference: string) => {
    if (!token) throw new Error("Authentication required");
    
    try {
      const res = await fetch(`/api/wallet/verify/${reference}`, {
        headers: {
                    'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({
          amount: "",
          email: user.email,
          callbackUrl: `${window.location.origin}/dashboard/advertiser`
        })
      });

            if (!res.ok) throw new Error("Verification failed");

      return await res.json();
    } catch (error) {
      console.error("Verification error:", error);
      throw error;
    }
  };

    useEffect(() => {
    fetchWallet();
  }, [token, user?.id]);

   useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const reference = params.get('reference');
      
      if (!reference || !token) return;

      try {
        const result = await verifyTransaction(reference);
        
        if (result.status === 'success') {
          setPaymentStatus('success');
          await fetchWallet();
        } else {
          setPaymentStatus('error');
        }

        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
      } catch (error) {
        setPaymentStatus('error');
        console.error("Payment verification failed:", error);
      }
    };

    verifyPayment();
  }, [token]);

  return (
    <div className="p-4 flex flex-col gap-4  max-w-[400px] mx-auto h-screen overflow-y-auto">
        {paymentStatus === 'success' && (
        <div className="p-2 text-sm bg-green-100 text-green-800 rounded-md">
          Payment successful! Your wallet has been updated.
        </div>
      )}
      {paymentStatus === 'error' && (
        <div className="p-2 text-sm bg-red-100 text-red-800 rounded-md">
          Payment verification failed. Please contact support.
        </div>
      )}
      <UserGreeting name={userName} />
      <StatsSummary
        walletBalance={walletBalance}
        totalCampaigns={12}
        totalAdSpend={950000}
        totalImpressions={10500}
        statusViews={8000}
        clickThrough={2540}
        token={token}
        userId={user?.id || ''}
      userEmail={user?.email || ''}
      />
      <ActiveCampaigns />
      <ActionButtons />
    </div>
  );
}
