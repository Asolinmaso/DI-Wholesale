"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowUpRight, Bookmark, Filter, ShoppingCart, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { listCategories, mediaUrl, Category } from "@/lib/api"

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await listCategories()
        setCategories(data)
      } catch {
        console.error("Failed to load categories")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Banner */}
      <section
        className="relative pt-20 pb-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/Product_Banner.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent" />
        <div className="relative container mx-auto px-4 pt-8 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Medical Product <span className="text-[#7B00E0]">Categories</span>
          </h1>
          <p className="text-gray-600 max-w-xl mb-4">
            Browse our certified medical supplies by category. Designed for bulk and institutional procurement.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#7B00E0] font-medium">Explore products</span>
            <ArrowRight size={16} className="text-gray-400" />
            <span className="text-gray-400">add to cart</span>
            <ArrowRight size={16} className="text-gray-400" />
            <span className="text-gray-400">fill details enquire</span>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search Products, Categories, etc"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-full pl-4 pr-12 py-2.5 focus:outline-none focus:border-[#7B00E0]"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#7B00E0] text-white p-2 rounded-full">
              <Search size={18} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bookmark size={22} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={22} className="text-gray-600" />
            </button>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart size={22} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-[#7B00E0] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading categories...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No categories found</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((category) => (
              <Link
                key={category._id}
                href={`/products/${category.slug}`}
                className="p-3 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group border border-gray-100"
              >
                <div className="relative h-[260px] md:h-[320px] bg-gray-100 rounded-t-2xl overflow-hidden m-3 mr-3">
                  <Image
                    src={category.image ? mediaUrl(category.image) : "/our_products/Surgical_Instruments.jpg"}
                    alt={category.name}
                    fill
                    className="object-cover rounded-xl"
                    unoptimized
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-sm md:text-base font-semibold text-gray-800">
                    {category.name}
                  </h3>
                  <div className="w-9 h-9 rounded-full bg-[#7B00E0] flex items-center justify-center transition-transform group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

