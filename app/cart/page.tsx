"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, ArrowLeft, ArrowRight, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductToolbar } from "@/components/product-toolbar"
import { useCart } from "@/lib/cart-context"
import { mediaUrl } from "@/lib/api"

export default function CartPage() {
  const router = useRouter()
  const { cartItems, removeFromCart, clearAll, refreshCart, loading, cartCount } = useCart()
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    size: [] as string[],
    shape: [] as string[],
    therapeuticCategory: [] as string[],
    dosageForm: [] as string[]
  })

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const handleRemove = async (id: string) => {
    if (confirm("Remove this item from cart?")) {
      await removeFromCart(id)
    }
  }

  const handleRemoveAll = async () => {
    if (confirm("Remove all items from cart?")) {
      await clearAll()
    }
  }

  const handleCheckout = (itemId?: string) => {
    router.push("/checkout")
  }

  const handleCheckoutAll = () => {
    router.push("/checkout")
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 text-center text-gray-500">Loading cart...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-4 container mx-auto px-4">
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7B00E0] mb-2">
          <ArrowLeft size={18} />
          <span className="font-semibold text-lg text-black">My Cart</span>
        </Link>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-gray-400">Explore product</span>
          <ArrowRight size={16} className="text-gray-400" />
          <span className="text-[#7B00E0] font-medium">Add to cart</span>
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

      {/* Cart Items */}
      <section className="container mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="mb-4">Your cart is empty</p>
            <Link href="/products" className="text-[#7B00E0] hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-start gap-6 border-b border-gray-200 pb-6">
                <input
                  type="checkbox"
                  className="mt-2 w-5 h-5 text-[#7B00E0] border-gray-300 rounded focus:ring-[#7B00E0]"
                  defaultChecked
                />
                <div className="relative w-48 h-32 bg-gray-50 rounded-lg flex-shrink-0">
                  <Image
                    src={item.image || "/our_products/Surgical_Instruments.jpg"}
                    alt={item.name}
                    fill
                    className="object-contain p-4"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{item.name}</h3>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Quantity :</span> {item.quantity} boxes
                  </p>
                  {item.size && (
                    <p className="text-gray-700 mb-1">
                      <span className="font-medium">Size :</span> {item.size}
                    </p>
                  )}
                  {item.shape && (
                    <p className="text-gray-700">
                      <span className="font-medium">Shape :</span> {item.shape}
                    </p>
                  )}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleCheckout(item.id)}
                      className="bg-[#7B00E0] text-white px-8 py-2 rounded-lg font-medium hover:bg-[#6a00c4]"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="border border-[#7B00E0] text-[#7B00E0] px-8 py-2 rounded-lg font-medium hover:bg-[#7B00E0] hover:text-white transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                onClick={handleRemoveAll}
                className="border-2 border-[#7B00E0] text-[#7B00E0] px-10 py-3 rounded-lg font-semibold hover:bg-[#7B00E0] hover:text-white transition-colors"
              >
                Remove All
              </button>
              <button
                onClick={handleCheckoutAll}
                className="bg-[#7B00E0] text-white px-10 py-3 rounded-lg font-semibold hover:bg-[#6a00c4]"
              >
                Checkout All
              </button>
            </div>
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

      <Footer />
    </main>
  )
}
