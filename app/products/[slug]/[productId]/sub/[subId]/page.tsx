"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowLeft, Bookmark, Filter, ShoppingCart, ArrowRight, ChevronDown, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getProduct, listSubProducts, listCategories, mediaUrl, Product, SubProduct, Category } from "@/lib/api"
import { useCart } from "@/lib/cart-context"

export default function SubProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { cartCount } = useCart()
  const slug = params.slug as string
  const productId = params.productId as string
  const subProductId = params.subId as string
  
  const [category, setCategory] = useState<Category | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [subProduct, setSubProduct] = useState<SubProduct | null>(null)
  const [suggested, setSuggested] = useState<SubProduct[]>([])
  const [loading, setLoading] = useState(true)

  // Modal states
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedShape, setSelectedShape] = useState("")
  const [quantity, setQuantity] = useState(subProduct?.minimumQuantity || 10)

  useEffect(() => {
    async function load() {
      try {
        const cats = await listCategories()
        
        const prod = await getProduct(productId)
        setProduct(prod)

        const cat = cats.find((c) => c._id === prod.categoryId)
        if (cat) setCategory(cat)

        const subs = await listSubProducts(productId)
        const sub = subs.find((s) => s._id === subProductId)
        if (sub) {
          setSubProduct(sub)
          setQuantity(sub.minimumQuantity && sub.minimumQuantity > 0 ? sub.minimumQuantity : 10)
        }

        setSuggested(subs.filter((s) => s._id !== subProductId).slice(0, 6))
      } catch (err) {
        console.error("Failed to load", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [productId, subProductId])

  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedShape || !subProduct || !product) {
      setShowSizeModal(true)
      return
    }
    
    try {
      await addToCart({
        productId: product._id,
        subProductId: subProduct._id,
        name: subProduct.name,
        image: subProduct.images?.[0] ? mediaUrl(subProduct.images[0]) : "",
        quantity,
        size: selectedSize,
        shape: selectedShape,
      })
      setShowSizeModal(false)
      router.push("/cart")
    } catch (error) {
      console.error("Failed to add to cart:", error)
      alert("Failed to add item to cart. Please try again.")
    }
  }

  const handleSelectSizeShape = () => {
    setShowSizeModal(true)
  }

  const handleConfirmSelection = () => {
    setShowSizeModal(false)
  }

  // Parse sizes and shapes from product data, fallback to defaults
  const sizes = subProduct?.productSize 
    ? subProduct.productSize.split(',').map(s => s.trim()).filter(Boolean)
    : ["5\"", "6\"", "7\"", "8\"", "9\"", "10\"", "11\"", "12\""]
  const shapes = subProduct?.productShape
    ? subProduct.productShape.split(',').map(s => s.trim()).filter(Boolean)
    : ["Straight", "Curved", "Teeth", "Plain"]
  
  // Use minimumQuantity from product or default to 10
  const minQuantity = subProduct?.minimumQuantity && subProduct.minimumQuantity > 0 ? subProduct.minimumQuantity : 10

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 text-center text-gray-500">Loading...</div>
      </main>
    )
  }

  if (!subProduct) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 text-center text-gray-500">Product not found</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-4 container mx-auto px-4">
        <Link href={`/products/${slug}/${productId}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7B00E0] mb-2">
          <ArrowLeft size={18} />
          <span className="font-semibold text-lg text-black">{subProduct.name}</span>
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
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7B00E0] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-4">
            <div className="relative w-full h-[350px]">
              <Image
                src={subProduct.images?.[0] ? mediaUrl(subProduct.images[0]) : "/our_products/Surgical_Instruments.jpg"}
                alt={subProduct.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            {/* Additional Images (from 2nd image onwards) */}
            {subProduct.images && subProduct.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 w-full mt-4">
                {subProduct.images.slice(1).map((image, index) => (
                  <div key={index} className="relative w-full h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={mediaUrl(image)}
                      alt={`${subProduct.name} ${index + 2}`}
                      fill
                      className="object-contain p-2"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{subProduct.name}</h1>
            {subProduct.description && (
              <p className="text-gray-600 mb-6">
                {subProduct.description}
              </p>
            )}
            {subProduct.composition && (
              <p className="text-gray-700 mb-2">
                <strong>Composition:</strong> {subProduct.composition}
              </p>
            )}
            {subProduct.packing && (
              <p className="text-gray-700 mb-6">
                <strong>Packing:</strong> {subProduct.packing}
              </p>
            )}

            {/* Size/Shape/Quantity Button */}
            <button
              onClick={handleSelectSizeShape}
              className="w-full md:w-auto border border-gray-300 rounded-lg px-6 py-3 text-base font-medium flex items-center justify-between gap-4 mb-4 hover:border-[#7B00E0]"
            >
              <span>
                {selectedSize && selectedShape 
                  ? `Size: ${selectedSize}, Shape: ${selectedShape}` 
                  : "Select Size, Shape & Quantity"
                }
              </span>
              <ChevronDown size={20} />
            </button>

            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-[#7B00E0] text-white px-12 py-3 rounded-full font-semibold hover:bg-[#6a00c4] mb-8"
            >
              Add to Cart
            </button>

            {/* Attributes Table */}
            <div className="border rounded-xl overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">Attribute</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-700">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {subProduct.composition && (
                    <tr className="border-t">
                      <td className="px-5 py-3 text-gray-600">Composition</td>
                      <td className="px-5 py-3 font-medium">{subProduct.composition}</td>
                    </tr>
                  )}
                  {subProduct.packing && (
                    <tr className="border-t">
                      <td className="px-5 py-3 text-gray-600">Packing</td>
                      <td className="px-5 py-3 font-medium">{subProduct.packing}</td>
                    </tr>
                  )}
                  {subProduct.material && (
                    <tr className="border-t">
                      <td className="px-5 py-3 text-gray-600">Material</td>
                      <td className="px-5 py-3 font-medium">{subProduct.material}</td>
                    </tr>
                  )}
                  {subProduct.productSize && (
                    <tr className="border-t">
                      <td className="px-5 py-3 text-gray-600">Size Options</td>
                      <td className="px-5 py-3 font-medium">{subProduct.productSize}</td>
                    </tr>
                  )}
                  {subProduct.productShape && (
                    <tr className="border-t">
                      <td className="px-5 py-3 text-gray-600">Shape Options</td>
                      <td className="px-5 py-3 font-medium">{subProduct.productShape}</td>
                    </tr>
                  )}
                  {subProduct.minimumQuantity && subProduct.minimumQuantity > 0 && (
                    <tr className="border-t">
                      <td className="px-5 py-3 text-gray-600">Minimum Quantity</td>
                      <td className="px-5 py-3 font-medium">{subProduct.minimumQuantity} pieces</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      {/* Suggested Products */}
      {suggested.length > 0 && (
        <section className="container mx-auto px-4 py-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Suggested Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {suggested.map((prod) => (
              <div
                key={prod._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
              >
                <div className="relative w-full h-[200px] bg-gray-50">
                  <Image
                    src={prod.images?.[0] ? mediaUrl(prod.images[0]) : "/our_products/Surgical_Instruments.jpg"}
                    alt={prod.name}
                    fill
                    className="object-contain p-6"
                    unoptimized
                  />
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-[#7B00E0]">
                    <Bookmark size={20} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">{prod.name}</h3>
                  {prod.description && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {prod.description}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${slug}/${productId}/sub/${prod._id}`}
                      className="flex-1 bg-[#7B00E0] text-white text-xs px-3 py-2 rounded-full font-medium hover:bg-[#6a00c4] text-center"
                    >
                      View
                    </Link>
                    <button className="flex-1 border border-[#7B00E0] text-[#7B00E0] text-xs px-3 py-2 rounded-full font-medium hover:bg-[#7B00E0] hover:text-white transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Size/Shape/Quantity Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSizeModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <X size={32} />
            </button>

            <h2 className="text-3xl font-bold mb-8">Size & Dimension</h2>

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

            <div className="mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(minQuantity, q - 1))}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg text-2xl hover:border-[#7B00E0]"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(minQuantity, parseInt(e.target.value) || minQuantity))}
                  className="w-24 h-12 border-2 border-gray-300 rounded-lg text-center text-xl font-medium"
                  min={minQuantity}
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg text-2xl hover:border-[#7B00E0]"
                >
                  +
                </button>
              </div>
              <p className="text-gray-500 mt-3">Note : Minimum Quantity Should be {minQuantity} pcs</p>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleConfirmSelection}
                disabled={!selectedSize || !selectedShape}
                className="bg-[#7B00E0] text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:bg-[#6a00c4] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

