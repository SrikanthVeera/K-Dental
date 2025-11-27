import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart, Package, CreditCard, Truck } from 'lucide-react';
import { useAddToCart } from '../hooks/useAddToCart';
import { useCartStore } from '../store/cartStore';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Demo products with complete cart data
const demoProducts = [
  {
    id: 101,
    name: "Professional Dental Scaler Kit",
    brand: "Woodpecker",
    price: 15999,
    mrp: 19999,
    rating: 4.8,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop",
    discount: 20,
    inStock: true,
    category: "Dental Equipment",
    description: "Professional ultrasonic scaler with multiple tips for comprehensive dental cleaning."
  },
  {
    id: 102,
    name: "LED Curing Light Pro",
    brand: "3M ESPE",
    price: 12499,
    mrp: 15999,
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop",
    discount: 22,
    inStock: true,
    category: "Dental Equipment",
    description: "High-intensity LED curing light for fast and efficient composite curing."
  },
  {
    id: 103,
    name: "Composite Restoration Kit",
    brand: "Dentsply Sirona",
    price: 4299,
    mrp: 5499,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop",
    discount: 22,
    inStock: true,
    category: "Dental Materials",
    description: "Complete composite restoration kit with multiple shades and bonding agents."
  },
  {
    id: 104,
    name: "Surgical Extraction Set",
    brand: "Hu-Friedy",
    price: 8999,
    mrp: 11999,
    rating: 4.6,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1598531228433-d9f0b5f9c4e0?w=400&h=400&fit=crop",
    discount: 25,
    inStock: true,
    category: "Surgical Instruments",
    description: "Professional surgical extraction instruments for complex dental procedures."
  },
  {
    id: 105,
    name: "Dental Loupes 3.5x Magnification",
    brand: "Orascoptic",
    price: 28999,
    mrp: 34999,
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    discount: 17,
    inStock: true,
    category: "Optical Equipment",
    description: "High-quality dental loupes with LED light for enhanced precision and visibility."
  },
  {
    id: 106,
    name: "Autoclave Sterilizer 18L",
    brand: "Tuttnauer",
    price: 45999,
    mrp: 52999,
    rating: 4.5,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=400&fit=crop",
    discount: 13,
    inStock: false,
    category: "Sterilization Equipment",
    description: "Professional autoclave sterilizer with advanced safety features and digital controls."
  }
];

export default function CartDemoPage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useAddToCart();
  const { getTotalItems, getTotalPrice } = useCartStore();

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: any) => {
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold mb-6">
                🛒 Complete E-Commerce Cart System Demo
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Experience our professional dental marketplace with full cart functionality
              </p>
              
              {/* Cart Stats */}
              <div className="flex justify-center gap-8 mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <ShoppingCart className="w-8 h-8" />
                    {getTotalItems()}
                  </div>
                  <p className="text-sm opacity-80">Items in Cart</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">
                    ₹{getTotalPrice().toLocaleString()}
                  </div>
                  <p className="text-sm opacity-80">Cart Total</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">🎯 Cart System Features</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center p-6 bg-blue-50 rounded-2xl"
              >
                <ShoppingCart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Cart Management</h3>
                <p className="text-gray-600">Add, remove, update quantities with real-time calculations and persistent storage</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center p-6 bg-green-50 rounded-2xl"
              >
                <CreditCard className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Secure Checkout</h3>
                <p className="text-gray-600">2-step checkout with multiple payment options and form validation</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center p-6 bg-purple-50 rounded-2xl"
              >
                <Truck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Delivery</h3>
                <p className="text-gray-600">Free delivery on orders ≥ ₹5,000 with real-time delivery tracking</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">🦷 Premium Dental Products</h2>
              <p className="text-gray-600 text-lg">
                Click "Add to Cart" to test the complete e-commerce functionality
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {demoProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.discount}% OFF
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
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
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <span className="text-white font-bold text-lg bg-red-600 px-4 py-2 rounded-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    {/* Brand */}
                    <p className="text-sm text-blue-600 font-semibold mb-1">
                      {product.brand}
                    </p>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.mrp !== product.price && (
                        <>
                          <span className="text-lg text-gray-500 line-through">
                            ₹{product.mrp.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm text-green-600 font-bold bg-green-100 px-2 py-1 rounded">
                            Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 ${
                        product.inStock
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </motion.button>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-colors duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">🚀 How to Test the Cart System</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-blue-900">🛍️ Shopping Experience</h3>
                <ul className="text-left space-y-2 text-blue-800">
                  <li>• Add products to cart and see real-time count</li>
                  <li>• Click cart button to open sidebar</li>
                  <li>• Update quantities with +/- buttons</li>
                  <li>• Remove items or clear entire cart</li>
                  <li>• Navigate to full cart page</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-green-900">💳 Checkout Process</h3>
                <ul className="text-left space-y-2 text-green-800">
                  <li>• Apply promo codes (DENTAL10, SAVE20, FIRST50)</li>
                  <li>• Proceed to secure checkout</li>
                  <li>• Fill shipping and payment details</li>
                  <li>• Complete order and see success page</li>
                  <li>• Track order status</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">🎉 Production-Ready Features</h3>
              <p className="text-lg opacity-90 mb-6">
                This cart system includes all features found in major e-commerce platforms like Amazon, Flipkart, and other leading marketplaces.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">Persistent Storage</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Real-time Updates</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Promo Codes</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Multiple Payments</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Order Tracking</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Mobile Responsive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}