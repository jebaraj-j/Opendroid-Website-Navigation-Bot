"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "RESEARCH", href: "/research" },
  { name: "MAGAZINE", href: "/magazine" },
  { name: "CAREERS", href: "/careers" },
  { name: "OUR TEAM", href: "/team" },
  { name: "ACCESS", href: "/access" },
  { name: "SUPPORT", href: "/support" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/90 backdrop-blur-sm shadow-md" : "bg-transparent"}`}
    >
      <nav className="container-custom py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-wider">
              OPEN DROIDS
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-gray-300">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/contact" className="border border-gray-400 px-4 py-2 hover:bg-gray-800 transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button type="button" className="text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block px-3 py-2 hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT US
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
