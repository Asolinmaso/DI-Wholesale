"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ArrowUpRight, ArrowRight, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductToolbar } from "@/components/product-toolbar"
import { listCategories, listProducts, mediaUrl, Category, type Product } from "@/lib/api"
import { useCart } from "@/lib/cart-context"

export default function ProductsPage() {
  const router = useRouter()
  const { cartCount } = useCart()
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [productTypes, setProductTypes] = useState<Product[]>([])
  const [productTypesLoading, setProductTypesLoading] = useState(false)
  const [productTypesError, setProductTypesError] = useState("")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    size: [] as string[],
    shape: [] as string[],
    therapeuticCategory: [] as string[],
    dosageForm: [] as string[]
  })

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

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return categories
      .filter((c) => {
        // Support both old (image) and new (images) format
        const hasImage = (c.images && c.images.length > 0) || c.image
        return hasImage && mediaUrl(c.images?.[0] || c.image)
      })
      .filter((c) => c.name.toLowerCase().includes(q))
  }, [categories, search])

  async function openCategoryModal(category: Category) {
    setSelectedCategory(category)
    setProductTypes([])
    setProductTypesError("")
    setProductTypesLoading(true)
    try {
      const prods = await listProducts(category._id)
      setProductTypes(prods)
    } catch (e: unknown) {
      setProductTypesError(e instanceof Error ? e.message : "Failed to load product types")
    } finally {
      setProductTypesLoading(false)
    }
  }

  function closeCategoryModal() {
    setSelectedCategory(null)
    setProductTypes([])
    setProductTypesError("")
    setProductTypesLoading(false)
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Banner */}
      <section
        className="relative mt-20 pb-32 bg-cover bg-center"
        style={{ backgroundImage: "url('/Product_Banner.png')" }}
      >
        <div className="absolute" />
        <div className="relative container mx-auto px-4 flex flex-col items-center">
          {/* Medical Product Categories Heading */}
          <h1
            className="text-[48px] font-semibold mb-0 leading-[72px] text-[#1E1E1E] text-center"
            style={{ 
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 600,
              width: '677px',
              marginTop: '48px'
            }}
          >
            Medical Product Categories
          </h1>

          {/* Description */}
          <p
            className="text-2xl font-normal leading-[36px] text-[#454242] text-center max-w-[765px]"
            style={{ 
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 400,
              marginTop: '4px'
            }}
          >
            Browse our certified medical supplies by category. Designed for bulk and institutional procurement.
          </p>

          {/* Navigation Links */}
          <div
            style={{ 
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '24px',
              position: 'absolute',
              width: '728px',
              height: '36px',
              left: 'calc(50% - 728px/2 + 1px)',
              top: '232px',
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            }}
          >
            <span className="text-2xl font-medium leading-[36px] text-[#7B00E0]" style={{ fontWeight: 500 }}>
              Explore products
            </span>
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.000234604 9H18.3752L10.5002 1.125L11.4902 0L21.2402 9.75L11.4902 19.5L10.5002 18.375L18.3752 10.5H0.000234604V9Z" fill="#848383"/>
            </svg>
            <span className="text-2xl font-normal leading-[36px] text-[#848383]" style={{ fontWeight: 400 }}>
              add to cart
            </span>
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.000234604 9H18.3752L10.5002 1.125L11.4902 0L21.2402 9.75L11.4902 19.5L10.5002 18.375L18.3752 10.5H0.000234604V9Z" fill="#848383"/>
            </svg>
            <span className="text-2xl font-normal leading-[36px] text-[#848383]" style={{ fontWeight: 400 }}>
              fill details enquire
            </span>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container mx-auto px-4 py-6 border-t border-b border-gray-300">
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
          <ProductToolbar 
            onFilterClick={() => setShowFilterModal(true)}
            cartCount={cartCount}
          />
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
              <button
                key={category._id}
                type="button"
                onClick={() => openCategoryModal(category)}
                className="text-left p-3 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group border border-gray-100"
              >
                <div className="relative h-[260px] md:h-[320px] bg-gray-100 rounded-t-2xl overflow-hidden m-3 mr-3">
                  <Image
                    src={mediaUrl(category.images?.[0] || category.image)}
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
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Filter Modal */}
      {showFilterModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Filter Products"
        >
          <button
            type="button"
            aria-label="Close modal"
            onClick={() => setShowFilterModal(false)}
            className="absolute inset-0 bg-black/70"
          />
          <div className="relative w-[min(90vw,800px)] max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2
                className="text-2xl font-semibold text-[#7B00E0]"
                style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
              >
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                aria-label="Close"
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-8">
              {/* Size Section */}
              <div>
                <h3 className="text-lg font-semibold text-[#7B00E0] mb-4" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
                  Size
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["5\"", "6\"", "7\"", "8\"", "9\"", "10\"", "11\"", "12\""].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedFilters(prev => ({
                          ...prev,
                          size: prev.size.includes(size)
                            ? prev.size.filter(s => s !== size)
                            : [...prev.size, size]
                        }))
                      }}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedFilters.size.includes(size)
                          ? "bg-[#7B00E0] text-white border-[#7B00E0]"
                          : "bg-gray-100 text-black border-gray-300 hover:bg-gray-200"
                      }`}
                      style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shape Section */}
              <div>
                <h3 className="text-lg font-semibold text-[#7B00E0] mb-4" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
                  Shape
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Straight", "Curved", "Teeth", "Plain"].map((shape) => (
                    <button
                      key={shape}
                      type="button"
                      onClick={() => {
                        setSelectedFilters(prev => ({
                          ...prev,
                          shape: prev.shape.includes(shape)
                            ? prev.shape.filter(s => s !== shape)
                            : [...prev.shape, shape]
                        }))
                      }}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedFilters.shape.includes(shape)
                          ? "bg-[#7B00E0] text-white border-[#7B00E0]"
                          : "bg-gray-100 text-black border-gray-300 hover:bg-gray-200"
                      }`}
                      style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Therapeutic Category Section */}
              <div>
                <h3 className="text-lg font-semibold text-[#7B00E0] mb-4" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
                  Therapeutic Category
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Cardiac", "Antibiotic", "Pain Relief", "Gastro", "Neuro", "Diabetic"].map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setSelectedFilters(prev => ({
                          ...prev,
                          therapeuticCategory: prev.therapeuticCategory.includes(category)
                            ? prev.therapeuticCategory.filter(c => c !== category)
                            : [...prev.therapeuticCategory, category]
                        }))
                      }}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedFilters.therapeuticCategory.includes(category)
                          ? "bg-[#7B00E0] text-white border-[#7B00E0]"
                          : "bg-gray-100 text-black border-gray-300 hover:bg-gray-200"
                      }`}
                      style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dosage Form Section */}
              <div>
                <h3 className="text-lg font-semibold text-[#7B00E0] mb-4" style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
                  Dosage Form
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Tablet", "Capsule", "Syrup", "Injection"].map((form) => (
                    <button
                      key={form}
                      type="button"
                      onClick={() => {
                        setSelectedFilters(prev => ({
                          ...prev,
                          dosageForm: prev.dosageForm.includes(form)
                            ? prev.dosageForm.filter(f => f !== form)
                            : [...prev.dosageForm, form]
                        }))
                      }}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedFilters.dosageForm.includes(form)
                          ? "bg-[#7B00E0] text-white border-[#7B00E0]"
                          : "bg-gray-100 text-black border-gray-300 hover:bg-gray-200"
                      }`}
                      style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                    >
                      {form}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFilters({
                      size: [],
                      shape: [],
                      therapeuticCategory: [],
                      dosageForm: []
                    })
                  }}
                  className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg bg-[#7B00E0] text-white hover:bg-[#6a00c4] transition-colors"
                  style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category -> Product Types Modal */}
      {selectedCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Select Product Type"
        >
          <button
            type="button"
            aria-label="Close modal"
            onClick={closeCategoryModal}
            className="absolute inset-0 bg-black/70"
          />
          <div className="relative w-[min(1100px,92vw)] bg-white rounded-[48px] shadow-2xl border border-gray-200 overflow-hidden">
            <div className="p-10">
              <div className="flex items-start justify-between gap-6">
                <h2
                  className="text-2xl font-semibold text-[#7B00E0]"
                  style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                >
                  Select Product Type
                </h2>
                <button
                  type="button"
                  onClick={closeCategoryModal}
                  aria-label="Close"
                  className="hover:text-gray-700 text-4xl"
                >
                  ×
                </button>
              </div>

              <div className="mt-8">
                {productTypesLoading ? (
                  <div className="text-gray-500">Loading...</div>
                ) : productTypesError ? (
                  <div className="text-red-600">{productTypesError}</div>
                ) : productTypes.length === 0 ? (
                  <div className="text-gray-500">No product types found.</div>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {productTypes.map((p) => (
                      <button
                        key={p._id}
                        type="button"
                        onClick={() => router.push(`/products/${selectedCategory.slug}/${p._id}`)}
                        className="px-6 py-3 rounded-xl bg-[#D9D9D9] border border-[#8A8A8A] text-base text-black hover:bg-gray-200 transition-colors"
                        style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

