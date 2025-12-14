"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function BannerSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", searchQuery)
  }

  return (
    <section 
      className="relative w-full h-[600px] md:h-[700px] overflow-visible"
      style={{
        background: "linear-gradient(270deg, rgba(255, 255, 255, 0.1) 15%, #7B00E0 81%), url(/Banner_Section.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="relative z-20 container mx-auto h-full flex items-center pt-16 md:pt-20">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Trusted Partner in Medical & Hospital Supplies
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Delivering high-quality medicines, surgical products, and hospital furniture with reliability, transparency, and competitive pricing.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 rounded-full md:h-14 bg-white/95 text-gray-900 placeholder:text-gray-500 pl-4 pr-14 text-base focus:bg-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#7B00E0] hover:bg-[#6A00C7] text-white flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

