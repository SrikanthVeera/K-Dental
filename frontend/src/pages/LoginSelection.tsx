import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Wrench, 
  Shield, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const LoginSelection = () => {
  const loginOptions = [
    {
      id: 'customer',
      title: 'Customer Login',
      description: 'Shop for premium dental products',
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
      path: '/login/customer',
      features: ['Browse Products', 'Track Orders', 'Exclusive Deals']
    },
    {
      id: 'serviceman',
      title: 'Serviceman Login',
      description: 'Manage your dental services',
      icon: Wrench,
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
      path: '/login/serviceman',
      features: ['Service Requests', 'Manage Schedule', 'Track Earnings']
    },
    {
      id: 'admin',
      title: 'Admin Login',
      description: 'Manage the entire platform',
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      hoverColor: 'hover:from-orange-600 hover:to-red-600',
      path: '/login/admin',
      features: ['User Management', 'Analytics', 'System Control']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to K-Dental
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </motion.div>
          <p className="text-xl text-gray-600 font-medium">
            Choose your portal to continue
          </p>
        </motion.div>

        {/* Login Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {loginOptions.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                whileTap={{ scale: 0.95 }}
                className="perspective-1000"
              >
                <Link to={option.path}>
                  <div className={`
                    relative bg-white rounded-2xl shadow-xl overflow-hidden
                    transform transition-all duration-300
                    hover:shadow-2xl
                    group
                  `}>
                    {/* Gradient Header */}
                    <div className={`
                      h-32 bg-gradient-to-br ${option.color} ${option.hoverColor}
                      flex items-center justify-center
                      transition-all duration-300
                      relative overflow-hidden
                    `}>
                      {/* Animated Background Pattern */}
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
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-16 h-16 text-white drop-shadow-lg" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                        {option.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {option.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {option.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 + 0.5 }}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: idx * 0.2
                              }}
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${option.color} mr-2`} />
                            </motion.div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Login Button */}
                      <motion.button
                        whileHover={{ x: 5 }}
                        className={`
                          w-full py-3 rounded-lg
                          bg-gradient-to-r ${option.color}
                          text-white font-semibold
                          flex items-center justify-center gap-2
                          shadow-lg hover:shadow-xl
                          transition-all duration-300
                          group-hover:gap-4
                        `}
                      >
                        Login Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className={`
                        absolute inset-0 opacity-0 group-hover:opacity-20
                        bg-gradient-to-br ${option.color}
                        pointer-events-none
                        transition-opacity duration-300
                      `}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSelection;
