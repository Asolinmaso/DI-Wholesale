"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Trash2, Package, FolderOpen } from "lucide-react"
import {
  listCategories,
  createCategory,
  deleteCategory,
  listProducts,
  createProduct,
  deleteProduct,
  mediaUrl,
  Category,
  Product,
} from "@/lib/api"

export default function AdminPage() {
  const [tab, setTab] = useState<"categories" | "products">("categories")
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Category form
  const [catName, setCatName] = useState("")
  const [catImage, setCatImage] = useState<File | null>(null)

  // Product form
  const [prodName, setProdName] = useState("")
  const [prodDesc, setProdDesc] = useState("")
  const [prodPrice, setProdPrice] = useState("")
  const [prodStock, setProdStock] = useState("")
  const [prodCat, setProdCat] = useState("")
  const [prodImages, setProdImages] = useState<FileList | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) fetchProducts(selectedCategory)
  }, [selectedCategory])

  async function fetchCategories() {
    try {
      const data = await listCategories()
      setCategories(data)
    } catch {
      setError("Failed to load categories")
    }
  }

  async function fetchProducts(catId?: string) {
    try {
      const data = await listProducts(catId)
      setProducts(data)
    } catch {
      setError("Failed to load products")
    }
  }

  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!catName) return
    setLoading(true)
    setError("")
    try {
      const form = new FormData()
      form.append("name", catName)
      if (catImage) form.append("image", catImage)
      await createCategory(form)
      setCatName("")
      setCatImage(null)
      fetchCategories()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create category")
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm("Delete this category?")) return
    try {
      await deleteCategory(id)
      fetchCategories()
    } catch {
      setError("Failed to delete category")
    }
  }

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault()
    if (!prodName || !prodCat) return
    setLoading(true)
    setError("")
    try {
      const form = new FormData()
      form.append("name", prodName)
      form.append("categoryId", prodCat)
      if (prodDesc) form.append("description", prodDesc)
      form.append("price", prodPrice || "0")
      form.append("stockCount", prodStock || "0")
      if (prodImages) {
        Array.from(prodImages).forEach((f) => form.append("images", f))
      }
      await createProduct(form)
      setProdName("")
      setProdDesc("")
      setProdPrice("")
      setProdStock("")
      setProdImages(null)
      fetchProducts(selectedCategory || undefined)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create product")
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm("Delete this product?")) return
    try {
      await deleteProduct(id)
      fetchProducts(selectedCategory || undefined)
    } catch {
      setError("Failed to delete product")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={120} height={50} className="h-10 w-auto" />
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <Link href="/" className="text-[#7B00E0] hover:underline text-sm">
            ← Back to Site
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("categories")}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              tab === "categories" ? "bg-[#7B00E0] text-white" : "bg-white text-gray-700 border"
            }`}
          >
            <FolderOpen size={18} /> Categories
          </button>
          <button
            onClick={() => setTab("products")}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              tab === "products" ? "bg-[#7B00E0] text-white" : "bg-white text-gray-700 border"
            }`}
          >
            <Package size={18} /> Products
          </button>
        </div>

        {/* Categories Tab */}
        {tab === "categories" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Add Category</h2>
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCatImage(e.target.files?.[0] || null)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7B00E0] text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#6a00c4] disabled:opacity-50"
                >
                  <Plus size={18} /> Add Category
                </button>
              </form>
            </div>

            {/* List */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Categories ({categories.length})</h2>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {categories.map((cat) => (
                  <div key={cat._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {cat.image && (
                      <Image
                        src={mediaUrl(cat.image)}
                        alt={cat.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded"
                        unoptimized
                      />
                    )}
                    <span className="flex-1 font-medium">{cat.name}</span>
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {categories.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No categories yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {tab === "products" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold mb-4">Add Product</h2>
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={prodCat}
                    onChange={(e) => setProdCat(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      value={prodPrice}
                      onChange={(e) => setProdPrice(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      value={prodStock}
                      onChange={(e) => setProdStock(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setProdImages(e.target.files)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7B00E0] text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#6a00c4] disabled:opacity-50"
                >
                  <Plus size={18} /> Add Product
                </button>
              </form>
            </div>

            {/* List */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-lg font-semibold">Products</h2>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border rounded-lg px-2 py-1 text-sm"
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {products.map((prod) => (
                  <div key={prod._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {prod.images?.[0] && (
                      <Image
                        src={mediaUrl(prod.images[0])}
                        alt={prod.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded"
                        unoptimized
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{prod.name}</p>
                      <p className="text-sm text-gray-500">₹{prod.price} • {prod.stockCount} in stock</p>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(prod._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {products.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No products yet</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

