import { Inter, Roboto } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({subsets: ['latin'], weight: '400'})
export const metadata = {
  title: "Whisperads",
  description: "Ads on whatsapp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.className}`}>{children}</body>
    </html>
  )
}

