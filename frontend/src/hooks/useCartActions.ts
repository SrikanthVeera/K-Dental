import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

/**
 * Custom hook for cart actions with toast notifications
 * Provides easy-to-use functions for cart operations
 */
export const useCartActions = () => {
  const { addItem, removeItem, updateQuantity, clearCart, getItemById } = useCartStore();

  /**
   * Add product to cart with toast notification
   */
  const addToCart = (product: {
    id: number;
    name: string;
    price: number;
    mrp: number;
    image: string;
    brand: string;
    category?: string;
  }) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      brand: product.brand,
      category: product.category || "General",
      inStock: true,
      maxQuantity: 10
    });

    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      position: 'top-center',
    });
  };

  /**
   * Remove product from cart with toast notification
   */
  const removeFromCart = (id: number, productName?: string) => {
    removeItem(id);
    
    toast.success(
      productName ? `${productName} removed from cart` : 'Item removed from cart',
      {
        duration: 2000,
        position: 'top-center',
      }
    );
  };

  /**
   * Update product quantity in cart
   */
  const updateCartQuantity = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  /**
   * Clear entire cart with confirmation
   */
  const clearCartWithConfirm = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared', {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  /**
   * Check if product is in cart
   */
  const isInCart = (id: number) => {
    return !!getItemById(id);
  };

  /**
   * Get product quantity in cart
   */
  const getCartQuantity = (id: number) => {
    const item = getItemById(id);
    return item?.quantity || 0;
  };

  return {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCartWithConfirm,
    isInCart,
    getCartQuantity
  };
};
