import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Heart, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAddToCart } from '../hooks/useAddToCart';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  rating?: number;
  numReviews?: number;
  image: string;
  discount?: number;
  inStock: boolean;
  category: string;
  description?: string;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useAddToCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      
      if (data.success) {
        // Transform backend data to match frontend interface
        const transformedProducts = data.data.map((product: any) => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          mrp: product.mrp || product.price,
          rating: product.rating || 4.5,
          numReviews: product.numReviews || 0,
          image: product.image || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop',
          discount: product.discount || Math.round(((product.mrp - product.price) / product.mrp) * 100),
          inStock: product.inStock,
          category: product.category,
          description: product.description
        }));
        setProducts(transformedProducts);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      brand: product.brand,
      category: product.category,
      inStock: product.inStock
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F4F9FF] to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Products...</h2>
              <p className="text-gray-600">Fetching the latest dental products for you</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F4F9FF] to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Products</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F4F9FF] to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
              <p className="text-gray-600">We're working on adding more products to our catalog</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F9FF] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Premium Dental Products
          </h1>
          <p className="text-gray-600">
            Discover high-quality dental equipment and supplies ({products.length} products available)
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Discount Badge */}
              {product.discount && product.discount > 0 && (
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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop';
                  }}
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
                      {product.rating?.toFixed(1) || '4.5'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.numReviews || 0} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.mrp !== product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
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

        {/* Refresh Button */}
        <div className="text-center mt-12">
          <button
            onClick={fetchProducts}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <Loader className="w-5 h-5" />
            Refresh Products
          </button>
        </div>
      </div>
    </div>
  );
}