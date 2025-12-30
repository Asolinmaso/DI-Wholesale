/**
 * IndexedDB Cart Management
 * 
 * This module provides a simple IndexedDB wrapper for storing cart items
 * without requiring user authentication. All data is stored locally in the browser.
 * 
 * How it works:
 * 1. When a user adds items to cart, they're stored in IndexedDB
 * 2. Cart persists across browser sessions (until user clears browser data)
 * 3. Each cart item includes: productId, subProductId, name, image, quantity, size, shape, price
 * 4. Cart operations (add, remove, update, clear) are all handled through this module
 */

export interface CartItem {
  id: string // Unique ID for cart item (generated)
  productId: string // Product (Sub-Category) ID
  subProductId: string // SubProduct (variant) ID
  name: string
  image: string
  quantity: number
  size?: string
  shape?: string
}

const DB_NAME = "DI_WHOLESALE_DB"
const DB_VERSION = 2 // Incremented to add saved_products store
const STORE_NAME = "cart"
const SAVED_STORE_NAME = "saved_products"

// Initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: false })
        store.createIndex("productId", "productId", { unique: false })
        store.createIndex("subProductId", "subProductId", { unique: false })
      }
      if (!db.objectStoreNames.contains(SAVED_STORE_NAME)) {
        const savedStore = db.createObjectStore(SAVED_STORE_NAME, { keyPath: "id", autoIncrement: false })
        savedStore.createIndex("productId", "productId", { unique: false })
        savedStore.createIndex("subProductId", "subProductId", { unique: true })
      }
    }
  })
}

// Generate unique ID for cart item
function generateCartItemId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Add item to cart
 * If item with same productId, subProductId, size, and shape exists, it updates quantity
 */
export async function addToCart(item: Omit<CartItem, "id">): Promise<CartItem> {
  const db = await openDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    
    // Check if similar item exists (same product, size, shape)
    const index = store.index("subProductId")
    const request = index.getAll(item.subProductId)
    
    request.onsuccess = () => {
      const existingItems = request.result as CartItem[]
      const existingItem = existingItems.find(
        (i) => i.size === item.size && i.shape === item.shape
      )
      
      if (existingItem) {
        // Update quantity
        existingItem.quantity += item.quantity
        const updateRequest = store.put(existingItem)
        updateRequest.onsuccess = () => resolve(existingItem)
        updateRequest.onerror = () => reject(updateRequest.error)
      } else {
        // Add new item
        const newItem: CartItem = {
          ...item,
          id: generateCartItemId(),
        }
        const addRequest = store.add(newItem)
        addRequest.onsuccess = () => resolve(newItem)
        addRequest.onerror = () => reject(addRequest.error)
      }
    }
    
    request.onerror = () => reject(request.error)
  })
}

/**
 * Get all cart items
 */
export async function getCartItems(): Promise<CartItem[]> {
  const db = await openDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.getAll()
    
    request.onsuccess = () => resolve(request.result as CartItem[])
    request.onerror = () => reject(request.error)
  })
}

/**
 * Remove item from cart by ID
 */
export async function removeFromCart(itemId: string): Promise<void> {
  const db = await openDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(itemId)
    
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(itemId: string, quantity: number): Promise<void> {
  if (quantity <= 0) {
    await removeFromCart(itemId)
    return
  }
  
  const db = await openDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const getRequest = store.get(itemId)
    
    getRequest.onsuccess = () => {
      const item = getRequest.result as CartItem
      if (item) {
        item.quantity = quantity
        const updateRequest = store.put(item)
        updateRequest.onsuccess = () => resolve()
        updateRequest.onerror = () => reject(updateRequest.error)
      } else {
        reject(new Error("Item not found"))
      }
    }
    
    getRequest.onerror = () => reject(getRequest.error)
  })
}

/**
 * Clear all cart items
 */
export async function clearCart(): Promise<void> {
  const db = await openDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const request = store.clear()
    
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

/**
 * Get cart item count
 */
export async function getCartItemCount(): Promise<number> {
  const items = await getCartItems()
  return items.reduce((total, item) => total + item.quantity, 0)
}

/**
 * Get cart total price
 * Note: Price removed from SubProduct, so this returns 0
 */
export async function getCartTotal(): Promise<number> {
  return 0
}

// Saved/Bookmarked Products
export interface SavedProduct {
  id: string // Unique ID for saved item (generated)
  productId: string // Product (Sub-Category) ID
  subProductId: string // SubProduct (variant) ID
  name: string
  image: string
}

// Initialize IndexedDB for saved products
function openSavedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(SAVED_STORE_NAME)) {
        const store = db.createObjectStore(SAVED_STORE_NAME, { keyPath: "id", autoIncrement: false })
        store.createIndex("productId", "productId", { unique: false })
        store.createIndex("subProductId", "subProductId", { unique: true })
      }
    }
  })
}

// Generate unique ID for saved item
function generateSavedItemId(): string {
  return `saved_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Save/bookmark a product
 */
export async function saveProduct(item: Omit<SavedProduct, "id">): Promise<SavedProduct> {
  const db = await openSavedDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SAVED_STORE_NAME], "readwrite")
    const store = transaction.objectStore(SAVED_STORE_NAME)
    
    // Check if already saved
    const index = store.index("subProductId")
    const request = index.get(item.subProductId)
    
    request.onsuccess = () => {
      const existing = request.result as SavedProduct | undefined
      
      if (existing) {
        // Already saved, return existing
        resolve(existing)
      } else {
        // Add new saved item
        const newItem: SavedProduct = {
          ...item,
          id: generateSavedItemId(),
        }
        const addRequest = store.add(newItem)
        addRequest.onsuccess = () => resolve(newItem)
        addRequest.onerror = () => reject(addRequest.error)
      }
    }
    
    request.onerror = () => reject(request.error)
  })
}

/**
 * Remove saved product
 */
export async function unsaveProduct(subProductId: string): Promise<void> {
  const db = await openSavedDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SAVED_STORE_NAME], "readwrite")
    const store = transaction.objectStore(SAVED_STORE_NAME)
    const index = store.index("subProductId")
    const request = index.get(subProductId)
    
    request.onsuccess = () => {
      const item = request.result as SavedProduct | undefined
      if (item) {
        const deleteRequest = store.delete(item.id)
        deleteRequest.onsuccess = () => resolve()
        deleteRequest.onerror = () => reject(deleteRequest.error)
      } else {
        resolve() // Already not saved
      }
    }
    
    request.onerror = () => reject(request.error)
  })
}

/**
 * Check if product is saved
 */
export async function isProductSaved(subProductId: string): Promise<boolean> {
  const db = await openSavedDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SAVED_STORE_NAME], "readonly")
    const store = transaction.objectStore(SAVED_STORE_NAME)
    const index = store.index("subProductId")
    const request = index.get(subProductId)
    
    request.onsuccess = () => {
      resolve(!!request.result)
    }
    
    request.onerror = () => reject(request.error)
  })
}

/**
 * Get all saved products
 */
export async function getSavedProducts(): Promise<SavedProduct[]> {
  const db = await openSavedDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SAVED_STORE_NAME], "readonly")
    const store = transaction.objectStore(SAVED_STORE_NAME)
    const request = store.getAll()
    
    request.onsuccess = () => resolve(request.result as SavedProduct[])
    request.onerror = () => reject(request.error)
  })
}

