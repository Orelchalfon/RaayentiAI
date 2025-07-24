"use client";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from 'next-intl';
type LinkType = { labelKey: string; href: string };
const links: LinkType[] = [
  {
    labelKey: "navigation.home",
    href: "/",
  },
  { labelKey: "navigation.companions", href: "/companions" },
  { labelKey: "navigation.myJourney", href: "/my-journey" },
];
const Navbar = () => {
  const path = usePathname();
  const t = useTranslations();

  return (
    <nav className='navbar'>
      <Link href={"/"}>
        <div className='flex items-center gap-2 cursor-pointer'>
          <Image src='/images/logo.svg' alt='logo' width={46} height={44} />
        </div>
      </Link>
      <ul className='flex items-center gap-8'>
        {links.map((link) => (
          <li
            key={link.labelKey}
            className={cn(
              "hover:text-primary",
              path === link.href && "text-primary"
            )}>
            <Link href={link.href}>{t(link.labelKey)}</Link>
          </li>
        ))}
        <li>
          <LanguageSwitcher />
        </li>
        <li>
          <SignedOut>
            <SignInButton>
              <button className='btn-signin '>Sign In</button>
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

export default Navbar;
