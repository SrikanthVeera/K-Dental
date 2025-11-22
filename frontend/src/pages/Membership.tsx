import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Truck,
  Wrench,
  ShoppingBag,
  Coins,
  Gift,
  Star,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  Zap,
  Heart,
  Shield,
  Phone,
  Mail,
  ArrowRight,
  Percent,
  Package,
  ChevronDown
} from 'lucide-react';

export default function Membership() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const benefits = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Unlimited free delivery on all orders, no minimum purchase required',
      color: 'from-blue-500 to-cyan-500',
      highlight: 'Save ₹200 per order'
    },
    {
      icon: Wrench,
      title: '1st Service Free',
      description: 'Get your first service/installation completely free',
      color: 'from-green-500 to-emerald-500',
      highlight: 'Worth ₹5,000'
    },
    {
      icon: Percent,
      title: '30% Off Next Services',
      description: 'Get 30% discount on all subsequent services and installations',
      color: 'from-purple-500 to-pink-500',
      highlight: 'Ongoing savings'
    },
    {
      icon: ShoppingBag,
      title: '10% Off All Products',
      description: 'Flat 10% discount on every product purchase',
      color: 'from-orange-500 to-red-500',
      highlight: 'On 20,000+ products'
    },
    {
      icon: Coins,
      title: 'Earn DentalCoins',
      description: '₹1 = 1 DentalCoin on every purchase. Redeem for discounts',
      color: 'from-yellow-500 to-amber-500',
      highlight: '1:1 conversion'
    },
    {
      icon: Gift,
      title: 'Exclusive Deals',
      description: 'Access to member-only deals and early product launches',
      color: 'from-indigo-500 to-blue-500',
      highlight: 'VIP access'
    }
  ];

  const additionalPerks = [
    { icon: Star, text: 'Priority Customer Support' },
    { icon: Zap, text: 'Express Processing' },
    { icon: Heart, text: 'Birthday Special Offers' },
    { icon: Shield, text: 'Extended Warranty' },
    { icon: Users, text: 'Exclusive Community Access' },
    { icon: Award, text: 'Loyalty Rewards Program' }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Subscribe',
      description: 'Choose your membership plan and complete payment',
      icon: Crown,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      title: 'Shop & Save',
      description: 'Get instant 10% off on all products + free delivery',
      icon: ShoppingBag,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '03',
      title: 'Earn Coins',
      description: 'Every ₹1 spent = 1 DentalCoin in your account',
      icon: Coins,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      step: '04',
      title: 'Redeem & Enjoy',
      description: 'Use coins for discounts and enjoy exclusive benefits',
      icon: Gift,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const monthlyPrice = 5000;
  const yearlyPrice = 50000; // 2 months free
  const savings = monthlyPrice * 12 - yearlyPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-96 h-96 border-8 border-white rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-0 w-80 h-80 border-8 border-white rounded-full"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              👑
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Premium Membership
            </h1>
            <p className="text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join 50,000+ dentists saving big with exclusive benefits, free delivery, and amazing rewards!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl">
                <div className="text-4xl font-bold">₹5,000</div>
                <div className="text-sm opacity-90">per month</div>
              </div>
              <div className="text-3xl">or</div>
              <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl relative">
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold">
                  SAVE ₹10K
                </div>
                <div className="text-4xl font-bold">₹50,000</div>
                <div className="text-sm opacity-90">per year</div>
              </div>
            </div>

            <motion.a
              href="#subscribe"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
            >
              <Crown className="w-6 h-6" />
              Join Now
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* Free Delivery Banner */}
      <section className="py-4 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center justify-center gap-8 text-white"
          >
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">FREE DELIVERY</div>
                <div className="text-sm opacity-90">On All Orders</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/30"></div>
            <div className="flex items-center gap-3">
              <Percent className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">10% OFF</div>
                <div className="text-sm opacity-90">Every Purchase</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/30"></div>
            <div className="flex items-center gap-3">
              <Coins className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">EARN COINS</div>
                <div className="text-sm opacity-90">₹1 = 1 Coin</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Exclusive Member Benefits</h2>
            <p className="text-xl text-gray-600">Everything you need to grow your practice</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`}></div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold mb-4">
                    {benefit.highlight}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Start saving in 4 simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-24 h-24 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
                  >
                    <Icon className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <div className="text-6xl font-bold text-gray-100 mb-2">{item.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>

                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-gray-300 to-transparent -translate-x-1/2"></div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DentalCoins Explanation */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">DentalCoins Rewards</h2>
              </div>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Every rupee you spend earns you 1 DentalCoin. It's that simple! 
                Use your coins to get discounts on future purchases.
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold">Purchase Amount</span>
                    <span className="text-2xl font-bold text-gray-900">₹10,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold">DentalCoins Earned</span>
                    <span className="text-2xl font-bold text-yellow-600">10,000 Coins</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-6 text-white shadow-lg">
                  <div className="text-center">
                    <div className="text-sm font-semibold mb-2">Conversion Rate</div>
                    <div className="text-4xl font-bold">₹1 = 1 Coin</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Redeem Your Coins</h3>
              
              <div className="space-y-4">
                {[
                  { coins: '1,000', discount: '₹100 Off', color: 'from-blue-500 to-cyan-500' },
                  { coins: '5,000', discount: '₹500 Off', color: 'from-purple-500 to-pink-500' },
                  { coins: '10,000', discount: '₹1,000 Off', color: 'from-orange-500 to-red-500' },
                  { coins: '25,000', discount: '₹2,500 Off', color: 'from-green-500 to-emerald-500' }
                ].map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${tier.color} rounded-xl p-4 text-white flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      <Coins className="w-6 h-6" />
                      <span className="font-bold">{tier.coins} Coins</span>
                    </div>
                    <div className="text-xl font-bold">{tier.discount}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Perks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Even More Perks</h2>
            <p className="text-xl text-gray-600">Additional benefits included with your membership</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {additionalPerks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 flex items-center gap-4 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">{perk.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="subscribe" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 mb-8">Start saving today with our flexible plans</p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-8 py-3 rounded-full font-semibold transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save ₹10K
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 text-white text-center">
              <Crown className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">Premium Membership</h3>
              <p className="text-lg opacity-90">All benefits included</p>
            </div>

            <div className="p-12">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gray-900 mb-2">
                  ₹{billingCycle === 'monthly' ? monthlyPrice.toLocaleString() : yearlyPrice.toLocaleString()}
                </div>
                <div className="text-xl text-gray-600">
                  per {billingCycle === 'monthly' ? 'month' : 'year'}
                </div>
                {billingCycle === 'yearly' && (
                  <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                    Save ₹{savings.toLocaleString()} per year
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {[
                  'Unlimited Free Delivery',
                  '1st Service Completely Free',
                  '30% Off on All Services',
                  '10% Off on All Products',
                  'Earn DentalCoins (₹1 = 1 Coin)',
                  'Exclusive Member Deals',
                  'Priority Support',
                  'Extended Warranty'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                <Crown className="w-6 h-6" />
                Subscribe Now
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <p className="text-center text-gray-500 text-sm mt-6">
                Cancel anytime. No questions asked.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Ready to Start Saving?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of dentists who are already enjoying exclusive benefits
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#subscribe"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all inline-flex items-center justify-center gap-2"
              >
                <Crown className="w-6 h-6" />
                Get Started
              </motion.a>
              <motion.a
                href="tel:+919876543210"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-6 h-6" />
                Call Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
