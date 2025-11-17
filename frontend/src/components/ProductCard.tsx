import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

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
  };
}

export default function ProductCard({ product }: ProductProps) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

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

      <Link
        to={`/product/${product.slug}`}
        className="mt-3 w-full bg-primary text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-primaryDark"
      >
        <ShoppingCart size={16} /> View / Add
      </Link>
    </div>
  );
}
