import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/context/SessionContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { ToastContainer } from "@/components/ui/ToastContainer";

export const metadata: Metadata = {
  title: "Intelligence Factory — Data Ops Control Tower",
  description: "Human demonstration-data collection operational monitoring and QA review platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A0B0D] text-[#E8E9EB] min-h-screen flex antialiased selection:bg-amber-500/30 selection:text-amber-200">
        <SessionProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            {children}
          </div>
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  );
}
