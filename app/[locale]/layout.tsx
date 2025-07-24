import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tutor AI",
  description: "Real-time AI Tutor Platform",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'he')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            {children}
          </NextIntlClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}