"use client";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "./links";

const DesktopNavbar = () => {
  const path = usePathname();

  return (
    <nav className='navbar hidden md:flex'>
      <Link href={'/'}>
        <div className='flex items-center gap-2 cursor-pointer'>
          <Image src='/icons/logo.jpg' alt='logo' width={46} height={44} />
        </div>
      </Link>
      <ul className='flex items-center gap-8'>
        {links.map((link) => (
          <li
            key={link.label}
            className={cn(
              "hover:text-primary",
              path === link.href && "text-primary"
            )}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
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

export default DesktopNavbar;


