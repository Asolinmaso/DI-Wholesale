"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ArrowLeft, Bookmark, Filter, ShoppingCart, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { mediaUrl } from "@/lib/api"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, refreshCart, loading } = useCart()

  useEffect(() => {
    refreshCart()
  }, [refreshCart])
  const [formData, setFormData] = useState({
    name: "",
    orgName: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    businessType: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to cart first.")
      router.push("/products")
      return
    }
    
    console.log("Form submitted:", formData)
    console.log("Cart items:", cartItems)
    
    // TODO: Send order to backend API
    // For now, just show success message
    alert("Order submitted successfully! We will contact you soon.")
    router.push("/")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-4 container mx-auto px-4">
        <Link href="/cart" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7B00E0] mb-2">
          <ArrowLeft size={18} />
          <span className="font-semibold text-lg text-black">Checkout</span>
        </Link>
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-gray-400">Explore product</span>
          <ArrowRight size={16} className="text-gray-400" />
          <span className="text-gray-400">Add to cart</span>
          <ArrowRight size={16} className="text-gray-400" />
          <span className="text-[#7B00E0] font-medium">Fill details enquire</span>
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
                {cartItems.length}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading cart...</div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href="/products" className="text-[#7B00E0] hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Order Items */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-6 border-b border-gray-200 pb-4">
                  <div className="relative w-32 h-24 bg-gray-50 rounded-lg flex-shrink-0">
                    <Image
                      src={item.image || "/our_products/Surgical_Instruments.jpg"}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      A high-quality surgical instrument designed for medical procedures.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span><strong>Quantity :</strong> {item.quantity} boxes</span>
                      {item.size && <span><strong>Size :</strong> {item.size}</span>}
                      {item.shape && <span><strong>Shape :</strong> {item.shape}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-white">
          <h2 className="text-2xl font-bold mb-6">Fill Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name :</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name :</label>
                <input
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleChange}
                  placeholder="Enter Organization Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact :</label>
                <div className="flex gap-2">
                  <select className="border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#7B00E0]">
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Contact"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email :</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address :</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City :</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State :</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter State"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country :</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter Country"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode :</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter Pincode"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type :</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="hospital">Hospital</option>
                  <option value="clinic">Clinic</option>
                  <option value="distributor">Distributor</option>
                  <option value="retailer">Retailer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Licence :</label>
                <div className="border border-gray-300 rounded-lg px-4 py-2.5 flex items-center justify-between">
                  <span className="text-gray-400 text-sm">No file Chosen</span>
                  <button
                    type="button"
                    className="text-[#7B00E0] text-sm font-medium"
                  >
                    Upload File
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message :</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Additional Notes..."
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#7B00E0]"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#7B00E0] text-white px-16 py-3 rounded-lg font-semibold hover:bg-[#6a00c4]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
        )}
      </section>

      <Footer />
    </main>
  )
}

