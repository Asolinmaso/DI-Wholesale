/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Package, FolderOpen, Pencil, Search, ChevronLeft, ChevronRight } from "lucide-react"

// Custom Select Component with custom arrow
function CustomSelect({ children, className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={`w-full border rounded-lg px-3 py-2 appearance-none pr-10 ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.825786 4.46821L8.03978 11.2358C8.29746 11.4781 8.60354 11.6703 8.94049 11.8014C9.27744 11.9325 9.63864 12 10.0034 12C10.3682 12 10.7294 11.9325 11.0664 11.8014C11.4033 11.6703 11.7094 11.4781 11.9671 11.2358L19.1811 4.46821C20.9358 2.82203 19.6824 0 17.2035 0H2.77551C0.296573 0 -0.92897 2.82203 0.825786 4.46821Z" fill="#8A8A8A"/>
        </svg>
      </div>
    </div>
  )
}

// Multi-Select Component
function MultiSelect({ value, onChange, options, placeholder }: {
  value: string[],
  onChange: (value: string[]) => void,
  options: { value: string, label: string }[],
  placeholder: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    onChange(newValue)
  }

  const handleRemove = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue))
  }

  return (
    <div className="relative">
      <div
        className="w-full border rounded-lg px-3 py-2 min-h-[42px] cursor-pointer bg-white flex flex-wrap gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 ? (
          <span className="text-gray-500">{placeholder}</span>
        ) : (
          value.map(val => {
            const option = options.find(opt => opt.value === val)
            return (
              <span
                key={val}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {option?.label || val}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove(val)
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )
          })
        )}
        <div className="flex-1 flex justify-end">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {options.map(option => (
            <div
              key={option.value}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                value.includes(option.value) ? 'bg-blue-50 text-blue-700' : ''
              }`}
              onClick={() => handleToggle(option.value)}
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => {}}
                  className="rounded"
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Search and Pagination Component
function SearchAndPagination({
  search,
  onSearchChange,
  pagination,
  onPageChange,
  placeholder = "Search..."
}: {
  search: string
  onSearchChange: (value: string) => void
  pagination: any
  onPageChange: (page: number) => void
  placeholder?: string
}) {
  if (!pagination) return null

  const { currentPage, totalPages, totalProducts, hasPrevPage, hasNextPage } = pagination

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#7B00E0]"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Pagination Info */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages} ({totalProducts} total)
        </span>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-2 bg-[#7B00E0] text-white rounded-lg text-sm font-medium">
            {currentPage}
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

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
  listAllSubProducts,
  createSubProduct,
  updateSubProduct,
  deleteSubProduct,
  mediaUrl,
  verifyToken,
  Category,
  Product,
  SubProduct,
} from "@/lib/api"

export default function AdminPage() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [tab, setTab] = useState<"categories" | "sub-categories" | "products">("categories")
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<Product[]>([])
  const [variants, setVariants] = useState<SubProduct[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("") // filter sub-categories
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("") // for variants
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("") // filter products by category
  const [selectedSubCategoryFilter, setSelectedSubCategoryFilter] = useState<string>("") // filter products by subcategory
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Pagination and search state
  const [categoriesPage, setCategoriesPage] = useState(1)
  const [subCategoriesPage, setSubCategoriesPage] = useState(1)
  const [productsPage, setProductsPage] = useState(1)
  const [categoriesSearch, setCategoriesSearch] = useState("")
  const [subCategoriesSearch, setSubCategoriesSearch] = useState("")
  const [productsSearch, setProductsSearch] = useState("")

  // Pagination data
  const [categoriesPagination, setCategoriesPagination] = useState<any>(null)
  const [subCategoriesPagination, setSubCategoriesPagination] = useState<any>(null)
  const [productsPagination, setProductsPagination] = useState<any>(null)

  // Category form
  const [catName, setCatName] = useState("")
  const [catImages, setCatImages] = useState<FileList | null>(null)
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
  const [variantSize, setVariantSize] = useState<string[]>([])
  const [variantMinQty, setVariantMinQty] = useState("")
  const [variantDesc, setVariantDesc] = useState("")
  const [variantShape, setVariantShape] = useState<string[]>([])
  const [variantMaterial, setVariantMaterial] = useState("")
  const [variantComposition, setVariantComposition] = useState("")
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication - COMMENTED OUT FOR TESTING
    /*
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }
    verifyToken(token)
      .then(() => {
        setAuthenticated(true)
        setCheckingAuth(false)
        fetchCategories()
        fetchSubCategories()
      })
      .catch(() => {
        localStorage.removeItem("admin_token")
        localStorage.removeItem("admin_email")
        router.push("/admin/login")
      })
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // TEMPORARILY BYPASS AUTH FOR TESTING
    setAuthenticated(true)
    setCheckingAuth(false)
    fetchCategories()
    fetchSubCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    if (authenticated) {
      setSubCategoriesPage(1) // Reset to first page when category changes
      fetchSubCategories(selectedCategory || undefined, "", 1)
    }
  }, [selectedCategory, authenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (authenticated && selectedSubCategory) {
      setProductsPage(1) // Reset to first page when subcategory changes
      fetchVariants(selectedSubCategory, "", 1)
    } else if (authenticated) {
      setVariants([])
      setProductsPagination(null)
    }
  }, [selectedSubCategory, authenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (authenticated && variantCatId) {
      fetchSubCategories(variantCatId)
    }
  }, [variantCatId, authenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle search and pagination changes
  useEffect(() => {
    if (authenticated && tab === "categories") {
      fetchCategories(categoriesSearch, categoriesPage)
    }
  }, [categoriesSearch, categoriesPage, tab, authenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (authenticated && tab === "sub-categories") {
      fetchSubCategories(selectedCategory || undefined, subCategoriesSearch, subCategoriesPage)
    }
  }, [subCategoriesSearch, subCategoriesPage, tab, authenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  // Load subcategories when category filter is selected in products tab
  useEffect(() => {
    if (authenticated && tab === "products" && selectedCategoryFilter) {
      fetchSubCategories(selectedCategoryFilter, "", 1)
    }
  }, [selectedCategoryFilter, tab, authenticated]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (authenticated && tab === "products") {
      // Use new endpoint to get all products with category/subcategory info
      fetchAllProducts(productsSearch, selectedCategoryFilter, selectedSubCategoryFilter, productsPage)
    }
  }, [productsSearch, productsPage, tab, authenticated, selectedCategoryFilter, selectedSubCategoryFilter]) // eslint-disable-line react-hooks/exhaustive-deps

  // COMMENTED OUT AUTH CHECK FOR TESTING
  /*
  if (checkingAuth || !authenticated) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-gray-500">Checking authentication...</div>
      </div>
    )
  }
  */

  const fetchCategories = useCallback(async (search = categoriesSearch, page = categoriesPage) => {
    try {
      setLoading(true)
      const response = await listCategories(search || undefined, page, 12)
      setCategories(response.data)
      setCategoriesPagination(response.pagination)
    } catch {
      setError("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }, [categoriesSearch, categoriesPage])

  const fetchSubCategories = useCallback(async (catId?: string, search = subCategoriesSearch, page = subCategoriesPage) => {
    try {
      setLoading(true)
      const response = await listProducts(catId || undefined, search || undefined, page, 12)
      setSubCategories(response.data)
      setSubCategoriesPagination(response.pagination)
    } catch {
      setError("Failed to load sub-categories")
    } finally {
      setLoading(false)
    }
  }, [subCategoriesSearch, subCategoriesPage])

  const fetchVariants = useCallback(async (productId: string, search = productsSearch, page = productsPage) => {
    try {
      setLoading(true)
      const response = await listSubProducts(productId, search || undefined, page, 12)
      setVariants(response.data)
      setProductsPagination(response.pagination)
    } catch {
      setError("Failed to load products")
    } finally {
      setLoading(false)
    }
  }, [productsSearch, productsPage])

  // Fetch all products with category and subcategory info
  const fetchAllProducts = useCallback(async (search = productsSearch, categoryId = selectedCategoryFilter, productId = selectedSubCategoryFilter, page = productsPage) => {
    try {
      setLoading(true)
      const response = await listAllSubProducts(
        search || undefined,
        categoryId || undefined,
        productId || undefined,
        page,
        12
      )
      setVariants(response.data as any)
      setProductsPagination(response.pagination)
    } catch {
      setError("Failed to load products")
    } finally {
      setLoading(false)
    }
  }, [productsSearch, selectedCategoryFilter, selectedSubCategoryFilter, productsPage])

  async function handleCreateOrUpdateCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!catName) return
    setLoading(true)
    setError("")
    try {
      const form = new FormData()
      form.append("name", catName)
      if (catImages) Array.from(catImages).forEach((f) => form.append("images", f))
      if (editingCatId) await updateCategory(editingCatId, form)
      else await createCategory(form)
      setCatName("")
      setCatImages(null)
      setEditingCatId(null)
      fetchCategories(categoriesSearch, categoriesPage)
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
    setCatImages(null)
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
      fetchSubCategories(selectedCategory || undefined, subCategoriesSearch, subCategoriesPage)
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
      fetchSubCategories(selectedCategory || undefined, subCategoriesSearch, subCategoriesPage)
    } catch {
      setError("Failed to delete sub-category")
    }
  }

  async function handleCreateOrUpdateVariant(e: React.FormEvent) {
    e.preventDefault()
    if (!variantName || !variantCatId) return
    
    setLoading(true)
    setError("")
    try {
      const form = new FormData()
      form.append("name", variantName)
      form.append("productSize", JSON.stringify(variantSize))
      form.append("productShape", JSON.stringify(variantShape))
      form.append("minimumQuantity", "10") // Always 10 for users
      form.append("stockCount", variantMinQty || "0") // Stocks field
      form.append("material", variantMaterial || "")
      form.append("description", variantDesc || "")
      form.append("composition", variantComposition || "")
      if (variantImages) Array.from(variantImages).forEach((f) => form.append("images", f))

      // Subcategory is optional - if not provided, create or use a default one
      let subCatIdToUse = variantSubCatId
      
      if (!subCatIdToUse) {
        // Try to find the first subcategory for this category
        const firstSubCat = subCategories.find(p => p.categoryId === variantCatId)
        if (firstSubCat) {
          subCatIdToUse = firstSubCat._id
        } else {
          // Automatically create a default subcategory
          try {
            const defaultSubCatForm = new FormData()
            defaultSubCatForm.append("name", "General")
            defaultSubCatForm.append("categoryId", variantCatId)
            const newSubCat = await createProduct(defaultSubCatForm)
            subCatIdToUse = newSubCat._id
            // Refresh subcategories list
            await fetchSubCategories(variantCatId)
          } catch (err) {
            throw new Error("Failed to create default subcategory. Please create a subcategory manually first.")
          }
        }
      }
      
      if (editingVariantId) await updateSubProduct(subCatIdToUse, editingVariantId, form)
      else await createSubProduct(subCatIdToUse, form)

      setVariantName("")
      setVariantCatId("")
      setVariantSubCatId("")
      setVariantImages(null)
      setVariantSize([])
      setVariantMinQty("")
      setVariantDesc("")
      setVariantShape([])
      setVariantMaterial("")
      setVariantComposition("")
      setEditingVariantId(null)
      if (variantSubCatId) fetchVariants(variantSubCatId, productsSearch, productsPage)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save product")
    } finally {
      setLoading(false)
    }
  }

  function startEditVariant(v: any) {
    setEditingVariantId(v._id)
    setVariantName(v.name)
    setVariantImages(null)
    setVariantSize(Array.isArray(v.productSize) ? v.productSize : (v.productSize ? [v.productSize] : []))
    setVariantMinQty(String(v.stockCount || ""))
    setVariantDesc(v.description || "")
    setVariantShape(Array.isArray(v.productShape) ? v.productShape : (v.productShape ? [v.productShape] : []))
    setVariantMaterial(v.material || "")
    setVariantComposition(v.composition || "")
    
    // Handle both old format (v.productId as string) and new format (v.productId as populated object)
    const productId = typeof v.productId === 'string' ? v.productId : v.productId?._id
    const categoryId = typeof v.productId === 'object' && v.productId?.categoryId 
      ? (typeof v.productId.categoryId === 'string' ? v.productId.categoryId : v.productId.categoryId?._id)
      : null
    
    // Find the product to get categoryId if not already populated
    if (!categoryId) {
      const prod = subCategories.find((p) => p._id === productId)
      if (prod) {
        setVariantCatId(prod.categoryId)
        setVariantSubCatId(productId)
      }
    } else {
      setVariantCatId(categoryId)
      setVariantSubCatId(productId)
    }
    setTab("products")
    setSelectedSubCategory(productId)
  }

  async function handleDeleteVariant(subId: string, productId?: string) {
    const productIdToUse = productId || selectedSubCategory
    if (!productIdToUse) return
    if (!confirm("Delete this product?")) return
    try {
      await deleteSubProduct(productIdToUse, subId)
      if (tab === "products") {
        // Refresh all products list
        fetchAllProducts(productsSearch, selectedCategoryFilter, selectedSubCategoryFilter, productsPage)
      } else {
        fetchVariants(productIdToUse, productsSearch, productsPage)
      }
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
          <div className="ml-auto flex items-center gap-4">
            <button
              onClick={() => {
                localStorage.removeItem("admin_token")
                localStorage.removeItem("admin_email")
                router.push("/admin/login")
              }}
              className="text-white/90 hover:text-white underline"
            >
              Logout
            </button>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Images :</label>
                    <div className="border border-gray-300 rounded-lg bg-gray-50 flex items-center overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setCatImages(e.target.files)}
                        className="hidden"
                        id="cat-image-upload"
                      />
                      <label htmlFor="cat-image-upload" className="bg-gray-200 rounded-lg px-4 py-2.5 cursor-pointer hover:bg-gray-300 transition-colors flex items-center gap-2 text-gray-700 font-medium flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2V10M4 6L8 2L12 6M2 13H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Upload File</span>
                      </label>
                      <span className="text-gray-400 text-sm px-4 flex-1">
                        {catImages && catImages.length > 0 ? `${catImages.length} file(s) chosen` : "No file Chosen"}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#7B00E0] text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      {editingCatId ? "Update Category" : "Add Category"}
                    </button>
                    {editingCatId && (
                      <button
                        type="button"
                        className="ml-3 px-6 py-3 rounded-lg border"
                        onClick={() => {
                          setEditingCatId(null)
                          setCatName("")
                          setCatImages(null)
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="p-8">
                <SearchAndPagination
                  search={categoriesSearch}
                  onSearchChange={(value) => {
                    setCategoriesSearch(value)
                    setCategoriesPage(1) // Reset to first page on search
                  }}
                  pagination={categoriesPagination}
                  onPageChange={setCategoriesPage}
                  placeholder="Search categories..."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categories.map((cat) => (
                    <div key={cat._id} className="flex items-center gap-4 border rounded-xl shadow-sm p-4">
                      {(cat.images && cat.images.length > 0) || cat.image ? (
                        <div className="flex gap-2">
                          {cat.images && cat.images.length > 0 ? (
                            <>
                              {cat.images.slice(0, 2).map((image, index) => (
                                <Image
                                  key={index}
                                  src={mediaUrl(image)}
                                  alt={`${cat.name} ${index + 1}`}
                                  width={140}
                                  height={100}
                                  className="w-[65px] h-[65px] object-cover rounded-lg"
                                  unoptimized
                                />
                              ))}
                              {cat.images.length > 2 && (
                                <div className="w-[65px] h-[65px] rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                                  +{cat.images.length - 2}
                                </div>
                              )}
                            </>
                          ) : cat.image ? (
                            <Image
                              src={mediaUrl(cat.image)}
                              alt={cat.name}
                              width={140}
                              height={100}
                              className="w-[140px] h-[100px] object-cover rounded-lg"
                              unoptimized
                            />
                          ) : null}
                        </div>
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
                    <CustomSelect
                      value={subCatCatId}
                      onChange={(e) => setSubCatCatId(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </CustomSelect>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#7B00E0] text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 inline-flex items-center gap-2"
                    >
                     
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
                  <CustomSelect
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </CustomSelect>
                </div>
                <SearchAndPagination
                  search={subCategoriesSearch}
                  onSearchChange={(value) => {
                    setSubCategoriesSearch(value)
                    setSubCategoriesPage(1) // Reset to first page on search
                  }}
                  pagination={subCategoriesPagination}
                  onPageChange={setSubCategoriesPage}
                  placeholder="Search sub-categories..."
                />
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
                      placeholder="Enter Product Name "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Category :</label>
                    <CustomSelect
                      value={variantCatId}
                      onChange={(e) => {
                        setVariantCatId(e.target.value)
                        setVariantSubCatId("")
                      }}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </CustomSelect>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image (Optional) :</label>
                    <div className="border border-gray-300 rounded-lg bg-gray-50 flex items-center overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setVariantImages(e.target.files)}
                        className="hidden"
                        id="variant-image-upload"
                      />
                      <label htmlFor="variant-image-upload" className="bg-gray-200 rounded-lg px-4 py-2.5 cursor-pointer hover:bg-gray-300 transition-colors flex items-center gap-2 text-gray-700 font-medium flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2V10M4 6L8 2L12 6M2 13H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Upload File</span>
                      </label>
                      <span className="text-gray-400 text-sm px-4 flex-1">
                        {variantImages && variantImages.length > 0 ? `${variantImages.length} file(s) chosen` : "No file Chosen (Default: Logo2.png)"}
                      </span>
                    </div>
                  </div>
                  {(() => {
                    const selectedCategory = categories.find(c => c._id === variantCatId)
                    const isMedicine = selectedCategory?.name?.toLowerCase().includes("medicine") || selectedCategory?.slug?.toLowerCase().includes("medicine")
                    
                    // Sub-Category is optional for all categories
                    return (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Sub-Category (Optional) :</label>
                        <CustomSelect
                          value={variantSubCatId}
                          onChange={(e) => setVariantSubCatId(e.target.value)}
                          disabled={!variantCatId}
                        >
                          <option value="">Select Sub-Category (Optional)</option>
                          {subCategories
                            .filter((p) => !variantCatId || p.categoryId === variantCatId)
                            .map((p) => (
                              <option key={p._id} value={p._id}>
                                {p.name}
                              </option>
                            ))}
                        </CustomSelect>
                      </div>
                    )
                  })()}
                  {/* Stocks - shown for all categories */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stocks :</label>
                    <input
                      type="number"
                      value={variantMinQty}
                      onChange={(e) => setVariantMinQty(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Stocks"
                      min={0}
                    />
                  </div>
                  
                  {/* Medicine-specific fields */}
                  {(() => {
                    const selectedCategory = categories.find(c => c._id === variantCatId)
                    const isMedicine = selectedCategory?.name?.toLowerCase().includes("medicine") || selectedCategory?.slug?.toLowerCase().includes("medicine")
                    
                    // Hide these fields for medicines category
                    if (!isMedicine) {
                      return (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Size :</label>
                            <MultiSelect
                              value={variantSize}
                              onChange={setVariantSize}
                              options={[
                                { value: '3.5"', label: '3.5"' },
                                { value: '5"', label: '5"' },
                                { value: '5.5"', label: '5.5"' },
                                { value: '6"', label: '6"' },
                                { value: '6.5"', label: '6.5"' },
                                { value: '7"', label: '7"' },
                                { value: '7.5"', label: '7.5"' },
                                { value: '8"', label: '8"' },
                                { value: '9"', label: '9"' },
                                { value: '10"', label: '10"' },
                                { value: '11"', label: '11"' },
                                { value: '12"', label: '12"' },
                                { value: '14"', label: '14"' }
                              ]}
                              placeholder="Select sizes..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Shape :</label>
                            <MultiSelect
                              value={variantShape}
                              onChange={setVariantShape}
                              options={[
                                { value: 'Straight', label: 'Straight' },
                                { value: 'Curved', label: 'Curved' },
                                { value: 'Teeth', label: 'Teeth' },
                                { value: 'Plain', label: 'Plain' }
                              ]}
                              placeholder="Select shapes..."
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
                        </>
                      )
                    }
                    
                    // Show medicine-specific fields
                    return isMedicine ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Composition :</label>
                        <input
                          type="text"
                          value={variantComposition}
                          onChange={(e) => setVariantComposition(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2"
                          placeholder="Enter Composition (e.g., Aceclofenac 100 mg)"
                        />
                      </div>
                    ) : null
                  })()}
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#7B00E0] text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 inline-flex items-center gap-2"
                    >
                     
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
                          setVariantSize([])
                          setVariantMinQty("")
                          setVariantDesc("")
                          setVariantShape([])
                          setVariantMaterial("")
                          setVariantComposition("")
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <h3 className="text-xl font-semibold">All Products</h3>
                  <CustomSelect
                    value={selectedCategoryFilter}
                    onChange={(e) => {
                      setSelectedCategoryFilter(e.target.value)
                      setSelectedSubCategoryFilter("")
                      setProductsPage(1)
                    }}
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </CustomSelect>
                  <CustomSelect
                    value={selectedSubCategoryFilter}
                    onChange={(e) => {
                      setSelectedSubCategoryFilter(e.target.value)
                      setProductsPage(1)
                    }}
                    disabled={!selectedCategoryFilter}
                  >
                    <option value="">All Sub-Categories</option>
                    {subCategories
                      .filter((p) => !selectedCategoryFilter || p.categoryId === selectedCategoryFilter)
                      .map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                  </CustomSelect>
                </div>
                <SearchAndPagination
                  search={productsSearch}
                  onSearchChange={(value) => {
                    setProductsSearch(value)
                    setProductsPage(1) // Reset to first page on search
                  }}
                  pagination={productsPagination}
                  onPageChange={setProductsPage}
                  placeholder="Search products..."
                />
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Image</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Product Name</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Category</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Sub-Category</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Size</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Shape</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Stocks</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants.map((v: any) => {
                        const product = v.productId
                        const category = product?.categoryId
                        return (
                          <tr key={v._id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">
                              {v.images?.[0] ? (
                                <Image
                                  src={mediaUrl(v.images[0])}
                                  alt={v.name}
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 object-cover rounded-lg"
                                  unoptimized
                                />
                              ) : (
                                <Image
                                  src="/Medicine_image.png"
                                  alt={v.name}
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 object-contain rounded-lg"
                                  unoptimized
                                />
                              )}
                            </td>
                            <td className="px-4 py-3 font-medium">{v.name}</td>
                            <td className="px-4 py-3 text-gray-600">{category?.name || "N/A"}</td>
                            <td className="px-4 py-3 text-gray-600">{product?.name || "N/A"}</td>
                            <td className="px-4 py-3 text-gray-600">
                              {Array.isArray(v.productSize) && v.productSize.length > 0 ? v.productSize.join(", ") : "-"}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {Array.isArray(v.productShape) && v.productShape.length > 0 ? v.productShape.join(", ") : "-"}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                                (v.stockCount || 0) > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}>
                                {v.stockCount || 0}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => {
                                    if (product?._id) {
                                      setSelectedSubCategory(product._id)
                                      startEditVariant(v)
                                    }
                                  }} 
                                  className="text-gray-600 hover:text-gray-900"
                                  title="Edit"
                                >
                                  <Pencil size={18} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteVariant(v._id, product?._id)} 
                                  className="text-gray-600 hover:text-red-600"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  {variants.length === 0 && !loading && (
                    <div className="text-center py-12 text-gray-500">No products found.</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

