"use client";

import AdProfileFirstScreen from "@/components/AdProfileFirstScreen";
import React from "react";

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <AdProfileFirstScreen onSubmit={(data) => console.log(data)} />
      </div>
    </main> 
  );
}

export default page;
