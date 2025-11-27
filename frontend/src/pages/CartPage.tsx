import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Tag,
  Truck,
  Shield,
  CreditCard,
  Gift,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CartPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getTotalMRP,
    getTotalSavings
  } = useCartStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showPromoSuccess, setShowPromoSuccess] = useState(false);

  const deliveryFee = getTotalPrice() >= 5000 ? 0 : 200;
  const finalTotal = getTotalPrice() - promoDiscount + deliveryFee;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleApplyPromo = () => {
    const validCodes = {
      'DENTAL10': 0.1,
      'SAVE20': 0.2,
      'FIRST50': 50
    };

    const code = promoCode.toUpperCase();
    if (validCodes[code as keyof typeof validCodes]) {
      const discount = typeof validCodes[code as keyof typeof validCodes] === 'number' && validCodes[code as keyof typeof validCodes] < 1
        ? getTotalPrice() * (validCodes[code as keyof typeof validCodes] as number)
        : validCodes[code as keyof typeof validCodes] as number;
      
      setPromoDiscount(discount);
      setShowPromoSuccess(true);
      setTimeout(() => setShowPromoSuccess(false), 3000);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-12 bg-white rounded-2xl shadow-xl max-w-md"
          >
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any dental products yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart ({getTotalItems()} items)
              </h1>
            </div>
            
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
              >
                <Trash2 className="w-5 h-5" />
                Clear Cart
              </button>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-blue-600 font-medium">{item.brand}</p>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Price */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-gray-900">
                              ₹{item.price.toLocaleString()}
                            </span>
                            {item.mrp !== item.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.mrp.toLocaleString()}
                              </span>
                            )}
                            {item.mrp !== item.price && (
                              <span className="text-sm text-green-600 font-semibold">
                                {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% off
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-semibold text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Stock Status */}
                        <div className="mt-3 flex items-center gap-2">
                          {item.inStock ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-600 font-medium">In Stock</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {showPromoSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 flex items-center gap-2 text-green-600 text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Promo code applied successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  
                  {getTotalSavings() > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>You Save</span>
                      <span>-₹{getTotalSavings().toLocaleString()}</span>
                    </div>
                  )}
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Promo Discount</span>
                      <span>-₹{promoDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Delivery Fee
                    </span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600 font-semibold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-6 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3 text-sm text-blue-800">
                    <Shield className="w-4 h-4" />
                    <span>100% Authentic Products</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-blue-800">
                    <Truck className="w-4 h-4" />
                    <span>Free delivery on orders above ₹5,000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-blue-800">
                    <Gift className="w-4 h-4" />
                    <span>Easy returns within 7 days</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:from-blue-700 hover:to-cyan-700"
                >
                  <CreditCard className="w-5 h-5" />
                  {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                </button>

                {!isAuthenticated && (
                  <p className="text-center text-sm text-gray-500 mt-3">
                    You need to login to place an order
                  </p>
                )}

                {/* Security Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout with 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}