"use client";
import { cn } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
type LinkType = { label: string; href: string };
const links: LinkType[] = [
  {
    label: "Home",
    href: "/",
  },
  { label: "Learning Companions", href: "/companions" },
  { label: "My Journy", href: "/my-journey" },
];
const Navbar = () => {
  const path = usePathname();

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

export default Navbar;
