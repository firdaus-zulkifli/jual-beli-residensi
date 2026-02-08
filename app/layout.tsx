import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "JualBeli Residensi Pauh",
  description: "Community Marketplace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Add suppressHydrationWarning here to stop the red error screen
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive" 
        />
        {children}
      </body>
    </html>
  );
}