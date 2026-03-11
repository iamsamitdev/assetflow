"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

import { usePathname } from 'next/navigation'
import { Menu, X } from "lucide-react"

import Link from "next/link"
import ThemeToggle from "@/components/ThemeToggle"

import useCounterStore from "@/stores/useCounterStore"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/service", label: "Service" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {

  const { count } = useCounterStore()

  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <NavigationMenu className="fixed top-0 left-0 z-50 flex flex-wrap justify-between items-center min-w-full px-4 py-2 
    bg-background/80 backdrop-blur-md border-b dark:bg-gray-800/80 dark:text-white">
        
        <Link href="/" className="text-lg font-bold">
          AssetFlow
        </Link>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Desktop nav */}
        <NavigationMenuItem className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <NavigationMenuLink key={link.href} asChild>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-primary font-semibold underline underline-offset-4"
                    : "text-muted-foreground hover:text-primary"
                }
              >
                {link.label}
              </Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuItem>

        <div className="hidden md:flex space-x-2">

          <div className="border rounded px-2 py-1">{count}</div>

          <ThemeToggle />

          <Button variant="outline" className="ml-auto" asChild>
            <Link href="/signin">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Register</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="w-full md:hidden flex flex-col gap-3 pt-4 pb-2 border-t mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-2 py-1 rounded-md text-sm ${
                  pathname === link.href
                    ? "text-primary font-semibold bg-emerald-50 dark:bg-emerald-950"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t">
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild>
                <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </div>
        )}

    </NavigationMenu>
  )
}
