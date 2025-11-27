import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  Building,
  Truck,
  Shield,
  CheckCircle,
  ArrowLeft,
  Wallet
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  description: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: user?.name || '',
    phone: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  const [selectedPayment, setSelectedPayment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Wallet,
      description: 'PhonePe, GPay, Paytm'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      description: 'All major banks'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: Truck,
      description: 'Pay when you receive'
    }
  ];

  const deliveryFee = getTotalPrice() >= 5000 ? 0 : 200;
  const finalTotal = getTotalPrice() + deliveryFee;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = 'DK' + Date.now();
      clearCart();
      navigate('/order-success', {
        state: {
          orderId,
          total: finalTotal,
          items: items.length
        }
      });
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className={`ml-3 font-medium ${
                currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'
              }`}>
                Shipping Address
              </span>
            </div>
            
            <div className={`w-20 h-1 mx-4 ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className={`ml-3 font-medium ${
                currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'
              }`}>
                Payment Method
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-md p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-blue-600" />
                    Shipping Address
                  </h2>

                  <form onSubmit={handleAddressSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={shippingAddress.fullName}
                            onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            required
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={shippingAddress.email}
                          onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Complete Address *
                      </label>
                      <div className="relative">
                        <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          required
                          rows={3}
                          value={shippingAddress.address}
                          onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                          placeholder="House/Flat no., Building name, Street, Area"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {/* City */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="Enter city"
                        />
                      </div>

                      {/* State */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="Enter state"
                        />
                      </div>

                      {/* Pincode */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.pincode}
                          onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          placeholder="Enter pincode"
                        />
                      </div>
                    </div>

                    {/* Landmark */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.landmark}
                        onChange={(e) => setShippingAddress({...shippingAddress, landmark: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        placeholder="Nearby landmark"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </button>
                  </form>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl shadow-md p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    Payment Method
                  </h2>

                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="grid gap-4">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <label
                            key={method.id}
                            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              selectedPayment === method.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={selectedPayment === method.id}
                              onChange={(e) => setSelectedPayment(e.target.value)}
                              className="sr-only"
                            />
                            <Icon className="w-6 h-6 text-blue-600 mr-4" />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">{method.name}</div>
                              <div className="text-sm text-gray-500">{method.description}</div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 ${
                              selectedPayment === method.id
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedPayment === method.id && (
                                <CheckCircle className="w-3 h-3 text-white m-0.5" />
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                      >
                        Back to Address
                      </button>
                      <button
                        type="submit"
                        disabled={!selectedPayment || isProcessing}
                        className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Shield className="w-5 h-5" />
                            Place Order
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-blue-600">{item.brand}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                          <span className="font-semibold text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600 font-semibold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
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