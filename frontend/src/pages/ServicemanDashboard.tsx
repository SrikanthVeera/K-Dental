import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Wrench, Calendar, DollarSign, CheckCircle, LogOut, Clock, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ServicemanDashboard = () => {
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
    navigate('/login');
  };

  const stats = [
    { label: 'Active Services', value: '5', icon: Wrench, color: 'from-purple-500 to-pink-500' },
    { label: 'Completed', value: '28', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { label: 'This Month Earnings', value: '₹45,000', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
    { label: 'Pending', value: '3', icon: Clock, color: 'from-blue-500 to-cyan-500' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full"
            >
              <Wrench className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Serviceman Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {user.name}!</p>
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
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {[
              { time: '10:00 AM', service: 'Dental Equipment Installation', location: 'ABC Dental Clinic' },
              { time: '02:00 PM', service: 'Maintenance Check', location: 'XYZ Dental Care' },
              { time: '04:30 PM', service: 'Equipment Repair', location: 'Smile Dental' },
            ].map((appointment, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="bg-purple-500 text-white p-3 rounded-lg">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{appointment.service}</p>
                  <p className="text-sm text-gray-600">{appointment.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-purple-600">{appointment.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicemanDashboard;
