import Navigation from "@/components/Navigation";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tutor AI",
  description: "Real-time AI Tutor Platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
          <Navigation />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
