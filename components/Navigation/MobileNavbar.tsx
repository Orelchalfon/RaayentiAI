"use client";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { links } from "./links";

const MobileNavbar = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className='navbar flex md:hidden'>
      <div className='flex items-center justify-between w-full'>
        <Link href={'/'} onClick={() => setOpen(false)}>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src='/icons/logo.jpg' alt='logo' width={40} height={38} />
          </div>
        </Link>
        <button
          aria-label='Toggle menu'
          className='p-2 rounded-md border border-transparent hover:border-foreground/20'
          onClick={() => setOpen(!open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {open && (
        <div className='fixed inset-0 z-40 bg-background/70 backdrop-blur-sm' onClick={() => setOpen(false)} />
      )}

      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-72 bg-background shadow-xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className='flex items-center justify-between px-4 py-3 border-b'>
          <Link href={'/'} onClick={() => setOpen(false)}>
            <div className='flex items-center gap-2 cursor-pointer'>
              <Image src='/icons/logo.jpg' alt='logo' width={40} height={38} />
            </div>
          </Link>
          <button aria-label='Close menu' className='p-2' onClick={() => setOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <ul className='flex flex-col gap-2 p-4'>
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  'block rounded-md px-3 py-2 hover:bg-muted',
                  path === link.href && 'text-primary'
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className='mt-2'>
            <SignedOut>
              <SignInButton>
                <button className='btn-signin w-full'>Sign In</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className='px-1'>
                <UserButton afterSignOutUrl='/' />
              </div>
            </SignedIn>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavbar;


