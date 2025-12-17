"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowLeft, Bookmark, Filter, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { listCategories, listProducts, mediaUrl, Category, Product } from "@/lib/api"

export default function CategoryProductsPage() {
  const params = useParams()
  const slug = params.slug as string
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const perPage = 9

  useEffect(() => {
    async function load() {
      try {
        const cats = await listCategories()
        const cat = cats.find((c) => c.slug === slug)
        if (cat) {
          setCategory(cat)
          const prods = await listProducts(cat._id)
          setProducts(prods)
        }
      } catch {
        console.error("Failed to load")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-4 container mx-auto px-4">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7B00E0] mb-2">
          <ArrowLeft size={18} />
          <span className="font-semibold text-lg text-black">{category?.name || "Products"}</span>
        </Link>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-[#7B00E0] font-medium">Explore product</span>
          <ArrowRight size={16} className="text-gray-400" />
          <span className="text-gray-400">Add to cart</span>
          <ArrowRight size={16} className="text-gray-400" />
          <span className="text-gray-400">Fill details enquire</span>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container mx-auto px-4 py-4">
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

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading products...</div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No products found</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {paginated.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group"
              >
                <div className="relative w-full h-[160px] md:h-[200px] bg-gray-100">
                  <Image
                    src={product.images?.[0] ? mediaUrl(product.images[0]) : "/our_products/Surgical_Instruments.jpg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    unoptimized
                  />
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-[#7B00E0]">
                    <Bookmark size={20} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {product.stockCount} packs
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${slug}/${product._id}`}
                      className="bg-[#7B00E0] text-white text-xs px-4 py-2 rounded-full font-medium hover:bg-[#6a00c4]"
                    >
                      View
                    </Link>
                    <button className="border border-[#7B00E0] text-[#7B00E0] text-xs px-4 py-2 rounded-full font-medium hover:bg-[#7B00E0] hover:text-white transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border rounded-lg disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg font-medium ${
                  p === page ? "bg-[#7B00E0] text-white" : "border hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 border rounded-lg disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

