import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-3xl">🦷</div>
              <h3 className="text-2xl font-bold text-white">DentalShop</h3>
            </div>
            <p className="text-sm mb-4 leading-relaxed">
              India's most trusted dental e-commerce platform. Serving 2 Lakh+ dentists with 20,000+ products.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#007AFF] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#007AFF] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#007AFF] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#007AFF] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#007AFF] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/shop-new" className="hover:text-[#007AFF] transition-colors">Shop</Link></li>
              <li><Link to="/best-seller" className="hover:text-[#007AFF] transition-colors">Best Sellers</Link></li>
              <li><Link to="/new-clinic-setup" className="hover:text-[#007AFF] transition-colors">New Clinic Setup</Link></li>
              <li><Link to="/membership" className="hover:text-[#007AFF] transition-colors">Membership</Link></li>
              <li><Link to="/events" className="hover:text-[#007AFF] transition-colors">Events</Link></li>
              <li><Link to="/buying-guide" className="hover:text-[#007AFF] transition-colors">Buying Guide</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-[#007AFF] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#007AFF] transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-[#007AFF] transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-[#007AFF] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-[#007AFF] transition-colors">Return Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#007AFF] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#007AFF] flex-shrink-0 mt-1" />
                <span className="text-sm">
                  123 Dental Street, Medical Plaza<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#007AFF] flex-shrink-0" />
                <a href="tel:+919876543210" className="text-sm hover:text-[#007AFF] transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#007AFF] flex-shrink-0" />
                <a href="mailto:support@dentalshop.com" className="text-sm hover:text-[#007AFF] transition-colors">
                  support@dentalshop.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              <span className="font-semibold text-white">We Accept:</span>
              <div className="flex gap-3 mt-2">
                <img src="https://via.placeholder.com/50x30?text=Visa" alt="Visa" className="h-8 bg-white rounded px-2" />
                <img src="https://via.placeholder.com/50x30?text=MC" alt="Mastercard" className="h-8 bg-white rounded px-2" />
                <img src="https://via.placeholder.com/50x30?text=UPI" alt="UPI" className="h-8 bg-white rounded px-2" />
                <img src="https://via.placeholder.com/50x30?text=PayTM" alt="PayTM" className="h-8 bg-white rounded px-2" />
              </div>
            </div>
            <div className="text-sm text-center">
              <p className="text-white font-semibold mb-1">Download Our App</p>
              <div className="flex gap-2">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                  <span className="text-xs">Google Play</span>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                  <span className="text-xs">App Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>© {currentYear} DentalShop. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-[#007AFF] transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[#007AFF] transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-[#007AFF] transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
