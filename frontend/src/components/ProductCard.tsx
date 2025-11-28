import { Heart, ShoppingCart, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";
import toast from "react-hot-toast";
import BrandLogo from "./BrandLogo";

interface ProductProps {
  product: {
    id: number;
    slug: string;
    name: string;
    price: number;
    mrp: number;
    brand: string;
    image: string;
    rating: number;
    category?: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  const { addItem, getItemById } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const cartItem = getItemById(product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent any default behavior and event bubbling
    e.preventDefault();
    e.stopPropagation();
    
    // Validate product ID before adding
    if (!product.id || product.id === null || product.id === undefined) {
      console.error('❌ Cannot add to cart: Product ID is missing or invalid', product);
      toast.error('Cannot add product: Invalid product data');
      return;
    }

    // Validate required product fields
    if (!product.name || !product.price || !product.image) {
      console.error('❌ Cannot add to cart: Missing required product fields', product);
      toast.error('Cannot add product: Incomplete product data');
      return;
    }

    console.log('✅ Adding product to cart:', {
      id: product.id,
      name: product.name,
      price: product.price
    });
    
    setIsAdding(true);
    
    try {
      // Add full product object to cart without modifying original
      // Using spread operator to create new object
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
      
      // Verify item was added
      const addedItem = getItemById(product.id);
      if (addedItem) {
        console.log('✅ Product successfully added to cart. Quantity:', addedItem.quantity);
        toast.success(`${product.name} added to cart!`, {
          duration: 2000,
          position: 'top-center',
        });
      } else {
        console.error('❌ Product was not added to cart');
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('❌ Error adding product to cart:', error);
      toast.error('An error occurred while adding to cart');
    } finally {
      setTimeout(() => setIsAdding(false), 1000);
    }
  };

  return (
    <div className="border rounded-xl bg-white hover:shadow-md transition p-3 relative">
      <button className="absolute right-3 top-3 bg-white p-1 rounded-full shadow hover:text-primary" aria-label="wishlist">
        <Heart size={18} />
      </button>

      <Link to={`/product/${product.slug}`} className="block">
        <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-3" />
      </Link>

      <p className="text-xs text-gray-500">{product.brand}</p>

      <Link to={`/product/${product.slug}`} className="block">
        <h4 className="text-sm font-medium mt-1 line-clamp-2 hover:text-primary">{product.name}</h4>
      </Link>

      <div className="mt-2">
        <span className="text-primary font-bold text-lg">₹{product.price}</span>
        <span className="text-gray-500 line-through text-sm ml-2">₹{product.mrp}</span>
        <span className="text-green-600 text-xs ml-2 font-medium">{discount}% off</span>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`mt-3 w-full py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-all ${
          isAdding 
            ? 'bg-green-500 text-white' 
            : 'bg-primary text-white hover:bg-primaryDark'
        }`}
      >
        {isAdding ? (
          <>
            <Check size={16} /> Added!
          </>
        ) : (
          <>
            <ShoppingCart size={16} /> 
            {cartItem ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
          </>
        )}
      </button>
    </div>
  );
}
