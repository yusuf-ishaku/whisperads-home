"use client";

import UserGreeting from "./UserGreeting";
import StatsSummary from "./StatsSummary";
import ActiveCampaigns from "./ActiveCampaigns";
import ActionButtons from "./ActionButtons";
import { useState, useEffect } from "react";
import StatusBar from "./StatusBar";
import BottomNavigation from "./BottomNavigation";
import AgentStats from "./AgentStats";
import AgentBottomNav from "./AgentBottomNav";
import AvailableCampaigns from "./AvailableCampaigns";

export default function AgentDashboard() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState("there");

  //   useEffect(() => {
  //     const storedToken = sessionStorage.getItem("token");
  //     if (storedToken) {
  //       setToken(storedToken);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     const fetchWallet = async () => {
  //       const user = JSON.parse(sessionStorage.getItem("user") || "null");

  //       if (!token || !user) return;

  //       try {
  //         const res = await fetch(`/api/wallet/${user.id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         if (!res.ok) throw new Error("Failed to fetch wallet");

  //         const data = await res.json();
  //         setWalletBalance(parseFloat(data.balance));

  //         if (user.name) {
  //           setUserName(user.name.split(" ")[0]);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching wallet:", error);
  //       }
  //     };

  //     fetchWallet();
  //   }, [token]);

  return (
    <>
      <StatusBar />

      <div className="p-4 flex flex-col gap-4  max-w-[400px] mx-auto h-screen overflow-y-auto">
        <UserGreeting name={"Agent"} />
        <AgentStats />
        <ActiveCampaigns />
        <AvailableCampaigns/>
      </div>
      <AgentBottomNav />
    </>
  );
}
