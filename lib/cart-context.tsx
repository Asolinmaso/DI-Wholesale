"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { CartItem, addToCart as addToCartDB, getCartItems, removeFromCart as removeFromCartDB, updateCartItemQuantity, clearCart, getCartItemCount } from "./indexeddb"

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  loading: boolean
  addToCart: (item: Omit<CartItem, "id">) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearAll: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const refreshCart = useCallback(async () => {
    try {
      const items = await getCartItems()
      const count = await getCartItemCount()
      setCartItems(items)
      setCartCount(count)
    } catch (error) {
      console.error("Failed to load cart:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshCart()
    
    // Listen for storage events (if cart is updated in another tab)
    const handleStorageChange = () => {
      refreshCart()
    }
    window.addEventListener("storage", handleStorageChange)
    
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [refreshCart])

  const addToCart = useCallback(async (item: Omit<CartItem, "id">) => {
    try {
      await addToCartDB(item)
      await refreshCart()
    } catch (error) {
      console.error("Failed to add to cart:", error)
      throw error
    }
  }, [refreshCart])

  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      await removeFromCartDB(itemId)
      await refreshCart()
    } catch (error) {
      console.error("Failed to remove from cart:", error)
      throw error
    }
  }, [refreshCart])

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      await updateCartItemQuantity(itemId, quantity)
      await refreshCart()
    } catch (error) {
      console.error("Failed to update quantity:", error)
      throw error
    }
  }, [refreshCart])

  const clearAll = useCallback(async () => {
    try {
      await clearCart()
      await refreshCart()
    } catch (error) {
      console.error("Failed to clear cart:", error)
      throw error
    }
  }, [refreshCart])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearAll,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

