import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  MapPin,
  Phone,
  Star,
  LogOut,
  Bell,
  Settings,
  Award,
  Package,
  Users,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function ServicemanDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    if (!userData || role !== 'serviceman') {
      navigate('/login/serviceman');
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
      label: 'Active Services', 
      value: '12', 
      change: '+3',
      trend: 'up',
      icon: Wrench, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      label: 'Completed Today', 
      value: '8', 
      change: '+2',
      trend: 'up',
      icon: CheckCircle, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      label: 'Today Earnings', 
      value: '₹8,500', 
      change: '+12%',
      trend: 'up',
      icon: DollarSign, 
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    { 
      label: 'Pending Tasks', 
      value: '5', 
      change: '-1',
      trend: 'down',
      icon: Clock, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
  ];

  // Today's Schedule
  const todaySchedule = [
    { 
      id: 1,
      time: '09:00 AM', 
      service: 'Dental Chair Installation', 
      location: 'Smile Dental Clinic',
      address: 'MG Road, Bangalore',
      status: 'in-progress',
      priority: 'high',
      payment: '₹2,500'
    },
    { 
      id: 2,
      time: '11:30 AM', 
      service: 'X-Ray Machine Maintenance', 
      location: 'Care Dental Hospital',
      address: 'Indiranagar, Bangalore',
      status: 'upcoming',
      priority: 'medium',
      payment: '₹1,800'
    },
    { 
      id: 3,
      time: '02:00 PM', 
      service: 'Autoclave Repair', 
      location: 'Perfect Smile Clinic',
      address: 'Koramangala, Bangalore',
      status: 'upcoming',
      priority: 'high',
      payment: '₹3,200'
    },
    { 
      id: 4,
      time: '04:30 PM', 
      service: 'Equipment Calibration', 
      location: 'Dental Care Center',
      address: 'Whitefield, Bangalore',
      status: 'upcoming',
      priority: 'low',
      payment: '₹1,000'
    },
  ];

  // Recent Activity
  const recentActivity = [
    { action: 'Completed service', detail: 'Dental Unit Installation', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
    { action: 'New booking', detail: 'Equipment Maintenance', time: '3 hours ago', icon: Bell, color: 'text-blue-500' },
    { action: 'Payment received', detail: '₹2,500 credited', time: '5 hours ago', icon: DollarSign, color: 'text-yellow-500' },
    { action: 'Rating received', detail: '5 stars from ABC Clinic', time: '6 hours ago', icon: Star, color: 'text-purple-500' },
  ];

  // Performance Metrics
  const performanceMetrics = [
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-yellow-500' },
    { label: 'Total Services', value: '156', icon: Package, color: 'text-purple-500' },
    { label: 'Happy Clients', value: '89', icon: Users, color: 'text-blue-500' },
    { label: 'This Month', value: '₹45K', icon: TrendingUp, color: 'text-green-500' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
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
                whileHover={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg"
              >
                <Wrench className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Serviceman Dashboard
                </h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}! 👋</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
              >
                <Bell className="w-5 h-5 text-purple-600" />
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
            const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-16 -mt-16`}></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.bgColor} ${stat.textColor} text-xs font-semibold`}>
                      <TrendIcon className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule - Takes 2 columns */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Today's Schedule</h2>
                </div>
                <span className="text-sm text-gray-500">{todaySchedule.length} tasks</span>
              </div>
              
              <div className="space-y-4">
                {todaySchedule.map((appointment, idx) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 5 }}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      appointment.status === 'in-progress' 
                        ? 'bg-purple-50 border-purple-300' 
                        : 'bg-gray-50 border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        appointment.status === 'in-progress' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                          : 'bg-gray-300'
                      }`}>
                        <Wrench className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-1">{appointment.service}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {appointment.location}
                            </p>
                            <p className="text-xs text-gray-500 ml-4">{appointment.address}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-purple-600 text-sm">{appointment.time}</p>
                            <p className="text-sm font-bold text-green-600">{appointment.payment}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            appointment.status === 'in-progress' 
                              ? 'bg-purple-100 text-purple-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {appointment.status === 'in-progress' ? '🔄 In Progress' : '⏰ Upcoming'}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            appointment.priority === 'high' 
                              ? 'bg-red-100 text-red-600' 
                              : appointment.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-green-100 text-green-600'
                          }`}>
                            {appointment.priority === 'high' ? '🔥 High' : appointment.priority === 'medium' ? '⚡ Medium' : '✅ Low'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Performance</h2>
              </div>
              
              <div className="space-y-4">
                {performanceMetrics.map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${metric.color}`} />
                        <span className="text-sm text-gray-600">{metric.label}</span>
                      </div>
                      <span className="text-lg font-bold text-gray-800">{metric.value}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`p-2 rounded-lg bg-gray-100`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.detail}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
