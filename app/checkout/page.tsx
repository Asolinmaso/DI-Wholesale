"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ArrowLeft, ArrowRight, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductToolbar } from "@/components/product-toolbar"
import { useCart } from "@/lib/cart-context"
import { mediaUrl } from "@/lib/api"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, refreshCart, loading, cartCount } = useCart()
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
            <div className="space-y-0 mb-8">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-start gap-6 py-6">
                    <div className="relative w-48 h-32 md:w-64 md:h-40 bg-gray-50 rounded-lg flex-shrink-0">
                      <Image
                        src={item.image || "/our_products/Surgical_Instruments.jpg"}
                        alt={item.name}
                        fill
                        className="object-contain p-4"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-700">
                          <span className="font-medium">Quantity :</span> {item.quantity} boxes
                        </p>
                        {item.size && (
                          <p className="text-gray-700">
                            <span className="font-medium">Size :</span> {item.size}
                          </p>
                        )}
                        {item.shape && (
                          <p className="text-gray-700">
                            <span className="font-medium">Shape :</span> {item.shape}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && (
                    <div className="border-b border-gray-200"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">Fill Your Details</h2>
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
                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#7B00E0] focus-within:ring-1 focus-within:ring-[#7B00E0]">
                  <select className="border-0 border-r border-gray-300 rounded-none px-3 py-2.5 focus:outline-none bg-white appearance-none" disabled>
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Contact"
                    className="flex-1 border-0 rounded-none px-4 py-2.5 focus:outline-none"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type :</label>
                <div className="relative">
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-[#7B00E0] appearance-none bg-white"
                    required
                  >
                    <option value="">Select Business Type</option>
                    <option value="retailer">Retailer</option>
                    <option value="wholesaler">Wholesaler</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.825786 4.46821L8.03978 11.2358C8.29746 11.4781 8.60354 11.6703 8.94049 11.8014C9.27744 11.9325 9.63864 12 10.0034 12C10.3682 12 10.7294 11.9325 11.0664 11.8014C11.4033 11.6703 11.7094 11.4781 11.9671 11.2358L19.1811 4.46821C20.9358 2.82203 19.6824 0 17.2035 0H2.77551C0.296573 0 -0.92897 2.82203 0.825786 4.46821Z" fill="#8A8A8A"/>
                    </svg>
                  </div>
                </div>
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

