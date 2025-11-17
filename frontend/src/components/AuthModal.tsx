import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Wrench, Shield, ArrowRight, Sparkles, User, Lock, Mail, Phone, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const [view, setView] = useState<'selection' | 'customer-login' | 'customer-signup'>('selection');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form data
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const loginOptions = [
    {
      id: 'customer',
      title: 'Customer Login',
      description: 'Shop for premium dental products',
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
      action: () => setView('customer-login'),
      features: ['Browse Products', 'Track Orders', 'Exclusive Deals']
    },
    {
      id: 'serviceman',
      title: 'Serviceman Login',
      description: 'Manage your dental services',
      icon: Wrench,
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
      action: () => {
        onClose();
        navigate('/login/serviceman');
      },
      features: ['Service Requests', 'Manage Schedule', 'Track Earnings']
    },
    {
      id: 'admin',
      title: 'Admin Login',
      description: 'Manage the entire platform',
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      hoverColor: 'hover:from-orange-600 hover:to-red-600',
      action: () => {
        onClose();
        navigate('/login/admin');
      },
      features: ['User Management', 'Analytics', 'System Control']
    }
  ];

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login/customer', loginData);
      
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      localStorage.setItem('role', data.data.role);

      setSuccess(true);
      
      setTimeout(() => {
        onClose();
        setView('selection');
        navigate('/dashboard/customer');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        ...signupData,
        role: 'customer'
      });

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      localStorage.setItem('role', data.data.role);

      setSuccess(true);
      
      setTimeout(() => {
        onClose();
        setView('selection');
        navigate('/dashboard/customer');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setView('selection');
      setError('');
      setSuccess(false);
      setLoginData({ email: '', password: '' });
      setSignupData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-10 left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-20 right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
              animate={{
                x: [0, -50, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          <div className="relative z-10 p-8 md:p-12">
            {/* Role Selection View */}
            {view === 'selection' && (
              <>
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-10"
                >
                  <motion.div
                    className="inline-flex items-center gap-2 mb-3"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Welcome to K-Dental
                    </h2>
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                  <p className="text-lg text-gray-600 font-medium">
                    Choose your portal to continue
                  </p>
                </motion.div>

                {/* Login Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {loginOptions.map((option, idx) => {
                    const Icon = option.icon;
                    return (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.1, type: 'spring' }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -5
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={option.action}
                        className="cursor-pointer"
                      >
                        <div className={`
                          relative bg-white rounded-2xl shadow-lg overflow-hidden
                          transform transition-all duration-300
                          hover:shadow-2xl
                          group
                        `}>
                          <div className={`
                            h-24 bg-gradient-to-br ${option.color} ${option.hoverColor}
                            flex items-center justify-center
                            transition-all duration-300
                            relative overflow-hidden
                          `}>
                            <motion.div
                              className="absolute inset-0 opacity-20"
                              style={{
                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                backgroundSize: '15px 15px'
                              }}
                              animate={{
                                backgroundPosition: ['0px 0px', '15px 15px']
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            />
                            
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Icon className="w-12 h-12 text-white drop-shadow-lg" />
                            </motion.div>
                          </div>

                          <div className="p-5">
                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                              {option.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                              {option.description}
                            </p>

                            <ul className="space-y-2 mb-5">
                              {option.features.map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center text-xs text-gray-600"
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${option.color} mr-2`} />
                                  {feature}
                                </li>
                              ))}
                            </ul>

                            <motion.div
                              whileHover={{ x: 5 }}
                              className={`
                                w-full py-2.5 rounded-lg
                                bg-gradient-to-r ${option.color}
                                text-white font-semibold text-sm
                                flex items-center justify-center gap-2
                                shadow-md hover:shadow-lg
                                transition-all duration-300
                                group-hover:gap-3
                              `}
                            >
                              Login Now
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-8"
                >
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setView('customer-signup')}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      Register here
                    </button>
                  </p>
                </motion.div>
              </>
            )}

            {/* Customer Login View */}
            {view === 'customer-login' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-md mx-auto"
              >
                <button
                  onClick={() => setView('selection')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to selection
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4">
                      <ShoppingBag className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Customer Login</h2>
                    <p className="text-gray-600 text-sm mt-2">Welcome back! Shop with us</p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Login successful! Redirecting...
                    </motion.div>
                  )}

                  <form onSubmit={handleCustomerLogin} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Email Address"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Password"
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

                    <button
                      type="submit"
                      disabled={loading || success}
                      className={`
                        w-full py-3 rounded-lg font-semibold text-white
                        bg-gradient-to-r from-blue-500 to-cyan-500
                        hover:from-blue-600 hover:to-cyan-600
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        flex items-center justify-center gap-2
                        ${(loading || success) ? 'opacity-70 cursor-not-allowed' : ''}
                      `}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Logging in...
                        </>
                      ) : success ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Success!
                        </>
                      ) : (
                        'Login to Shop'
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setView('customer-signup')}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      Register as Customer
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Customer Signup View */}
            {view === 'customer-signup' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-md mx-auto"
              >
                <button
                  onClick={() => setView('selection')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to selection
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-600 text-sm mt-2">Join us and start shopping</p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Account created! Redirecting...
                    </motion.div>
                  )}

                  <form onSubmit={handleCustomerSignup} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Full Name"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Email Address"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Phone Number"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Password"
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

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm Password"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || success}
                      className={`
                        w-full py-3 rounded-lg font-semibold text-white
                        bg-gradient-to-r from-blue-500 to-cyan-500
                        hover:from-blue-600 hover:to-cyan-600
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        flex items-center justify-center gap-2
                        ${(loading || success) ? 'opacity-70 cursor-not-allowed' : ''}
                      `}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Creating Account...
                        </>
                      ) : success ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Success!
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button 
                      onClick={() => setView('customer-login')}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      Login here
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
