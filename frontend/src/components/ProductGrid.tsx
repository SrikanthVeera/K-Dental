import { useState } from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
  inStock: boolean;
}

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Dental Ultrasonic Scaler",
    brand: "Woodpecker",
    price: 12999,
    originalPrice: 15999,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop",
    discount: 19,
    inStock: true
  },
  {
    id: 2,
    name: "LED Curing Light",
    brand: "3M ESPE",
    price: 8499,
    originalPrice: 10999,
    rating: 4.8,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop",
    discount: 23,
    inStock: true
  },
  {
    id: 3,
    name: "Dental Composite Kit",
    brand: "Dentsply",
    price: 3299,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop",
    inStock: true
  },
  {
    id: 4,
    name: "Surgical Extraction Kit",
    brand: "Hu-Friedy",
    price: 5999,
    originalPrice: 7499,
    rating: 4.7,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1598531228433-d9f0b5f9c4e0?w=400&h=400&fit=crop",
    discount: 20,
    inStock: true
  },
  {
    id: 5,
    name: "Dental Loupes 3.5x",
    brand: "Orascoptic",
    price: 24999,
    originalPrice: 29999,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    discount: 17,
    inStock: true
  },
  {
    id: 6,
    name: "Autoclave Sterilizer",
    brand: "Tuttnauer",
    price: 45999,
    rating: 4.4,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=400&fit=crop",
    inStock: false
  },
  {
    id: 7,
    name: "Dental Chair Unit",
    brand: "Sirona",
    price: 189999,
    originalPrice: 219999,
    rating: 4.8,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400&h=400&fit=crop",
    discount: 14,
    inStock: true
  },
  {
    id: 8,
    name: "Apex Locator",
    brand: "Dentsply",
    price: 15999,
    originalPrice: 18999,
    rating: 4.6,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=400&h=400&fit=crop",
    discount: 16,
    inStock: true
  }
];

export default function ProductGrid() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    console.log('Added to cart:', product);
    // Add your cart logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F9FF] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Premium Dental Products
          </h1>
          <p className="text-gray-600">
            Discover high-quality dental equipment and supplies
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dummyProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discount}% OFF
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.includes(product.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  }`}
                />
              </button>

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Brand */}
                <p className="text-sm text-[#007AFF] font-medium mb-1">
                  {product.brand}
                </p>

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                    product.inStock
                      ? 'bg-[#007AFF] text-white hover:bg-[#0056b3] shadow-md hover:shadow-lg'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#007AFF] rounded-2xl transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
