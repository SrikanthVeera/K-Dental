  import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Package, 
  Shield, 
  Award, 
  BadgeCheck, 
  Calendar, 
  MapPin, 
  TrendingUp,
  Star
} from 'lucide-react';
import axios from 'axios';
import Users from './admin/Users';

// Hero Banner Component - DentalKart Style
const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      brand: 'ELEGOO',
      title: 'Standard Photopolymer',
      subtitle: 'Model Resin',
      description: 'Fine Details. Flawless Prints. Unmatched Accuracy',
      price: '₹1,199/-',
      weight: '1KG',
      colors: ['🟢', '🟡'],
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop',
      bgColor: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
    },
    {
      id: 2,
      brand: 'WOODPECKER',
      title: 'Ultrasonic',
      subtitle: 'Dental Scaler',
      description: 'Professional Cleaning. Superior Performance',
      price: '₹12,999/-',
      weight: 'PRO',
      colors: ['🔵', '⚪'],
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=400&fit=crop',
      bgColor: 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative h-[400px] overflow-hidden rounded-2xl bg-black mb-6">
      {banners.map((banner, index) => (
        <motion.div
          key={banner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${banner.bgColor}`}
        >
          <div className="container mx-auto h-full flex items-center px-12">
            <div className="flex-1 text-white z-10">
              <div className="text-2xl font-bold mb-2">{banner.brand}</div>
              <h1 className="text-5xl font-bold mb-1">{banner.title}</h1>
              <h2 className="text-6xl font-bold mb-4 text-yellow-400">{banner.subtitle}</h2>
              <p className="text-lg mb-6 opacity-90">{banner.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white text-black px-4 py-2 rounded-lg">
                  <span className="text-sm">Starting at</span>
                  <div className="text-2xl font-bold">{banner.price}</div>
                </div>
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                  {banner.weight}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Available colors:</span>
                {banner.colors.map((color, i) => (
                  <span key={i} className="text-xl">{color}</span>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-80 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Trust Badges Component
const TrustBadges = () => {
  const badges = [
    { icon: Package, text: '20,000+ Products' },
    { icon: Shield, text: '450+ Brands' },
    { icon: BadgeCheck, text: '100% Original' },
    { icon: Award, text: 'Best price' }
  ];

  return (
    <div className="bg-blue-50 rounded-xl py-4 px-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-800">{badge.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Top Brands Component - DentalKart Style
const TopBrands = () => {
  const brands = [
    { name: '3M ESPE', logo: "/brands/brand3.png", products: 245 },
    { name: 'Dentsply', logo: "/brands/brand3.png", products: 189 },
    { name: 'Woodpecker', logo: "/brands/brand3.png", products: 156 },
    { name: 'NSK', logo: "/brands/brand3.png", products: 134 },
    { name: 'Hu-Friedy', logo: "/brands/brand3.png", products: 198 },
    { name: 'Sirona', logo: "/brands/brand3.png", products: 87 },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Brands</h2>
          <Link to="/brands" className="text-blue-600 text-sm font-medium hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
            >
              <img src={brand.logo} alt={brand.name} className="w-full h-12 object-contain mb-2" />
              <p className="text-xs text-gray-500 text-center">{brand.products} Products</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Top Categories Component
const TopCategories = () => {
  const categories = [
    { name: 'Equipment', icon: '🦷', count: 450, color: 'bg-blue-100 text-blue-600' },
    { name: 'Instruments', icon: '🔧', count: 680, color: 'bg-green-100 text-green-600' },
    { name: 'Materials', icon: '💊', count: 320, color: 'bg-purple-100 text-purple-600' },
    { name: 'Consumables', icon: '📦', count: 890, color: 'bg-orange-100 text-orange-600' },
    { name: 'Furniture', icon: '🪑', count: 120, color: 'bg-pink-100 text-pink-600' },
    { name: 'Implants', icon: '⚙️', count: 210, color: 'bg-teal-100 text-teal-600' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Categories</h2>
          <p className="text-gray-600">Explore our wide range of dental products</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer text-center"
            >
              <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count}+ Items</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Products Component - DentalKart Compact Style
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products?limit=12&sortBy=rating');
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-500">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Hot Selling Products</h2>
          <Link
            to="/shop-new"
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.slice(0, 12).map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
            >
              <div className="relative h-40 overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount > 0 && (
                  <div className="absolute top-1 left-1 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                    {product.discount}%
                  </div>
                )}
                <div className="absolute top-1 right-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-0.5">
                  {product.rating} ★
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-500 mb-1 truncate">{product.brand}</p>
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 h-10">{product.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-base font-bold text-gray-900">₹{product.price?.toLocaleString('en-IN')}</span>
                  {product.mrp !== product.price && (
                    <span className="text-xs text-gray-400 line-through">₹{product.mrp?.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>⭐ {product.rating}</span>
                  <span>({product.numReviews})</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// New Clinic Setup Component
const NewClinicSetup = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-white"
          >
            <h2 className="text-5xl font-bold mb-6">New Clinic Setup</h2>
            <p className="text-xl mb-8 opacity-90">
              Complete dental clinic setup solutions with expert guidance and premium equipment
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Complete Equipment Package',
                'Professional Installation',
                'Training & Support',
                'Warranty & Maintenance'
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span className="text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
            <Link
              to="/new-clinic-setup"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              Get Started
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <img
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop"
              alt="Clinic Setup"
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Membership Component
const Membership = () => {
  const plans = [
    {
      name: 'Silver',
      price: '₹999',
      period: '/year',
      features: ['5% Discount', 'Free Shipping', 'Priority Support', '500 DentalCoins'],
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'Gold',
      price: '₹1,999',
      period: '/year',
      features: ['10% Discount', 'Free Shipping', '24/7 Support', '1000 DentalCoins', 'Exclusive Deals'],
      color: 'from-yellow-400 to-yellow-600',
      popular: true
    },
    {
      name: 'Platinum',
      price: '₹4,999',
      period: '/year',
      features: ['15% Discount', 'Free Shipping', 'Dedicated Manager', '2500 DentalCoins', 'Early Access', 'Free Training'],
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Membership Plans</h2>
          <p className="text-gray-600">Join 2 Lakh+ dentists and save more</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden ${
                plan.popular ? 'ring-4 ring-[#007AFF] scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#007AFF] text-white px-4 py-1 text-sm font-semibold">
                  POPULAR
                </div>
              )}
              <div className={`h-32 bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                <h3 className="text-3xl font-bold text-white">{plan.name}</h3>
              </div>
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/membership"
                  className={`block text-center py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-[#007AFF] text-white hover:bg-[#0056b3]'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Choose Plan
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Events Component
const Events = () => {
  const events = [
    {
      title: 'Dental Implant Workshop',
      date: 'Dec 15, 2024',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      type: 'Workshop'
    },
    {
      title: 'Advanced Endodontics Seminar',
      date: 'Dec 22, 2024',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop',
      type: 'Seminar'
    },
    {
      title: 'Digital Dentistry Conference',
      date: 'Jan 10, 2025',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop',
      type: 'Conference'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
            <p className="text-gray-600">Join our educational events and workshops</p>
          </div>
          <Link
            to="/events"
            className="text-[#007AFF] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All Events <ChevronRight className="h-5 w-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#007AFF] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {event.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Component
const Stats = () => {
  const stats = [
    { icon: Users, value: '2L+', label: 'Happy Dentists' },
    { icon: Package, value: '20K+', label: 'Products' },
    { icon: TrendingUp, value: '99%', label: 'Satisfaction' },
    { icon: Award, value: '15+', label: 'Years Experience' }
  ];

  return (
    <section className="py-16 bg-[#007AFF]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <Icon className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Main HomePage Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <HeroBanner />
        <TrustBadges />
      </div>
      
      <TopBrands />
      <TopCategories />
      <FeaturedProducts />
      <NewClinicSetup />
      <Membership />
      <Events />
      <Stats />
    </div>
  );
}
