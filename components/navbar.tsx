"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Products", href: "/products" },
  { name: "How It Works", href: "#fulfillment" },
  { name: "Contact Us", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-500 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="DI Wholesale Logo"
                width={150}
                height={70}
                className="h-12 md:h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              item.href.startsWith("#") ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[rgba(30,30,30,0.45)] hover:text-[#7B00E0] transition-colors font-medium text-sm lg:text-base"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors font-medium text-sm lg:text-base ${
                    isActive(item.href) ? "text-[#7B00E0]" : "text-[rgba(30,30,30,0.45)] hover:text-[#7B00E0]"
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-4 border-t border-gray-200 mt-2" : "max-h-0"
        }`}>
          <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => (
                item.href.startsWith("#") ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-[rgba(30,30,30,0.45)] hover:text-[#7B00E0] transition-colors font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors font-medium py-2 ${
                      isActive(item.href) ? "text-[#7B00E0]" : "text-[rgba(30,30,30,0.45)] hover:text-[#7B00E0]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

