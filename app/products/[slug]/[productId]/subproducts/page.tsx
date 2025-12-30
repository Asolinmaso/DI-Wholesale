"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductToolbar } from "@/components/product-toolbar"
import { getProduct, listSubProducts, listCategories, mediaUrl, Product, SubProduct, Category, PaginatedResponse } from "@/lib/api"
import { useCart } from "@/lib/cart-context"

export default function SubProductsPage() {
  const params = useParams()
  const router = useRouter()
  const { cartCount } = useCart()
  const slug = params.slug as string
  const productId = params.productId as string
  
  const [category, setCategory] = useState<Category | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [subProductsResponse, setSubProductsResponse] = useState<PaginatedResponse<SubProduct> | null>(null)
  const [subProducts, setSubProducts] = useState<SubProduct[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const perPage = 12

  // Add to cart modal state
  const [showModal, setShowModal] = useState(false)
  const [selectedSubProduct, setSelectedSubProduct] = useState<SubProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedShape, setSelectedShape] = useState("")
  const [quantity, setQuantity] = useState(10)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    size: [] as string[],
    shape: [] as string[],
    therapeuticCategory: [] as string[],
    dosageForm: [] as string[]
  })

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const catsResponse = await listCategories()
        const cat = catsResponse.data.find((c) => c.slug === slug)
        if (cat) setCategory(cat)

        const prod = await getProduct(productId)
        setProduct(prod)

        // Always fetch paginated data from backend
        const response = await listSubProducts(productId, undefined, page, perPage)
        setSubProductsResponse(response)
        setSubProducts(response.data)
      } catch {
        console.error("Failed to load")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug, productId, page, perPage])

  // Use backend pagination info - display products directly from API
  const displayProducts = subProducts
  const totalPages = subProductsResponse?.pagination.totalPages || 0
  const currentPage = subProductsResponse?.pagination.currentPage || 1
  const hasNextPage = subProductsResponse?.pagination.hasNextPage || false
  const hasPrevPage = subProductsResponse?.pagination.hasPrevPage || false

  const handleAddToCart = (sub: SubProduct) => {
    setSelectedSubProduct(sub)
    setShowModal(true)
  }

  const handleConfirmAddToCart = () => {
    // TODO: Add to cart logic
    console.log({
      product: selectedSubProduct,
      size: selectedSize,
      shape: selectedShape,
      quantity,
    })
    setShowModal(false)
    router.push("/cart")
  }

  const sizes = ["5\"", "6\"", "7\"", "8\"", "9\"", "10\"", "11\"", "12\""]
  const shapes = ["Straight", "Curved", "Teeth", "Plain"]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-4 container mx-auto px-4">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7B00E0] mb-2">
          <ArrowLeft size={18} />
          <span className="font-semibold text-lg text-black">{product?.name || "Products"}</span>
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
      <section className="container mx-auto px-4 py-4 border-t border-b border-gray-300">
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

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading products...</div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No sub-products found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProducts.map((subProduct) => (
              <div
                key={subProduct._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
              >
                <div className="relative w-full h-[260px] bg-gray-50">
                  <Image
                    src={subProduct.images?.[0] ? mediaUrl(subProduct.images[0]) : "/Logo2.png"}
                    alt={subProduct.name}
                    fill
                    className="object-contain p-6"
                    unoptimized
                  />
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-[#7B00E0]">
                    <svg width="22" height="33" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.2002 2H19.7998C21.0932 2 21.942 2.00201 22.5908 2.05566C23.2148 2.10729 23.4753 2.19683 23.626 2.27441C24.0943 2.51594 24.4797 2.90335 24.7227 3.38574C24.8035 3.54642 24.8938 3.81945 24.9453 4.45703C24.9986 5.1173 25 5.97939 25 7.28711V37.2275L14.6191 30.2227C13.9854 29.795 13.1675 29.7685 12.5107 30.1426L12.3818 30.2227L2 37.2256V7.28711C2 5.97939 2.00139 5.1173 2.05469 4.45703C2.10616 3.81945 2.19648 3.54642 2.27734 3.38574C2.52027 2.90345 2.90482 2.51497 3.37305 2.27344C3.52364 2.19581 3.78469 2.10733 4.40918 2.05566C5.05802 2.00201 5.9068 2 7.2002 2Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-semibold text-gray-800 flex-1">
                      {subProduct.name}
                    </h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/products/${slug}/${productId}/sub/${subProduct._id}`}
                      className="flex-1 bg-[#7B00E0] text-white text-sm px-4 py-2.5 rounded-full font-medium hover:bg-[#6a00c4] text-center"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleAddToCart(subProduct)}
                      className="flex-1 border border-[#7B00E0] text-[#7B00E0] text-sm px-4 py-2.5 rounded-full font-medium hover:bg-[#7B00E0] hover:text-white transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Improved Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {/* Previous Button */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPrevPage}
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page Numbers with Ellipsis */}
            <div className="flex items-center gap-1">
              {(() => {
                const pages = []
                const showEllipsis = totalPages > 7

                if (!showEllipsis) {
                  // Show all pages if total pages <= 7
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                  }
                } else {
                  // Always show first page
                  pages.push(1)

                  if (currentPage > 4) {
                    pages.push('...')
                  }

                  // Show pages around current page
                  const start = Math.max(2, currentPage - 1)
                  const end = Math.min(totalPages - 1, currentPage + 1)

                  for (let i = start; i <= end; i++) {
                    if (i !== 1 && i !== totalPages) {
                      pages.push(i)
                    }
                  }

                  if (currentPage < totalPages - 3) {
                    pages.push('...')
                  }

                  // Always show last page
                  if (totalPages > 1) {
                    pages.push(totalPages)
                  }
                }

                return pages.map((pageNum, index) => {
                  if (pageNum === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-500">
                        ...
                      </span>
                    )
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum as number)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        pageNum === currentPage
                          ? "bg-[#7B00E0] text-white border-[#7B00E0]"
                          : "border border-gray-300 hover:bg-gray-50 hover:border-[#7B00E0] hover:text-[#7B00E0]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })
              })()}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={!hasNextPage}
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Pagination Info */}
        {subProductsResponse && totalPages > 1 && (
          <div className="text-center mt-4 text-sm text-gray-600">
            Showing page {currentPage} of {totalPages} ({subProductsResponse.pagination.totalProducts} total sub-products)
          </div>
        )}

        
      </section>

      {/* Add to Cart Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 "
            >
              <X size={32} />
            </button>

            <h2 className="text-3xl font-bold mb-8">Size & Dimension</h2>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 rounded-xl border-2 text-lg font-medium transition-all ${
                      selectedSize === size
                        ? "border-[#7B00E0] bg-[#7B00E0] text-white"
                        : "border-gray-300 hover:border-[#7B00E0]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Shape</h2>

            {/* Shape Selection */}
            <div className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {shapes.map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setSelectedShape(shape)}
                    className={`px-6 py-3 rounded-xl border-2 text-lg font-medium transition-all ${
                      selectedShape === shape
                        ? "border-[#7B00E0] bg-[#7B00E0] text-white"
                        : "border-gray-300 hover:border-[#7B00E0]"
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Quantity</h2>

            {/* Quantity Selection */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(10, q - 1))}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg text-2xl hover:border-[#7B00E0]"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(10, parseInt(e.target.value) || 10))}
                  className="w-24 h-12 border-2 border-gray-300 rounded-lg text-center text-xl font-medium"
                  min={10}
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg text-2xl hover:border-[#7B00E0]"
                >
                  +
                </button>
              </div>
              <p className="text-gray-500 mt-3">Note : Minimum Quantity Should be 10 pcs</p>
            </div>

            {/* Add to Cart Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleConfirmAddToCart}
                disabled={!selectedSize || !selectedShape}
                className="bg-[#7B00E0] text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:bg-[#6a00c4] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

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

      <Footer />
    </main>
  )
}

