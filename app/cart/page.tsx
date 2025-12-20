"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ArrowLeft, Bookmark, Filter, ShoppingCart, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { mediaUrl } from "@/lib/api"

export default function CartPage() {
  const router = useRouter()
  const { cartItems, removeFromCart, clearAll, refreshCart, loading } = useCart()

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
      <section className="container mx-auto px-4 py-4">
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
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </Link>
          </div>
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
                      className="bg-[#7B00E0] text-white px-8 py-2 rounded-full font-medium hover:bg-[#6a00c4]"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="border border-[#7B00E0] text-[#7B00E0] px-8 py-2 rounded-full font-medium hover:bg-[#7B00E0] hover:text-white transition-colors"
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
                className="border-2 border-[#7B00E0] text-[#7B00E0] px-10 py-3 rounded-full font-semibold hover:bg-[#7B00E0] hover:text-white transition-colors"
              >
                Remove All
              </button>
              <button
                onClick={handleCheckoutAll}
                className="bg-[#7B00E0] text-white px-10 py-3 rounded-full font-semibold hover:bg-[#6a00c4]"
              >
                Checkout All
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
