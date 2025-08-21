import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

// METADATA - MUST BE EXPORTED FROM SERVER COMPONENT
export const metadata = {
  title: "Whisperads",
  description: "Ads on whatsapp",
};

// CLIENT-SIDE PROVIDERS (as a separate component)
function ClientProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

// LAYOUT COMPONENT (server component by default)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.className}`}>
        <ClientProviders>{children}</ClientProviders>
        <Toaster position="top-right" />
        
      </body>
    </html>
  );
}
