import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Package, 
  Heart, 
  Clock, 
  Star,
  TrendingUp,
  Gift,
  Award,
  LogOut,
  Bell,
  Settings,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  ChevronRight,
  Truck,
  CheckCircle
} from 'lucide-react';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    if (!userData || role !== 'customer') {
      navigate('/');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Stats Cards Data
  const stats = [
    { 
      label: 'Total Orders', 
      value: '24', 
      icon: Package, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      change: '+3 this month'
    },
    { 
      label: 'Wishlist Items', 
      value: '12', 
      icon: Heart, 
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      change: '5 in stock'
    },
    { 
      label: 'Dental Coins', 
      value: '2,450', 
      icon: Award, 
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      change: 'Worth ₹245'
    },
    { 
      label: 'Total Savings', 
      value: '₹8,500', 
      icon: TrendingUp, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      change: 'This year'
    },
  ];

  // Recent Orders
  const recentOrders = [
    {
      id: 'ORD-2024-001',
      product: 'Dental Implant Kit',
      date: '2 days ago',
      status: 'Delivered',
      amount: '₹12,500',
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=100&h=100&fit=crop',
      statusColor: 'text-green-600',
      statusBg: 'bg-green-50'
    },
    {
      id: 'ORD-2024-002',
      product: 'Ultrasonic Scaler',
      date: '5 days ago',
      status: 'In Transit',
      amount: '₹8,900',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=100&h=100&fit=crop',
      statusColor: 'text-blue-600',
      statusBg: 'bg-blue-50'
    },
    {
      id: 'ORD-2024-003',
      product: 'Dental Chair',
      date: '1 week ago',
      status: 'Processing',
      amount: '₹45,000',
      image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=100&h=100&fit=crop',
      statusColor: 'text-yellow-600',
      statusBg: 'bg-yellow-50'
    },
  ];

  // Quick Actions
  const quickActions = [
    { label: 'Browse Products', icon: ShoppingBag, color: 'from-blue-500 to-cyan-500', link: '/shop-new' },
    { label: 'Track Orders', icon: Truck, color: 'from-purple-500 to-pink-500', link: '#' },
    { label: 'My Wishlist', icon: Heart, color: 'from-pink-500 to-rose-500', link: '#' },
    { label: 'Rewards', icon: Gift, color: 'from-yellow-500 to-orange-500', link: '#' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-lg sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl shadow-lg"
              >
                <ShoppingBag className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Customer Dashboard
                </h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}! 🎉</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
              >
                <Bell className="w-5 h-5 text-blue-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-16 -mt-16`}></div>
                
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => action.link !== '#' && navigate(action.link)}
                  className={`p-4 rounded-xl bg-gradient-to-r ${action.color} text-white shadow-md hover:shadow-lg transition-all`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-semibold">{action.label}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentOrders.map((order, idx) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <img 
                      src={order.image} 
                      alt={order.product}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{order.product}</h3>
                      <p className="text-sm text-gray-600">{order.id}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 mb-1">{order.amount}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.statusBg} ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Profile & Membership */}
          <div className="space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Profile</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{user.phone}</span>
                  </div>
                )}
                <button className="w-full mt-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm">
                  Edit Profile
                </button>
              </div>
            </motion.div>

            {/* Membership Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6" />
                <h2 className="text-xl font-bold">Membership</h2>
              </div>
              <p className="text-2xl font-bold mb-2">Silver Member</p>
              <p className="text-sm opacity-90 mb-4">5% discount on all products</p>
              <button className="w-full py-2 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-sm">
                Upgrade to Gold
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
