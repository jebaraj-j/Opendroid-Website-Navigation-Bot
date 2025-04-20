"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const categories = [
  { name: "Laptops", href: "/category/laptops" },
  { name: "Smartphones", href: "/category/smartphones" },
  { name: "Audio", href: "/category/audio" },
  { name: "Accessories", href: "/category/accessories" },
  { name: "Smart Home", href: "/category/smart-home" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative z-10">
      <nav className="container-custom py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-wider">
              TECH GUIDE
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-gray-300">
              HOME
            </Link>
            <Link href="/products" className="hover:text-gray-300">
              PRODUCTS
            </Link>
            <Link href="/categories" className="hover:text-gray-300">
              CATEGORIES
            </Link>
            <Link href="/deals" className="hover:text-gray-300">
              DEALS
            </Link>
            <Link href="/support" className="hover:text-gray-300">
              SUPPORT
            </Link>
          </div>

          <div className="hidden md:block">
            <Link href="/contact" className="border border-gray-400 px-4 py-2 hover:bg-gray-800 transition-colors">
              Contact Sales
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
              <Link href="/" className="block px-3 py-2 hover:bg-gray-800" onClick={() => setMobileMenuOpen(false)}>
                HOME
              </Link>
              <Link
                href="/products"
                className="block px-3 py-2 hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                PRODUCTS
              </Link>
              <Link
                href="/categories"
                className="block px-3 py-2 hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                CATEGORIES
              </Link>
              <Link
                href="/deals"
                className="block px-3 py-2 hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                DEALS
              </Link>
              <Link
                href="/support"
                className="block px-3 py-2 hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                SUPPORT
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT SALES
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
