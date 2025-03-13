import type React from "react" // Import React
export const metadata = {
  title: "Signup | Whisperads",
  description: "Ads on whatsapp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <main>
    {children}
  </main>
  )
}

