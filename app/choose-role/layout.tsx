import type React from "react" // Import React
export const metadata = {
  title: "Choose Role | Whisperads",
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

