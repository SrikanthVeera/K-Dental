import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Package,
  Truck,
  Home,
  Download,
  Share2,
  Calendar
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OrderSuccessPage() {
  const location = useLocation();
  const orderData = location.state;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!orderData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Go back to home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { orderId, total, items } = orderData;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase. Your order is being processed.
            </p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Order Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-bold text-blue-600">{orderId}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Items</span>
                    <span className="font-semibold">{items} products</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-bold text-2xl text-green-600">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Payment Status</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Estimated Delivery</div>
                      <div className="text-blue-600">
                        {estimatedDelivery.toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                    <Truck className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Free Delivery</div>
                      <div className="text-green-600 text-sm">No additional charges</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Tracking Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Order Tracking
            </h2>
            
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full">
                <div className="h-full w-1/4 bg-green-500 rounded-full transition-all duration-1000"></div>
              </div>
              
              {/* Steps */}
              {[
                { icon: CheckCircle, label: 'Order Confirmed', status: 'completed' },
                { icon: Package, label: 'Processing', status: 'current' },
                { icon: Truck, label: 'Shipped', status: 'pending' },
                { icon: Home, label: 'Delivered', status: 'pending' }
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex flex-col items-center relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                      step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'current' ? 'bg-blue-500 text-white' :
                      'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium text-center ${
                      step.status === 'completed' ? 'text-green-600' :
                      step.status === 'current' ? 'text-blue-600' :
                      'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid md:grid-cols-4 gap-4"
          >
            <Link
              to="/orders"
              className="bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Track Order
            </Link>
            
            <button className="bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
            
            <button className="bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Order
            </button>
            
            <Link
              to="/"
              className="bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Continue Shopping
            </Link>
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Thank You for Choosing DentalKart!</h3>
            <p className="text-lg opacity-90">
              We appreciate your trust in us. Your order will be carefully packed and delivered to you soon.
            </p>
            <p className="mt-4 text-sm opacity-80">
              For any queries, contact our support team at support@dentalkart.com or call +91-9876543210
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}