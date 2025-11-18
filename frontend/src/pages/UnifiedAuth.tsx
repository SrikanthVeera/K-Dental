import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Wrench, 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  Phone,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';
import axios from 'axios';

export default function UnifiedAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<'customer' | 'serviceman' | 'admin'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });

  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Shop for dental products'
    },
    {
      id: 'serviceman',
      title: 'Serviceman',
      icon: Wrench,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: 'Manage dental services'
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      description: 'Manage the platform'
    }
  ];

  const currentRole = roles.find(r => r.id === selectedRole)!;
  const RoleIcon = currentRole.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      if (selectedRole === 'admin' && formData.adminCode !== 'ADMIN2024') {
        setError('Invalid admin code. Use: ADMIN2024');
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const { data } = await axios.post(`http://localhost:5000/api/auth/login/${selectedRole}`, {
          email: formData.email,
          password: formData.password
        });

        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        localStorage.setItem('role', data.data.role);

        setSuccess(true);

        setTimeout(() => {
          navigate(`/dashboard/${selectedRole}`);
        }, 1500);
      } else {
        const { data } = await axios.post('http://localhost:5000/api/auth/register', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: selectedRole
        });

        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        localStorage.setItem('role', data.data.role);

        setSuccess(true);

        setTimeout(() => {
          navigate(`/dashboard/${selectedRole}`);
        }, 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || `${mode === 'login' ? 'Login' : 'Registration'} failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      adminCode: ''
    });
    setError('');
    setSuccess(false);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to home
        </motion.button>

        <motion.div
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        >
          {/* Header with Sparkles */}
          <div className={`bg-gradient-to-r ${currentRole.color} p-8 text-white relative overflow-hidden`}>
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '20px 20px']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="relative z-10"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-white/20 p-4 rounded-full backdrop-blur-sm"
                >
                  <RoleIcon className="w-12 h-12" />
                </motion.div>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5" />
                <h2 className="text-3xl font-bold text-center">
                  {mode === 'login' ? 'Welcome Back!' : 'Join K-Dental'}
                </h2>
                <Sparkles className="w-5 h-5" />
              </div>
              
              <p className="text-center text-white/90">
                {mode === 'login' ? 'Login to your account' : 'Create your account'}
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <div className="p-8">
            {/* Role Selector Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${currentRole.bgColor} border-gray-200 hover:border-gray-300`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${currentRole.color}`}>
                      <RoleIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">{currentRole.title}</p>
                      <p className="text-xs text-gray-600">{currentRole.description}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showRoleDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                      {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                          <motion.button
                            key={role.id}
                            type="button"
                            whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                            onClick={() => {
                              setSelectedRole(role.id as any);
                              setShowRoleDropdown(false);
                              resetForm();
                            }}
                            className={`w-full flex items-center gap-3 p-4 border-b border-gray-100 last:border-b-0 transition-all ${
                              selectedRole === role.id ? role.bgColor : ''
                            }`}
                          >
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${role.color}`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left flex-1">
                              <p className="font-semibold text-gray-800">{role.title}</p>
                              <p className="text-xs text-gray-600">{role.description}</p>
                            </div>
                            {selectedRole === role.id && (
                              <CheckCircle2 className={`w-5 h-5 ${role.textColor}`} />
                            )}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                {mode === 'login' ? 'Login successful!' : 'Account created!'} Redirecting...
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field (Register only) */}
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </motion.div>

              {/* Phone Field (Register only) */}
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="9876543210"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Admin Code (Register + Admin only) */}
              {mode === 'register' && selectedRole === 'admin' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Registration Code
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.adminCode}
                      onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-orange-50"
                      placeholder="Enter admin code"
                      required
                    />
                  </div>
                  <p className="text-xs text-orange-600 mt-1">Required for admin registration</p>
                </motion.div>
              )}

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: mode === 'register' ? 0.4 : 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password (Register only) */}
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading || success}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`
                  w-full py-4 rounded-xl font-semibold text-white text-lg
                  bg-gradient-to-r ${currentRole.color}
                  shadow-lg hover:shadow-xl
                  transition-all duration-300
                  flex items-center justify-center gap-2
                  ${(loading || success) ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {mode === 'login' ? 'Logging in...' : 'Creating account...'}
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Success!
                  </>
                ) : (
                  <>
                    <RoleIcon className="w-5 h-5" />
                    {mode === 'login' ? 'Login Now' : 'Create Account'}
                  </>
                )}
              </motion.button>
            </form>

            {/* Switch Mode */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={switchMode}
                  className={`font-semibold hover:underline ${currentRole.textColor}`}
                >
                  {mode === 'login' ? 'Register here' : 'Login here'}
                </button>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          {['Secure', 'Fast', 'Easy'].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border border-white/20"
            >
              <p className="text-sm font-medium text-gray-700">{feature}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
