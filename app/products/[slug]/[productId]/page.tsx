"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowLeft, Bookmark, Filter, ShoppingCart, ArrowRight, ChevronDown } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getProduct, listProducts, listSubProducts, listCategories, mediaUrl, Product, SubProduct, Category } from "@/lib/api"

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>
}) {
  const { slug, productId } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [subProducts, setSubProducts] = useState<SubProduct[]>([])
  const [suggested, setSuggested] = useState<Product[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const prod = await getProduct(productId)
        setProduct(prod)

        const subs = await listSubProducts(productId)
        setSubProducts(subs)

        const cats = await listCategories()
        const cat = cats.find((c) => c.slug === slug)
        setCategory(cat || null)

        if (cat) {
          const allProds = await listProducts(cat._id)
          setSuggested(allProds.filter((p) => p._id !== productId).slice(0, 6))
        }
      } catch {
        console.error("Failed to load product")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [productId, slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-24 text-center text-gray-500">Loading...</div>
      </main>
    )
  }

  if (!product) {
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
        <Link
          href={`/products/${slug}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7B00E0] mb-2"
        >
          <ArrowLeft size={18} />
          <span className="font-semibold text-lg text-black">{product.name}</span>
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
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart size={22} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-[#7B00E0] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
            <div className="relative w-full h-[300px]">
              <Image
                src={product.images?.[0] ? mediaUrl(product.images[0]) : "/our_products/Surgical_Instruments.jpg"}
                alt={product.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
            <p className="text-gray-600 mb-6">
              {product.description ||
                "A high-quality surgical instrument designed for clamping blood vessels and controlling bleeding during surgical procedures. Suitable for general and specialized surgical use."}
            </p>

            {/* Variant selector */}
            {subProducts.length > 0 && (
              <div className="mb-4">
                <button className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm">
                  Select Size, Shape & Quantity
                  <ChevronDown size={16} />
                </button>
              </div>
            )}

            <button className="w-full md:w-auto bg-[#7B00E0] text-white px-8 py-3 rounded-full font-medium hover:bg-[#6a00c4] mb-6">
              Add to Cart
            </button>

            {/* Attributes Table */}
            <div className="border rounded-xl overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Attribute</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-gray-600">Category</td>
                    <td className="px-4 py-2">{category?.name || "—"}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-gray-600">Price</td>
                    <td className="px-4 py-2">₹{product.price}</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-gray-600">Stock</td>
                    <td className="px-4 py-2">{product.stockCount} packs</td>
                  </tr>
                  {subProducts.length > 0 && (
                    <tr className="border-t">
                      <td className="px-4 py-2 text-gray-600">Variants</td>
                      <td className="px-4 py-2">{subProducts.length} options</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Sub-products list */}
            {subProducts.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Available Variants:</h3>
                <div className="space-y-2">
                  {subProducts.map((sub) => (
                    <div key={sub._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {sub.images?.[0] && (
                          <Image
                            src={mediaUrl(sub.images[0])}
                            alt={sub.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 object-cover rounded"
                            unoptimized
                          />
                        )}
                        <div>
                          <p className="font-medium text-sm">{sub.name}</p>
                          {sub.sku && <p className="text-xs text-gray-500">SKU: {sub.sku}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">₹{sub.price}</p>
                        <p className="text-xs text-gray-500">{sub.stockCount} in stock</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Suggested Products */}
      {suggested.length > 0 && (
        <section className="container mx-auto px-4 py-8 border-t">
          <h2 className="text-xl font-bold mb-6">Suggested Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {suggested.map((prod) => (
              <div
                key={prod._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 group"
              >
                <div className="relative w-full h-[140px] md:h-[180px] bg-gray-100">
                  <Image
                    src={prod.images?.[0] ? mediaUrl(prod.images[0]) : "/our_products/Surgical_Instruments.jpg"}
                    alt={prod.name}
                    fill
                    className="object-contain p-4"
                    unoptimized
                  />
                  <button className="absolute top-3 right-3 text-gray-400 hover:text-[#7B00E0]">
                    <Bookmark size={18} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-gray-800">{prod.name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{prod.stockCount} packs</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{prod.description}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${slug}/${prod._id}`}
                      className="bg-[#7B00E0] text-white text-xs px-3 py-1.5 rounded-full font-medium hover:bg-[#6a00c4]"
                    >
                      View
                    </Link>
                    <button className="border border-[#7B00E0] text-[#7B00E0] text-xs px-3 py-1.5 rounded-full font-medium hover:bg-[#7B00E0] hover:text-white transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

