"use client";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "./links";
import { useLanguage } from "@/locales/I18nProvider";
import LanguageSwitcher from "../LanguageSwitcher";

const DesktopNavbar = () => {
  const path = usePathname();
  const { t } = useLanguage();

  return (
    <nav className='navbar hidden md:flex'>
      <Link href={'/'}>
        <div className='flex items-center gap-2 cursor-pointer'>
          <Image src='/icons/logo.jpg' alt='logo' width={46} height={44} className={cn("mix-blend-multiply")} />
        </div>
      </Link>
      <ul className='flex items-center gap-8'>
        {links.map((link) => {
          const label = link.href === "/"
            ? t("nav.home")
            : link.href === "/companions"
            ? t("nav.companions")
            : link.href === "/my-journey"
            ? t("nav.myJourney")
            : link.label;
          return (
            <li
              key={link.label}
              className={cn(
                "hover:text-primary",
                path === link.href && "text-primary"
              )}>
              <Link href={link.href}>{label}</Link>
            </li>
          );
        })}
        <li>
          <LanguageSwitcher />
        </li>
        <li>
          <SignedOut>
            <SignInButton>
              <button className='btn-signin '>{t("nav.signIn")}</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
          </SignedIn>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNavbar;


