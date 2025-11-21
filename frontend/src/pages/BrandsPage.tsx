import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Award, Package } from 'lucide-react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Brand {
  id: number;
  name: string;
  logo: string;
  productCount: number;
  description: string;
  featured: boolean;
}

export default function BrandsPage() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    filterBrands();
  }, [brands, searchQuery, selectedLetter]);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/brands');
      setBrands(response.data.data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
      // Mock data for demo
      const mockBrands: Brand[] = [
        { id: 1, name: '3M ESPE', logo: 'https://via.placeholder.com/150', productCount: 245, description: 'Leading dental materials manufacturer', featured: true },
        { id: 2, name: 'Dentsply Sirona', logo: 'https://via.placeholder.com/150', productCount: 312, description: 'Complete dental solutions', featured: true },
        { id: 3, name: 'Ivoclar Vivadent', logo: 'https://via.placeholder.com/150', productCount: 189, description: 'Innovative dental products', featured: true },
        { id: 4, name: 'Kerr Dental', logo: 'https://via.placeholder.com/150', productCount: 156, description: 'Quality dental supplies', featured: false },
        { id: 5, name: 'GC Corporation', logo: 'https://via.placeholder.com/150', productCount: 198, description: 'Japanese dental excellence', featured: false },
        { id: 6, name: 'Ultradent', logo: 'https://via.placeholder.com/150', productCount: 134, description: 'Advanced dental materials', featured: false },
        { id: 7, name: 'Shofu Dental', logo: 'https://via.placeholder.com/150', productCount: 167, description: 'Premium dental products', featured: false },
        { id: 8, name: 'Septodont', logo: 'https://via.placeholder.com/150', productCount: 89, description: 'Anesthesia specialists', featured: false },
        { id: 9, name: 'Bisco Dental', logo: 'https://via.placeholder.com/150', productCount: 112, description: 'Bonding & restorative', featured: false },
        { id: 10, name: 'Coltene', logo: 'https://via.placeholder.com/150', productCount: 145, description: 'Swiss dental quality', featured: false },
        { id: 11, name: 'Angelus', logo: 'https://via.placeholder.com/150', productCount: 78, description: 'Endodontic solutions', featured: false },
        { id: 12, name: 'Miltex', logo: 'https://via.placeholder.com/150', productCount: 203, description: 'Surgical instruments', featured: false },
      ];
      setBrands(mockBrands);
    } finally {
      setLoading(false);
    }
  };

  const filterBrands = () => {
    let filtered = [...brands];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(brand =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Letter filter
    if (selectedLetter !== 'All') {
      filtered = filtered.filter(brand =>
        brand.name.toUpperCase().startsWith(selectedLetter)
      );
    }

    // Sort alphabetically
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredBrands(filtered);
  };

  const handleBrandClick = (brandName: string) => {
    navigate(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  const featuredBrands = brands.filter(b => b.featured);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-5xl font-bold mb-4">Explore Top Dental Brands</h1>
              <p className="text-xl opacity-90">
                Discover premium dental equipment from world-leading manufacturers
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Brands Section */}
      {featuredBrands.length > 0 && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Brands</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleBrandClick(brand.name)}
                  className="bg-white rounded-xl shadow-md border-2 border-blue-200 p-6 cursor-pointer hover:shadow-xl hover:border-blue-400 transition-all group"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 text-center mb-1 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-gray-600 text-center">
                    {brand.productCount} Products
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alphabet Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedLetter('All')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex-shrink-0 ${
                selectedLetter === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all flex-shrink-0 ${
                  selectedLetter === letter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All Brands Grid */}
      <div className="bg-gray-50 min-h-screen">
        <div className="px-4 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">
              All Brands ({filteredBrands.length})
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3" />
                  <div className="bg-gray-200 h-4 rounded mb-2" />
                  <div className="bg-gray-200 h-3 rounded w-2/3 mx-auto" />
                </div>
              ))}
            </div>
          ) : filteredBrands.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md p-16 text-center"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No brands found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLetter('All');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {filteredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => handleBrandClick(brand.name)}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 cursor-pointer hover:shadow-xl hover:border-blue-400 transition-all group"
                >
                  <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 text-center mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-gray-600 text-center">
                    {brand.productCount} Products
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
