import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { toast } from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  mrp: number;
  image: string;
  brand: string;
  category: string;
  inStock: boolean;
}

export const useAddToCart = () => {
  const navigate = useNavigate();
  const { addItem, getItemById } = useCartStore();

  const addToCart = (product: Product, redirectToCart: boolean = false) => {
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }

    const existingItem = getItemById(product.id);
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      brand: product.brand,
      category: product.category,
      inStock: product.inStock,
      maxQuantity: 10
    });

    if (existingItem) {
      toast.success(`Increased quantity to ${existingItem.quantity + 1}`, {
        duration: 2000,
      });
    } else {
      toast.success(`${product.name} added to cart!`, {
        duration: 2000,
      });
    }

    // Navigate to cart if requested
    if (redirectToCart) {
      setTimeout(() => {
        navigate('/cart');
      }, 500);
    }
  };

  return { addToCart };
};