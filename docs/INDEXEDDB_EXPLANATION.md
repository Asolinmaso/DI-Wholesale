# IndexedDB Cart System - How It Works

## Overview

Since there's no login/signup system, we use **IndexedDB** (a browser-based database) to store cart items locally on the user's device. This allows the cart to persist across browser sessions without requiring user authentication.

## What is IndexedDB?

IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. It's built into modern browsers and provides:

- **Persistent Storage**: Data survives browser restarts
- **Large Capacity**: Can store much more than localStorage (typically 50% of disk space)
- **Structured Data**: Stores objects with indexes for fast queries
- **Asynchronous**: Non-blocking operations

## Architecture

### 1. Database Structure

```
Database: DI_WHOLESALE_DB
├── Object Store: cart
    ├── Key: id (unique cart item ID)
    ├── Index: productId
    └── Index: subProductId
```

### 2. Cart Item Structure

Each cart item contains:
```typescript
{
  id: string              // Unique identifier (auto-generated)
  productId: string       // Product (Sub-Category) ID
  subProductId: string    // SubProduct (variant) ID
  name: string            // Product name
  image: string           // Product image URL
  quantity: number        // Quantity in boxes
  size?: string          // Selected size (e.g., "6\"")
  shape?: string         // Selected shape (e.g., "Straight")
  price: number          // Unit price
  stockCount: number     // Available stock
}
```

## How It Works

### Step 1: User Adds Item to Cart

1. User clicks "Add to Cart" on a product
2. Modal opens for size/shape/quantity selection
3. User selects options and confirms
4. `addToCart()` function is called:
   ```typescript
   await addToCart({
     productId: "...",
     subProductId: "...",
     name: "Spencerwell Artery Forceps",
     image: "...",
     quantity: 100,
     size: "6\"",
     shape: "Straight",
     price: 500,
     stockCount: 1000
   })
   ```

### Step 2: Data Storage

1. IndexedDB checks if item with same `subProductId`, `size`, and `shape` exists
2. If exists: Updates quantity (adds to existing)
3. If not: Creates new cart item with unique ID
4. Data is saved to IndexedDB

### Step 3: Cart Display

1. Cart page loads
2. `getCartItems()` fetches all items from IndexedDB
3. Items are displayed with options to:
   - Remove individual items
   - Remove all items
   - Proceed to checkout

### Step 4: Checkout

1. User fills checkout form
2. Cart items are read from IndexedDB
3. Order is submitted (currently just logs to console)
4. Cart can be cleared after successful order

## Key Features

### 1. Smart Merging
- If user adds same product with same size/shape, quantities are combined
- Prevents duplicate entries in cart

### 2. Persistence
- Cart survives browser refresh
- Cart survives browser restart
- Cart persists until user clears browser data

### 3. Real-time Updates
- Cart count in navbar updates immediately
- Cart page reflects current state
- Changes sync across tabs (via storage events)

### 4. No Server Required
- All cart operations happen client-side
- No API calls needed for cart management
- Works offline

## File Structure

```
lib/
├── indexeddb.ts          # Core IndexedDB operations
└── cart-context.tsx      # React context for cart state

app/
├── layout.tsx            # Wraps app with CartProvider
├── cart/page.tsx         # Cart page (reads from IndexedDB)
└── checkout/page.tsx     # Checkout page (reads from IndexedDB)

components/
└── navbar.tsx            # Shows cart count from context
```

## API Functions

### `addToCart(item)`
Adds item to cart or updates quantity if exists.

### `getCartItems()`
Returns all cart items.

### `removeFromCart(itemId)`
Removes specific item from cart.

### `updateCartItemQuantity(itemId, quantity)`
Updates quantity of specific item.

### `clearCart()`
Removes all items from cart.

### `getCartItemCount()`
Returns total quantity of all items.

### `getCartTotal()`
Returns total price of all items.

## React Context Usage

The `CartProvider` wraps the entire app and provides:

```typescript
const {
  cartItems,        // Array of cart items
  cartCount,        // Total quantity count
  loading,          // Loading state
  addToCart,        // Add item function
  removeFromCart,   // Remove item function
  updateQuantity,   // Update quantity function
  clearAll,         // Clear cart function
  refreshCart       // Refresh cart from DB
} = useCart()
```

## Browser Compatibility

IndexedDB is supported in:
- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (iOS 10+, macOS 10.7+)
- ✅ Opera (all versions)

## Data Limits

- **Chrome/Edge**: ~60% of available disk space
- **Firefox**: ~50% of available disk space
- **Safari**: ~1GB (iOS), ~1GB (macOS)

For a cart system, this is more than sufficient (typical cart: <100KB).

## Security Considerations

1. **Client-Side Only**: All data is stored locally
2. **No Sensitive Data**: Only product info, no personal data
3. **User Control**: User can clear data anytime via browser settings
4. **No Authentication**: Works without login (as intended)

## Future Enhancements

If you add user authentication later, you can:
1. Sync IndexedDB cart to server on login
2. Merge server cart with local cart
3. Keep IndexedDB as backup/offline support

## Testing

To test the cart system:

1. Add items to cart from product pages
2. Check cart count in navbar updates
3. Visit `/cart` to see items
4. Refresh page - cart should persist
5. Close and reopen browser - cart should persist
6. Remove items and verify updates
7. Proceed to checkout and verify items appear

## Troubleshooting

### Cart not persisting?
- Check browser IndexedDB support
- Check browser storage permissions
- Clear browser cache and try again

### Cart count not updating?
- Ensure `CartProvider` wraps your app in `layout.tsx`
- Check browser console for errors
- Verify `useCart()` is called within provider

### Items not adding?
- Check browser console for IndexedDB errors
- Verify product data is complete
- Check size/shape are selected

## Summary

IndexedDB provides a robust, persistent cart system without requiring user authentication. It's perfect for e-commerce sites that want to offer a seamless shopping experience while keeping the barrier to entry low (no signup required).

