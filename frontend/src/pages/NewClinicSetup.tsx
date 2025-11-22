import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Wrench,
  Package,
  Award,
  Clock,
  Shield,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export default function NewClinicSetup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
    location: '',
    setupType: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [activePackage, setActivePackage] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Our team will contact you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const packages = [
    {
      name: 'Starter Package',
      price: '₹15,00,000',
      gradient: 'from-blue-500 to-cyan-500',
      icon: '🏥',
      features: [
        'Basic Dental Chair Unit',
        'LED Curing Light',
        'Ultrasonic Scaler',
        'Air Compressor',
        'Suction Unit',
        'Basic Instruments Set',
        'Sterilization Equipment',
        '1 Year Warranty'
      ],
      popular: false
    },
    {
      name: 'Professional Package',
      price: '₹35,00,000',
      gradient: 'from-purple-500 to-pink-500',
      icon: '⭐',
      features: [
        'Premium Dental Chair Unit',
        'Digital X-Ray System',
        'LED Curing Light',
        'Ultrasonic Scaler',
        'Air Compressor & Suction',
        'Complete Instruments Set',
        'Autoclave Sterilizer',
        'Dental Loupes',
        'Waiting Area Furniture',
        '3 Years Warranty',
        'Free Training'
      ],
      popular: true
    },
    {
      name: 'Premium Package',
      price: '₹75,00,000',
      gradient: 'from-orange-500 to-red-500',
      icon: '👑',
      features: [
        'Luxury Dental Chair Unit',
        'Digital X-Ray & Panoramic',
        'Intraoral Camera',
        'CAD/CAM System',
        'Laser Equipment',
        'Complete Premium Instruments',
        'Advanced Sterilization',
        'Dental Microscope',
        'Complete Furniture Package',
        'Interior Design Consultation',
        '5 Years Warranty',
        'Lifetime Support'
      ],
      popular: false
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'Free consultation to understand your requirements',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Planning',
      description: 'Custom clinic design and equipment selection',
      icon: Building2,
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Installation',
      description: 'Professional installation by certified technicians',
      icon: Wrench,
      color: 'from-orange-500 to-red-500'
    },
    {
      number: '04',
      title: 'Training',
      description: 'Complete training and handover',
      icon: Award,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const benefits = [
    { icon: Shield, title: 'Certified Equipment', description: 'All products are certified and genuine' },
    { icon: Clock, title: 'Quick Setup', description: 'Complete setup in 30-45 days' },
    { icon: Award, title: 'Expert Team', description: '15+ years of experience' },
    { icon: TrendingUp, title: 'Best ROI', description: 'Optimized for maximum returns' },
    { icon: Package, title: 'Complete Solution', description: 'End-to-end clinic setup' },
    { icon: Sparkles, title: 'Modern Design', description: 'Contemporary clinic interiors' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              >
                <span className="text-sm font-semibold">🏥 Complete Clinic Setup Solutions</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Start Your Dream
                <span className="block text-yellow-300">Dental Clinic</span>
              </h1>

              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Transform your vision into reality with our comprehensive clinic setup services. 
                From planning to execution, we handle everything.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#packages"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2"
                >
                  View Packages
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Get Free Consultation
                </motion.a>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12">
                {[
                  { value: '500+', label: 'Clinics Setup' },
                  { value: '15+', label: 'Years Experience' },
                  { value: '100%', label: 'Satisfaction' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=600&fit=crop"
                  alt="Modern Dental Clinic"
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-pink-500/20 rounded-2xl blur-3xl"></div>
            </motion.div>
          </div>
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

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Your trusted partner for complete clinic setup</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600">Simple 4-step process to your dream clinic</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}
                    >
                      <Icon className="w-12 h-12 text-white" />
                    </motion.div>
                    <div className="text-5xl font-bold text-gray-200 mb-2">{step.number}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-gray-300 to-transparent -translate-x-1/2"></div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Setup Packages</h2>
            <p className="text-xl text-gray-600">Choose the perfect package for your clinic</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setActivePackage(index)}
                onHoverEnd={() => setActivePackage(null)}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all ${
                  pkg.popular ? 'ring-4 ring-purple-500 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div className={`h-40 bg-gradient-to-br ${pkg.gradient} flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                  <motion.div
                    animate={activePackage === index ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-6xl mb-2"
                  >
                    {pkg.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold">{pkg.name}</h3>
                </div>

                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{pkg.price}</div>
                    <div className="text-gray-600">Complete Setup</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block text-center py-4 rounded-xl font-bold transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
            <p className="text-xl text-gray-600">See our completed clinic setups</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=500&h=400&fit=crop',
              'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=400&fit=crop',
              'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=400&fit=crop',
              'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&h=400&fit=crop',
              'https://images.unsplash.com/photo-1598531228433-d9f0b5f9c4e0?w=500&h=400&fit=crop',
              'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=500&h=400&fit=crop'
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
              >
                <img
                  src={img}
                  alt={`Clinic ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                    <h4 className="text-lg font-bold">Modern Clinic Setup</h4>
                    <p className="text-sm">Complete installation</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 right-10 w-80 h-80 border-4 border-white rounded-full"
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 text-white"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              📞
            </motion.div>
            <h2 className="text-5xl font-bold mb-4">Get Free Consultation</h2>
            <p className="text-xl opacity-90">Fill the form and our team will contact you within 24 hours</p>
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>100% Secure</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-white/20"
          >
            <div className="flex items-center justify-center gap-3 mb-8 pb-6 border-b-2 border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Request Consultation</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="Dr. John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Clinic Name</label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="Smile Dental Clinic"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="Mumbai, Maharashtra"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Setup Type *</label>
                <select
                  name="setupType"
                  required
                  value={formData.setupType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                >
                  <option value="">Select Type</option>
                  <option value="new">New Clinic</option>
                  <option value="renovation">Renovation</option>
                  <option value="expansion">Expansion</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                >
                  <option value="">Select Budget</option>
                  <option value="10-20">₹10-20 Lakhs</option>
                  <option value="20-35">₹20-35 Lakhs</option>
                  <option value="35-50">₹35-50 Lakhs</option>
                  <option value="50+">₹50+ Lakhs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                >
                  <option value="">Select Timeline</option>
                  <option value="immediate">Immediate</option>
                  <option value="1-3">1-3 Months</option>
                  <option value="3-6">3-6 Months</option>
                  <option value="6+">6+ Months</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Requirements</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                placeholder="Tell us about your specific requirements..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700"
              >
                <CheckCircle2 className="w-5 h-5" />
                Submit Request
              </motion.button>
              
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-700"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </motion.button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Or call us directly at{' '}
                <a href="tel:+919876543210" className="text-purple-600 font-bold hover:text-purple-700">
                  +91 98765 43210
                </a>
              </p>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
