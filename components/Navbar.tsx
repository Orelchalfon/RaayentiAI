'use client';
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
type LinkType = { label: string; href: string }
const links: LinkType[] = [
    {
        label: "Home",
        href: "/"
    },
    { label: "Learning Companions", href: "/companions" },
    { label: "My Journy", href: "/my-journey" },
    { label: "Sign In", href: "/sign-in" },

]
const Navbar = () => {
    const path = usePathname();

    return <nav className="navbar"><Link href={"/"}>
        <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
        </div>
    </Link>
        <ul className="flex items-center gap-8">
            {links.map((link) => (
                <li key={link.label} className={cn("hover:text-primary", path === link.href && "text-primary")}>
                    <Link href={link.href} >{link.label}</Link>
                </li>
            ))}
        </ul>
    </nav>;
};

export default Navbar;
