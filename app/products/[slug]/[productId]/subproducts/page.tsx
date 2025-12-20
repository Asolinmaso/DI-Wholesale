"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowLeft, Bookmark, Filter, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getProduct, listSubProducts, listCategories, mediaUrl, Product, SubProduct, Category } from "@/lib/api"

export default function SubProductsPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const productId = params.productId as string
  
  const [category, setCategory] = useState<Category | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [subProducts, setSubProducts] = useState<SubProduct[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const perPage = 9

  // Add to cart modal state
  const [showModal, setShowModal] = useState(false)
  const [selectedSubProduct, setSelectedSubProduct] = useState<SubProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedShape, setSelectedShape] = useState("")
  const [quantity, setQuantity] = useState(10)

  useEffect(() => {
    async function load() {
      try {
        const cats = await listCategories()
        const cat = cats.find((c) => c.slug === slug)
        if (cat) setCategory(cat)

        const prod = await getProduct(productId)
        setProduct(prod)

        const subs = await listSubProducts(productId)
        setSubProducts(subs)
      } catch {
        console.error("Failed to load")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug, productId])

  const filtered = subProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

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
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart size={22} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-[#7B00E0] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paginated.map((subProduct) => (
              <div
                key={subProduct._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
              >
                <div className="relative w-full h-[260px] bg-gray-50">
                  <Image
                    src={subProduct.images?.[0] ? mediaUrl(subProduct.images[0]) : "/our_products/Surgical_Instruments.jpg"}
                    alt={subProduct.name}
                    fill
                    className="object-contain p-6"
                    unoptimized
                  />
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-[#7B00E0]">
                    <Bookmark size={22} />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-semibold text-gray-800 flex-1">
                      {subProduct.name}
                    </h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                      {subProduct.stockCount} packs
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

      {/* Add to Cart Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
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

      <Footer />
    </main>
  )
}

