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
      className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] xl:h-[750px] overflow-visible mt-20"
      style={{
        background: "linear-gradient(270deg, rgba(255, 255, 255, 0.1) 15%, #7B00E0 81%), url(/Banner_Section.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="relative z-20 container mx-auto h-full flex pt-8 md:pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full mt-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white mb-4 sm:mb-6" style={{ lineHeight: '5.1rem' }}>
            Your Trusted Partner in Medical & Hospital Supplies
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6 sm:mb-8 leading-relaxed">
            Delivering high-quality medicines, surgical products, and hospital furniture with reliability, transparency, and competitive pricing.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative w-full max-w-xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 sm:h-12 md:h-14 rounded-full bg-white/95 text-gray-900 placeholder:text-gray-500 pl-4 pr-12 sm:pr-14 text-sm sm:text-base focus:bg-white"
              />
              <button
                type="submit"
                className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-[#7B00E0] hover:bg-[#6A00C7] text-white flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

