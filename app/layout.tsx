import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "My MVP App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* The Telegram Script - Essential! */}
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive" 
        />
        {children}
      </body>
    </html>
  );
}