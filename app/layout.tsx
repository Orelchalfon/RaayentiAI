import LazyNavigation from "@/components/Navigation/LazyClient";
import { I18nProvider } from "@/locales/I18nProvider";
import { t } from "@/locales/i18n";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: t("meta.title"),
  description: t("meta.description"),
  icons: {
    icon: "./favicon.ico",
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
          <I18nProvider initialLocale={"en"}>
            <Suspense fallback={<div className='h-14' />}>
              <LazyNavigation />
            </Suspense>
            {children}
          </I18nProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
