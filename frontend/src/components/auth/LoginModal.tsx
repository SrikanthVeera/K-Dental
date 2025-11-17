import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (phone: string, otp?: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  const handleSendOTP = () => {
    if (loginMethod === 'phone') {
      if (phoneNumber.length !== 10) {
        setError('Please enter a valid 10-digit mobile number');
        return;
      }
      setError('');
      setStep('otp');
      // Simulate OTP sent
      console.log('OTP sent to:', phoneNumber);
    } else {
      if (!email || !password) {
        setError('Please enter email and password');
        return;
      }
      setError('');
      onLogin(email, password);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }
    setError('');
    onLogin(phoneNumber, otpValue);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google OAuth
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
          onClick={onClose}
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Logo and Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="text-3xl">🦷</div>
                <h2 className="text-2xl font-bold text-[#007AFF]">Dentalkart</h2>
              </div>
              <p className="text-sm text-gray-600 italic">Aapka Dost</p>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                {step === 'input' ? 'Log in or Sign up' : 'Verify OTP'}
              </h3>
              {step === 'input' && (
                <p className="text-sm text-gray-600 mt-2">
                  Sign up now and get <span className="font-semibold text-orange-500">500 🪙 Dentalcoins!</span>
                </p>
              )}
            </div>

            {step === 'input' ? (
              <>
                {/* Toggle Login Method */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setLoginMethod('phone')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      loginMethod === 'phone'
                        ? 'text-[#007AFF] border-b-2 border-[#007AFF]'
                        : 'text-gray-500'
                    }`}
                  >
                    Use Password
                  </button>
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      loginMethod === 'email'
                        ? 'text-[#007AFF] border-b-2 border-[#007AFF]'
                        : 'text-gray-500'
                    }`}
                  >
                    Login with Email
                  </button>
                </div>

                {loginMethod === 'phone' ? (
                  <>
                    {/* Phone Number Input */}
                    <div className="mb-4">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#007AFF] focus-within:border-transparent">
                        <span className="px-4 py-3 bg-gray-50 text-gray-700 font-medium">+91</span>
                        <input
                          type="tel"
                          placeholder="Mobile Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="flex-1 px-4 py-3 outline-none"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    {/* Send OTP Button */}
                    <button
                      onClick={handleSendOTP}
                      className="w-full bg-[#1e3a5f] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a6f] transition-colors mb-4"
                    >
                      Send OTP
                    </button>
                  </>
                ) : (
                  <>
                    {/* Email Input */}
                    <div className="mb-4">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Login Button */}
                    <button
                      onClick={handleSendOTP}
                      className="w-full bg-[#1e3a5f] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a6f] transition-colors mb-4"
                    >
                      Login
                    </button>
                  </>
                )}

                {error && (
                  <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}

                {/* Referral Code */}
                <div className="text-center mb-4">
                  <a href="#" className="text-sm text-[#007AFF] hover:underline">
                    Have a Referral Code? ⓘ
                  </a>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                {/* Google Login */}
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors mb-4"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-medium text-gray-700">Continue with Google</span>
                </button>

                {/* Help */}
                <div className="text-center text-sm text-gray-600">
                  Need help?{' '}
                  <a href="#" className="text-[#007AFF] hover:underline">
                    Connect with us 💬
                  </a>
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  By logging or signing up, you agree to our{' '}
                  <a href="#" className="text-[#007AFF] hover:underline">
                    Terms
                  </a>{' '}
                  &{' '}
                  <a href="#" className="text-[#007AFF] hover:underline">
                    Policy
                  </a>
                </p>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Enter the 6-digit OTP sent to +91 {phoneNumber}
                  </p>
                  <div className="flex gap-2 justify-center mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none"
                        maxLength={1}
                      />
                    ))}
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                  )}
                  <button
                    onClick={handleVerifyOTP}
                    className="w-full bg-[#1e3a5f] text-white py-3 rounded-lg font-semibold hover:bg-[#2d4a6f] transition-colors"
                  >
                    Verify OTP
                  </button>
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setStep('input')}
                      className="text-sm text-[#007AFF] hover:underline"
                    >
                      Change Number
                    </button>
                    <span className="mx-2 text-gray-400">|</span>
                    <button className="text-sm text-[#007AFF] hover:underline">
                      Resend OTP
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
