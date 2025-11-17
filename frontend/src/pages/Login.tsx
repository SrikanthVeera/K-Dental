import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, TrendingUp, Shield, Award } from 'lucide-react';
import LoginModal from '../components/auth/LoginModal';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (phoneOrEmail: string, otpOrPassword?: string) => {
    try {
      await login(phoneOrEmail, otpOrPassword);
      setIsModalOpen(false);
      
      // Check if user is admin and redirect accordingly
      const user = useAuthStore.getState().user;
      if (user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const features = [
    {
      icon: CheckCircle,
      text: 'Easy Returns',
      color: 'text-green-500'
    },
    {
      icon: Award,
      text: 'Rewards on every purchase',
      color: 'text-yellow-500'
    },
    {
      icon: TrendingUp,
      text: '20,000+ products',
      color: 'text-blue-500'
    },
    {
      icon: Shield,
      text: 'Best price guaranteed',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-5xl">🦷</div>
              <h1 className="text-4xl font-bold">Dentalkart</h1>
            </div>
            <p className="text-xl text-blue-200 italic">Aapka Dost</p>
          </div>

          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Join <span className="text-yellow-400">2 Lakh+</span> Indian Dentists Who<br />
            Trust Dentalkart To Grow Their Business
          </h2>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <span className="text-lg">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Decorative Image Placeholder */}
          <div className="mt-12">
            <img
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop"
              alt="Dental Professional"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Login Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-[#F4F9FF] to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="text-4xl">🦷</div>
              <h1 className="text-3xl font-bold text-[#007AFF]">Dentalkart</h1>
            </div>
            <p className="text-gray-600 italic">Aapka Dost</p>
          </div>

          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 mb-8">
              Sign in to access your account and continue shopping
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#007AFF] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#0056b3] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Login / Sign Up
            </button>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 text-center">
                🎁 New users get <span className="font-bold">500 Dentalcoins</span> on signup!
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-[#007AFF]">2L+</p>
              <p className="text-xs text-gray-600">Dentists</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-[#007AFF]">20K+</p>
              <p className="text-xs text-gray-600">Products</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-[#007AFF]">100%</p>
              <p className="text-xs text-gray-600">Genuine</p>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-8 space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <Icon className={`h-5 w-5 ${feature.color}`} />
                  <span className="text-sm text-gray-700">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
