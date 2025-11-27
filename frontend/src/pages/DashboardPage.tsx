import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  Bell, 
  Package, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail,
  Edit3,
  Camera,
  LogOut,
  ChevronRight,
  Star,
  Gift,
  Truck,
  Shield
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LogoutModal from '../components/LogoutModal';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user) {
    navigate('/');
    return null;
  }

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Orders', value: '12', icon: Package, color: 'bg-blue-500' },
    { label: 'Cart Items', value: getTotalItems().toString(), icon: ShoppingBag, color: 'bg-green-500' },
    { label: 'Wishlist', value: '8', icon: Heart, color: 'bg-red-500' },
    { label: 'Rewards', value: '2,450', icon: Gift, color: 'bg-purple-500' },
  ];

  const recentOrders = [
    {
      id: 'DK001',
      date: '2024-01-15',
      items: 3,
      total: 15999,
      status: 'Delivered',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 'DK002',
      date: '2024-01-10',
      items: 1,
      total: 8499,
      status: 'Shipped',
      statusColor: 'text-blue-600 bg-blue-100'
    },
    {
      id: 'DK003',
      date: '2024-01-05',
      items: 2,
      total: 12999,
      status: 'Processing',
      statusColor: 'text-yellow-600 bg-yellow-100'
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* User Profile Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full border-4 border-white/20"
                      />
                      <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                        <Camera className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{user.name}</h3>
                      <p className="text-blue-100 text-sm">{user.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">Premium Member</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          activeTab === item.id
                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-all mt-4"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Welcome Banner */}
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">
                          Welcome back, {user.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-blue-100 text-lg">
                          Ready to explore premium dental products?
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                          <span className="text-6xl">🦷</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                              <p className="text-sm text-gray-600">{stat.label}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Profile Information */}
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                      <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                          </label>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <User className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{user.name}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                          </label>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{user.email}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{user.phone || 'Not provided'}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Account Type
                          </label>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900 capitalize">{user.role}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-2xl shadow-md p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View All Orders
                      </button>
                    </div>

                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              <Package className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">{order.items} items • {order.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Other tabs content can be added here */}
              {activeTab !== 'profile' && (
                <div className="bg-white rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {menuItems.find(item => item.id === activeTab)?.label}
                  </h2>
                  <p className="text-gray-600">This section is coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          setShowLogoutModal(false);
          navigate('/');
        }}
        userName={user?.name}
      />
    </>
  );
}