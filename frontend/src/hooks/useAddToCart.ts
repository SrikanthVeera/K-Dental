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
  const { addItem, getItemById } = useCartStore();

  const addToCart = (product: Product) => {
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
      toast.success(`Increased quantity to ${existingItem.quantity + 1}`);
    } else {
      toast.success(`${product.name} added to cart!`);
    }
  };

  return { addToCart };
};