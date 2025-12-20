export type Category = {
  _id: string
  name: string
  slug: string
  image?: string
}

export type Product = {
  _id: string
  name: string
  description?: string
  productSize?: string
  productShape?: string
  minimumQuantity?: number
  material?: string
  categoryId: string
  price: number
  stockCount: number
  images: string[]
}

export type SubProduct = {
  _id: string
  productId: string
  name: string
  sku?: string
  price: number
  stockCount: number
  images: string[]
}

function apiBaseUrl() {
  return (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000").replace(/\/+$/, "")
}

export function apiUrl(path: string) {
  if (!path.startsWith("/")) path = `/${path}`
  return `${apiBaseUrl()}${path}`
}

export function mediaUrl(path: string | undefined) {
  if (!path) return ""
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return apiUrl(path)
}

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) {
    const msg = data?.error || res.statusText || "request_failed"
    throw new Error(msg)
  }
  return data as T
}

export async function listCategories(): Promise<Category[]> {
  const res = await fetchJson<{ data: Category[] }>(apiUrl("/api/categories"), {
    cache: "no-store",
  })
  return res.data
}

export async function createCategory(form: FormData): Promise<Category> {
  const res = await fetchJson<{ data: Category }>(apiUrl("/api/categories"), {
    method: "POST",
    body: form,
  })
  return res.data
}

export async function updateCategory(id: string, form: FormData): Promise<Category> {
  const res = await fetchJson<{ data: Category }>(apiUrl(`/api/categories/${id}`), {
    method: "PUT",
    body: form,
  })
  return res.data
}

export async function deleteCategory(id: string): Promise<void> {
  await fetchJson(apiUrl(`/api/categories/${id}`), { method: "DELETE" })
}

export async function listProducts(categoryId?: string): Promise<Product[]> {
  const qs = categoryId ? `?categoryId=${encodeURIComponent(categoryId)}` : ""
  const res = await fetchJson<{ data: Product[] }>(apiUrl(`/api/products${qs}`), {
    cache: "no-store",
  })
  return res.data
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetchJson<{ data: Product }>(apiUrl(`/api/products/${id}`), { cache: "no-store" })
  return res.data
}

export async function createProduct(form: FormData): Promise<Product> {
  const res = await fetchJson<{ data: Product }>(apiUrl("/api/products"), {
    method: "POST",
    body: form,
  })
  return res.data
}

export async function updateProduct(id: string, form: FormData): Promise<Product> {
  const res = await fetchJson<{ data: Product }>(apiUrl(`/api/products/${id}`), {
    method: "PUT",
    body: form,
  })
  return res.data
}

export async function deleteProduct(id: string): Promise<void> {
  await fetchJson(apiUrl(`/api/products/${id}`), { method: "DELETE" })
}

export async function listSubProducts(productId: string): Promise<SubProduct[]> {
  const res = await fetchJson<{ data: SubProduct[] }>(apiUrl(`/api/products/${productId}/sub-products`), {
    cache: "no-store",
  })
  return res.data
}

export async function createSubProduct(productId: string, form: FormData): Promise<SubProduct> {
  const res = await fetchJson<{ data: SubProduct }>(apiUrl(`/api/products/${productId}/sub-products`), {
    method: "POST",
    body: form,
  })
  return res.data
}

export async function updateSubProduct(productId: string, subId: string, form: FormData): Promise<SubProduct> {
  const res = await fetchJson<{ data: SubProduct }>(apiUrl(`/api/products/${productId}/sub-products/${subId}`), {
    method: "PUT",
    body: form,
  })
  return res.data
}

export async function deleteSubProduct(productId: string, subId: string): Promise<void> {
  await fetchJson(apiUrl(`/api/products/${productId}/sub-products/${subId}`), { method: "DELETE" })
}


