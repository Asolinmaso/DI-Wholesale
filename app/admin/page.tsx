"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Trash2, Package, FolderOpen, Pencil } from "lucide-react"
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  listSubProducts,
  createSubProduct,
  updateSubProduct,
  deleteSubProduct,
  mediaUrl,
  Category,
  Product,
  SubProduct,
} from "@/lib/api"

export default function AdminPage() {
  const [tab, setTab] = useState<"categories" | "sub-categories" | "products">("categories")
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<Product[]>([])
  const [variants, setVariants] = useState<SubProduct[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("") // filter sub-categories
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("") // for variants
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Category form
  const [catName, setCatName] = useState("")
  const [catImage, setCatImage] = useState<File | null>(null)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)

  // Sub-category (Product) form
  const [subCatName, setSubCatName] = useState("")
  const [subCatCatId, setSubCatCatId] = useState("")
  const [editingSubCatId, setEditingSubCatId] = useState<string | null>(null)

  // Product (SubProduct) form
  const [variantName, setVariantName] = useState("")
  const [variantCatId, setVariantCatId] = useState("")
  const [variantSubCatId, setVariantSubCatId] = useState("")
  const [variantImages, setVariantImages] = useState<FileList | null>(null)
  const [variantSize, setVariantSize] = useState("")
  const [variantMinQty, setVariantMinQty] = useState("")
  const [variantDesc, setVariantDesc] = useState("")
  const [variantShape, setVariantShape] = useState("")
  const [variantMaterial, setVariantMaterial] = useState("")
  const [variantPrice, setVariantPrice] = useState("")
  const [variantStock, setVariantStock] = useState("")
  const [variantSku, setVariantSku] = useState("")
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
    fetchSubCategories()
  }, [])

  useEffect(() => {
    fetchSubCategories(selectedCategory || undefined)
  }, [selectedCategory])

  useEffect(() => {
    if (selectedSubCategory) fetchVariants(selectedSubCategory)
    else setVariants([])
  }, [selectedSubCategory])

  useEffect(() => {
    if (variantCatId) {
      fetchSubCategories(variantCatId)
    }
  }, [variantCatId])

  async function fetchCategories() {
    try {
      const data = await listCategories()
      setCategories(data)
    } catch {
      setError("Failed to load categories")
    }
  }

  async function fetchSubCategories(catId?: string) {
    try {
      const data = await listProducts(catId)
      setSubCategories(data)
    } catch {
      setError("Failed to load sub-categories")
    }
  }

  async function fetchVariants(productId: string) {
    try {
      const data = await listSubProducts(productId)
      setVariants(data)
    } catch {
      setError("Failed to load products")
    }
  }

  async function handleCreateOrUpdateCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!catName) return
    setLoading(true)
    setError("")
    try {
      const form = new FormData()
      form.append("name", catName)
      if (catImage) form.append("image", catImage)
      if (editingCatId) await updateCategory(editingCatId, form)
      else await createCategory(form)
      setCatName("")
      setCatImage(null)
      setEditingCatId(null)
      fetchCategories()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save category")
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

  function startEditCategory(cat: Category) {
    setEditingCatId(cat._id)
    setCatName(cat.name)
    setCatImage(null)
    setTab("categories")
  }

  async function handleCreateOrUpdateSubCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!subCatName || !subCatCatId) return
    setLoading(true)
    setError("")
    try {
      const form = new FormData()
      form.append("name", subCatName)
      form.append("categoryId", subCatCatId)
      if (editingSubCatId) await updateProduct(editingSubCatId, form)
      else await createProduct(form)

      setSubCatName("")
      setSubCatCatId("")
      setEditingSubCatId(null)
      fetchSubCategories(selectedCategory || undefined)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save sub-category")
    } finally {
      setLoading(false)
    }
  }

  function startEditSubCategory(p: Product) {
    setEditingSubCatId(p._id)
    setSubCatName(p.name)
    setSubCatCatId(p.categoryId)
    setTab("sub-categories")
  }

  async function handleDeleteSubCategory(id: string) {
    if (!confirm("Delete this sub-category?")) return
    try {
      await deleteProduct(id)
      if (selectedSubCategory === id) setSelectedSubCategory("")
      fetchSubCategories(selectedCategory || undefined)
    } catch {
      setError("Failed to delete sub-category")
    }
  }

  async function handleCreateOrUpdateVariant(e: React.FormEvent) {
    e.preventDefault()
    if (!variantSubCatId || !variantName || !variantCatId) return
    setLoading(true)
    setError("")
    try {
      const form = new FormData()
      form.append("name", variantName)
      form.append("sku", variantSku || "")
      form.append("price", variantPrice || "0")
      form.append("stockCount", variantStock || "0")
      if (variantImages) Array.from(variantImages).forEach((f) => form.append("images", f))
      // Note: Additional fields (size, shape, material, minQty, desc) would need backend support
      // For now, we store them as part of the name or skip them

      if (editingVariantId) await updateSubProduct(variantSubCatId, editingVariantId, form)
      else await createSubProduct(variantSubCatId, form)

      setVariantName("")
      setVariantCatId("")
      setVariantSubCatId("")
      setVariantImages(null)
      setVariantSize("")
      setVariantMinQty("")
      setVariantDesc("")
      setVariantShape("")
      setVariantMaterial("")
      setVariantPrice("")
      setVariantStock("")
      setVariantSku("")
      setEditingVariantId(null)
      if (variantSubCatId) fetchVariants(variantSubCatId)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save product")
    } finally {
      setLoading(false)
    }
  }

  function startEditVariant(v: SubProduct) {
    setEditingVariantId(v._id)
    setVariantName(v.name)
    setVariantSku(v.sku || "")
    setVariantPrice(String(v.price || ""))
    setVariantStock(String(v.stockCount || ""))
    setVariantImages(null)
    setVariantSize("")
    setVariantMinQty("")
    setVariantDesc("")
    setVariantShape("")
    setVariantMaterial("")
    
    // Find the product to get categoryId
    const prod = subCategories.find((p) => p._id === v.productId)
    if (prod) {
      setVariantCatId(prod.categoryId)
      setVariantSubCatId(v.productId)
    }
    setTab("products")
    setSelectedSubCategory(v.productId)
  }

  async function handleDeleteVariant(subId: string) {
    if (!selectedSubCategory) return
    if (!confirm("Delete this product?")) return
    try {
      await deleteSubProduct(selectedSubCategory, subId)
      fetchVariants(selectedSubCategory)
    } catch {
      setError("Failed to delete product")
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex">
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#7B00E0] text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <Image src="/Logo2.png" alt="DI Wholesale" width={150} height={60} className="w-auto h-16 object-contain" unoptimized />
        </div>
        <nav className="mt-8 flex flex-col gap-2 px-6">
          <button
            type="button"
            onClick={() => setTab("categories")}
            className={`text-left text-2xl py-3 ${tab === "categories" ? "font-semibold" : "opacity-80"}`}
          >
            Category
          </button>
          <button
            type="button"
            onClick={() => setTab("sub-categories")}
            className={`text-left text-2xl py-3 ${tab === "sub-categories" ? "font-semibold" : "opacity-80"}`}
          >
            Sub-Category
          </button>
          <button
            type="button"
            onClick={() => setTab("products")}
            className={`text-left text-2xl py-3 ${tab === "products" ? "font-semibold" : "opacity-80"}`}
          >
            Products
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <header className="h-[88px] bg-[#7B00E0] text-white flex items-center px-10">
          <h1 className="text-3xl font-medium">Admin Dashboard</h1>
          <div className="ml-auto">
            <Link href="/" className="underline text-white/90 hover:text-white">
              Back to Site
            </Link>
          </div>
        </header>

        <div className="p-10">
          {error && <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

          {/* Categories */}
          {tab === "categories" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-8 border-b">
                <h2 className="text-2xl font-semibold">Add Category</h2>
                <form onSubmit={handleCreateOrUpdateCategory} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name :</label>
                    <input
                      type="text"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                      placeholder="Enter Category Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Image :</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCatImage(e.target.files?.[0] || null)}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#7B00E0] text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      <Plus size={18} />
                      {editingCatId ? "Update Category" : "Add Category"}
                    </button>
                    {editingCatId && (
                      <button
                        type="button"
                        className="ml-3 px-6 py-3 rounded-lg border"
                        onClick={() => {
                          setEditingCatId(null)
                          setCatName("")
                          setCatImage(null)
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categories.map((cat) => (
                    <div key={cat._id} className="flex items-center gap-4 border rounded-xl shadow-sm p-4">
                      {cat.image ? (
                        <Image
                          src={mediaUrl(cat.image)}
                          alt={cat.name}
                          width={140}
                          height={100}
                          className="w-[140px] h-[100px] object-cover rounded-lg"
                          unoptimized
                        />
                      ) : (
                        <div className="w-[140px] h-[100px] rounded-lg bg-gray-100" />
                      )}
                      <div className="flex-1">
                        <p className="text-lg font-medium">{cat.name}</p>
                        <p className="text-sm text-gray-500">{cat.slug}</p>
                      </div>
                      <button onClick={() => startEditCategory(cat)} className="text-gray-600 hover:text-gray-900">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDeleteCategory(cat._id)} className="text-gray-600 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {categories.length === 0 && <div className="text-gray-500">No categories yet.</div>}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Category (Products) */}
          {tab === "sub-categories" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-8 border-b">
                <h2 className="text-2xl font-semibold">Add Sub-Category</h2>
                <form onSubmit={handleCreateOrUpdateSubCategory} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category Name :</label>
                    <input
                      type="text"
                      value={subCatName}
                      onChange={(e) => setSubCatName(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                      placeholder="Enter Sub-Category Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Category :</label>
                    <select
                      value={subCatCatId}
                      onChange={(e) => setSubCatCatId(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#7B00E0] text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      <Plus size={18} />
                      {editingSubCatId ? "Update Sub-Category" : "Add Sub-Category"}
                    </button>
                    {editingSubCatId && (
                      <button
                        type="button"
                        className="ml-3 px-6 py-3 rounded-lg border"
                        onClick={() => {
                          setEditingSubCatId(null)
                          setSubCatName("")
                          setSubCatCatId("")
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-xl font-semibold">Sub-Categories</h3>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subCategories.map((p) => (
                    <div key={p._id} className="flex items-center gap-4 border rounded-xl shadow-sm p-4">
                      <div className="flex-1">
                        <p className="text-lg font-medium">{p.name}</p>
                      </div>
                      <button onClick={() => startEditSubCategory(p)} className="text-gray-600 hover:text-gray-900">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDeleteSubCategory(p._id)} className="text-gray-600 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {subCategories.length === 0 && <div className="text-gray-500">No sub-categories yet.</div>}
                </div>
              </div>
            </div>
          )}

          {/* Products (Variants) */}
          {tab === "products" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-8 border-b">
                <h2 className="text-2xl font-semibold">Add Product</h2>
                <form onSubmit={handleCreateOrUpdateVariant} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name :</label>
                    <input
                      type="text"
                      value={variantName}
                      onChange={(e) => setVariantName(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                      placeholder="Enter Sub-Category Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU :</label>
                    <input
                      type="text"
                      value={variantSku}
                      onChange={(e) => setVariantSku(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Category :</label>
                    <select
                      value={variantCatId}
                      onChange={(e) => {
                        setVariantCatId(e.target.value)
                        setVariantSubCatId("")
                      }}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Image :</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setVariantImages(e.target.files)}
                        className="hidden"
                        id="variant-image-upload"
                      />
                      <label htmlFor="variant-image-upload" className="border rounded-lg px-4 py-2.5 cursor-pointer hover:bg-gray-50 flex items-center gap-2 text-[#7B00E0] font-medium">
                        <span>↑ Upload File</span>
                      </label>
                      <span className="text-gray-400 text-sm">
                        {variantImages && variantImages.length > 0 ? `${variantImages.length} file(s) chosen` : "No file Chosen"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Sub-Category :</label>
                    <select
                      value={variantSubCatId}
                      onChange={(e) => setVariantSubCatId(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                      disabled={!variantCatId}
                    >
                      <option value="">Select Sub-Category</option>
                      {subCategories
                        .filter((p) => !variantCatId || p.categoryId === variantCatId)
                        .map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Size :</label>
                    <input
                      type="text"
                      value={variantSize}
                      onChange={(e) => setVariantSize(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Available Sizes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Shape :</label>
                    <input
                      type="text"
                      value={variantShape}
                      onChange={(e) => setVariantShape(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Available Shapes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Quantity :</label>
                    <input
                      type="number"
                      value={variantMinQty}
                      onChange={(e) => setVariantMinQty(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Minimum Quantity"
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Material :</label>
                    <input
                      type="text"
                      value={variantMaterial}
                      onChange={(e) => setVariantMaterial(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Material"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description :</label>
                    <textarea
                      value={variantDesc}
                      onChange={(e) => setVariantDesc(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      rows={3}
                      placeholder="Enter Description"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#7B00E0] text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      <Plus size={18} />
                      {editingVariantId ? "Update Product" : "Add Product"}
                    </button>
                    {editingVariantId && (
                      <button
                        type="button"
                        className="ml-3 px-6 py-3 rounded-lg border"
                        onClick={() => {
                          setEditingVariantId(null)
                          setVariantName("")
                          setVariantCatId("")
                          setVariantSubCatId("")
                          setVariantImages(null)
                          setVariantSize("")
                          setVariantMinQty("")
                          setVariantDesc("")
                          setVariantShape("")
                          setVariantMaterial("")
                          setVariantPrice("")
                          setVariantStock("")
                          setVariantSku("")
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-xl font-semibold">Products List</h3>
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="">Select Sub-Category to view products</option>
                    {subCategories.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                {!selectedSubCategory ? (
                  <div className="text-gray-500">Select a Sub-Category to view products.</div>
                ) : (
                  <div className="space-y-3">
                    {variants.map((v) => (
                      <div key={v._id} className="flex items-center gap-4 border rounded-xl shadow-sm p-4">
                        {v.images?.[0] ? (
                          <Image
                            src={mediaUrl(v.images[0])}
                            alt={v.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded-lg"
                            unoptimized
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-100" />
                        )}
                        <div className="flex-1">
                          <p className="text-lg font-medium">{v.name}</p>
                          <p className="text-sm text-gray-500">
                            {v.sku ? `SKU: ${v.sku}` : ""}
                          </p>
                        </div>
                        <button onClick={() => startEditVariant(v)} className="text-gray-600 hover:text-gray-900">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDeleteVariant(v._id)} className="text-gray-600 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    {variants.length === 0 && <div className="text-gray-500">No products yet.</div>}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

