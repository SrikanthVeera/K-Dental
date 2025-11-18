import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Package, DollarSign, LogOut, TrendingUp, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    if (!userData || role !== 'admin') {
      navigate('/login/admin');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { label: 'Total Products', value: '456', icon: Package, color: 'from-purple-500 to-pink-500', change: '+8%' },
    { label: 'Revenue', value: '₹12.5L', icon: DollarSign, color: 'from-green-500 to-emerald-500', change: '+23%' },
    { label: 'Active Orders', value: '89', icon: Activity, color: 'from-orange-500 to-red-500', change: '+5%' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-lg border-b-4 border-orange-500"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(249, 115, 22, 0.7)',
                  '0 0 0 10px rgba(249, 115, 22, 0)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full"
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Control Panel</h1>
              <p className="text-sm text-gray-600">System Administrator - {user.name}</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
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
                className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Manage Users', icon: Users },
                { label: 'Products', icon: Package },
                { label: 'Orders', icon: Activity },
                { label: 'Analytics', icon: TrendingUp },
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100"
                  >
                    <Icon className="w-8 h-8 text-orange-600" />
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">System Status</h2>
            <div className="space-y-4">
              {[
                { label: 'Server Status', status: 'Online', color: 'green' },
                { label: 'Database', status: 'Healthy', color: 'green' },
                { label: 'API Response', status: 'Fast', color: 'green' },
                { label: 'Security', status: 'Secure', color: 'green' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-${item.color}-100 text-${item.color}-800`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
