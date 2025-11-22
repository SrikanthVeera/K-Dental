import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingCart,
  Star,
  Filter,
  Search,
  RotateCcw,
  Package
} from 'lucide-react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  numReviews: number;
  image: string;
  category: string;
  inStock: boolean;
  featured: boolean;
}

interface Brand {
  id: number;
  name: string;
  logo: string;
  description: string;
  featured: boolean;
}

export default function BrandProductsPage() {
  const [searchParams] = useSearchParams();
  const brandName = searchParams.get('brand') || '';
  const navigate = useNavigate();
  
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Equipment', 'Instruments', 'Materials', 'Consumables', 'Furniture', 'Other'];

  useEffect(() => {
    if (brandName) {
      fetchBrandAndProducts();
    }
  }, [brandName]);

  useEffect(() => {
    applyFilters();
  }, [products, priceRange, selectedCategories, selectedRatings, searchQuery]);

  const fetchBrandAndProducts = async () => {
    setLoading(true);
    try {
      // Fetch products by brand
      const productsResponse = await axios.get(`http://localhost:5000/api/products?brand=${encodeURIComponent(brandName)}`);
      setProducts(productsResponse.data.data || []);

      // Fetch brand info
      try {
        const brandsResponse = await axios.get('http://localhost:5000/api/brands');
        const brandInfo = brandsResponse.data.data?.find((b: Brand) => b.name === brandName);
        if (brandInfo) {
          setBrand(brandInfo);
        }
      } catch (error) {
        console.error('Error fetching brand info:', error);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(p => selectedRatings.includes(Math.floor(p.rating)));
    }

    setFilteredProducts(filtered);
  };

  const handleResetFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSearchQuery('');
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: Product) => {
    console.log('Added to cart:', product);
  };

  return (
    <>
      <Header />

      {/* Brand Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="px-4 py-8">
          <div className="max-w-7xl mx-auto flex items-center gap-6">
            {brand?.logo && (
              <div className="w-32 h-32 bg-white rounded-xl p-4 flex items-center justify-center shadow-lg">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{brandName}</h1>
              {brand?.description && (
                <p className="text-lg opacity-90">{brand.description}</p>
              )}
              <p className="text-sm opacity-80 mt-2">
                {products.length} Products Available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${brandName} products...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Independent Scrolling Sections */}
      <div className="bg-gray-50">
        <div className="px-4">
          <div className="flex gap-4 py-4" style={{ height: 'calc(100vh - 500px)', minHeight: '600px' }}>
            {/* LEFT SIDE - FILTER PANEL (Fixed width, Independent Scroll) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 flex-shrink-0"
            >
              <div className="bg-white rounded-xl shadow-md border border-gray-200 h-full flex flex-col overflow-hidden">
                {/* Filter Header with Reset Button */}
                <div className="p-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>

                {/* Scrollable Filter Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}
                >
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Category</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category} className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors group">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Price Range</h3>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between items-center bg-blue-50 px-3 py-2 rounded-lg">
                        <span className="text-sm font-semibold text-gray-700">₹{priceRange[0]}</span>
                        <span className="text-xs text-gray-500">to</span>
                        <span className="text-sm font-semibold text-gray-700">₹{priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Filter (Multi-select) */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Rating</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <label key={rating} className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors group">
                          <input
                            type="checkbox"
                            checked={selectedRatings.includes(rating)}
                            onChange={() => toggleRating(rating)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-700 ml-2 group-hover:text-gray-900">
                              {rating} {rating === 1 ? 'Star' : 'Stars'}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - PRODUCT GRID (Independent Scroll) */}
            <div className="flex-1 h-full overflow-y-auto"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f1f5f9' }}
            >
              {loading ? (
                <div className="grid grid-cols-6 gap-4">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 animate-pulse shadow-sm">
                      <div className="bg-gray-200 h-44 rounded-lg mb-3" />
                      <div className="bg-gray-200 h-4 rounded mb-2" />
                      <div className="bg-gray-200 h-4 rounded w-2/3 mb-3" />
                      <div className="bg-gray-200 h-10 rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-6 gap-4 pb-6">
                  {filteredProducts.map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={() => toggleWishlist(product.id)}
                      onAddToCart={() => addToCart(product)}
                      index={idx}
                    />
                  ))}
                </div>
              )}

              {!loading && filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-md p-16 text-center"
                >
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                  <button
                    onClick={handleResetFilters}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-md"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  index: number;
}

function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      {/* Product Image */}
      <div className="relative h-44 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Favourite/Wishlist Icon */}
        <button
          onClick={onToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all ${
            isWishlisted 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Product Title */}
        <h3 className="text-xs font-semibold text-gray-800 mb-2 line-clamp-2 h-8 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.numReviews})</span>
        </div>

        {/* Price & Title Area */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.mrp !== product.price && (
              <span className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
            )}
          </div>
          {product.mrp !== product.price && (
            <span className="text-xs text-green-600 font-semibold">
              Save ₹{(product.mrp - product.price).toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
