"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { listCategories, mediaUrl, type Category } from "@/lib/api"


export function OurProducts() {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    let mounted = true
    listCategories()
      .then((data) => {
        if (!mounted) return
        setCategories(data)
      })
      .catch((e) => {
        if (!mounted) return
        setError(e?.message || "Failed to load categories")
        setCategories([])
      })
    return () => {
      mounted = false
    }
  }, [])

  const gridItems = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories
        .filter((c) => {
          // Support both old (image) and new (images) format
          const hasImage = (c.images && c.images.length > 0) || c.image
          return hasImage && mediaUrl(c.images?.[0] || c.image)
        })
        .map((c) => ({
          key: c._id,
          name: c.name,
          image: mediaUrl(c.images?.[0] || c.image)!,
          href: `/products/${c._id}`,
        }))
    }
    return []
  }, [categories])

  return (
    <section id="product" className="">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-6 sm:mb-8 md:mb-12 flex flex-col items-center text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="">Our</span>{" "}
            <span className="text-[#7B00E0] relative">
              Products
              <span
                className="absolute bottom-[-9px] sm:bottom-[-14px] left-0 h-[3px] sm:h-[4px] md:h-[5px] bg-[#7B00E0]"
                style={{ width: '60%' }}
              />
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-4xl leading-relaxed mt-4 sm:mt-6">
            Explore our wide range of certified medical instruments, surgical equipment, and pharmaceutical products designed to meet hospital and clinical standards.
          </p>
        </div>

        {/* Products Grid */}
        {categories === null ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-300 p-6 block"
              >
                <div className="relative w-full h-[200px] md:h-[250px] bg-gray-100 rounded-lg overflow-hidden animate-pulse">
                  <div className="w-full h-full bg-gray-200"></div>
                </div>
                <div className="p-4 md:p-5 relative">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="absolute bottom-4 right-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {gridItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-shadow cursor-pointer group border border-gray-300 p-3 sm:p-4 md:p-6 block"
              >
                <div className="relative w-full h-[140px] sm:h-[160px] md:h-[200px] lg:h-[250px] bg-gray-100 rounded-lg overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="p-2 sm:p-3 md:p-4 lg:p-5 relative">
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-2 pr-8 sm:pr-10 md:pr-12 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 flex items-center justify-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-[#7B00E0] flex items-center justify-center transition-transform group-hover:scale-110">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Explore All Products Button */}
        <div className="flex justify-center mt-8 md:mt-12">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-3 bg-[#7B00E0] text-white font-medium text-lg px-4 py-3 rounded-lg hover:bg-[#6A00C7] transition-colors"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '24px',
              lineHeight: '36px',
              padding: '12px 18px',
              gap: '12px',
              width: '272px',
              height: '60px',
              borderRadius: '8px'
            }}
          >
            Explore All Products
          </Link>
        </div>

        {error ? (
          <p className="text-sm text-red-600 mt-4 text-center">{error}</p>
        ) : categories && categories.length === 0 ? (
          <p className="text-sm text-gray-500 mt-4 text-center">
            No categories yet. Add them from{" "}
            <Link href="/admin" className="text-[#7B00E0] underline">
              Admin
            </Link>
            .
          </p>
        ) : null}
      </div>
    </section>
  )
}

