import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingCart,
  Star,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import axios from 'axios';
import { useAddToCart } from '../hooks/useAddToCart';
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

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const categoryData: Record<string, any> = {
    equipment: {
      title: 'Dental Equipment',
      icon: '🦷',
      color: 'from-blue-500 to-cyan-500',
      description: 'Professional dental equipment for your clinic'
    },
    instruments: {
      title: 'Dental Instruments',
      icon: '🔧',
      color: 'from-purple-500 to-pink-500',
      description: 'High-quality dental instruments'
    },
    materials: {
      title: 'Dental Materials',
      icon: '💊',
      color: 'from-green-500 to-emerald-500',
      description: 'Premium dental materials and supplies'
    },
    consumables: {
      title: 'Consumables',
      icon: '📦',
      color: 'from-orange-500 to-red-500',
      description: 'Daily use dental consumables'
    },
    furniture: {
      title: 'Dental Furniture',
      icon: '🪑',
      color: 'from-yellow-500 to-orange-500',
      description: 'Comfortable and durable dental furniture'
    },
    implants: {
      title: 'Dental Implants',
      icon: '⚙️',
      color: 'from-indigo-500 to-purple-500',
      description: 'Advanced dental implant systems'
    }
  };

  const currentCategory = categoryData[category?.toLowerCase() || 'equipment'];

  useEffect(() => {
    fetchProducts();
  }, [category]);

  useEffect(() => {
    applyFilters();
  }, [products, priceRange, selectedBrands, selectedRatings]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/products?category=${category}`);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(p => selectedRatings.includes(Math.floor(p.rating)));
    }

    setFilteredProducts(filtered);
  };

  const handleResetFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedBrands([]);
    setSelectedRatings([]);
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

  const { addToCart: addToCartHook } = useAddToCart();

  const addToCart = (product: Product) => {
    addToCartHook({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      brand: product.brand,
      category: product.category,
      inStock: product.inStock
    }, true); // Redirect to cart page
  };

  const brands = Array.from(new Set(products.map(p => p.brand)));

  const bannerSlides = [
    {
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=400&fit=crop',
      title: 'Professional Dental Equipment',
      subtitle: 'High-Quality Tools for Your Practice'
    },
    {
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&h=400&fit=crop',
      title: 'Advanced Dental Technology',
      subtitle: 'Innovation Meets Precision'
    },
    {
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=400&fit=crop',
      title: 'Complete Dental Solutions',
      subtitle: 'Everything You Need in One Place'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  return (
    <>
      <Header />
      
      {/* TOP SECTION */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-6">
          <div className="flex gap-6">
            {/* Left Side - Delivery Man Animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-80 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 flex flex-col items-center justify-center border border-blue-100 shadow-sm"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl mb-4"
              >
                🚚
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600 text-center">
                Free shipping on orders above ₹5000
              </p>
              <div className="mt-4 flex items-center gap-2 text-blue-600">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
                <span className="text-sm font-semibold">Track Your Order</span>
              </div>
            </motion.div>

            {/* Right Side - Banner Slider */}
            <div className="flex-1 relative rounded-xl overflow-hidden shadow-lg">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-80"
              >
                <img
                  src={bannerSlides[currentSlide].image}
                  alt={bannerSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                  <div className="px-12 text-white">
                    <h2 className="text-4xl font-bold mb-3">{bannerSlides[currentSlide].title}</h2>
                    <p className="text-lg opacity-90">{bannerSlides[currentSlide].subtitle}</p>
                  </div>
                </div>
              </motion.div>

              {/* Slider Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {bannerSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            K-Dental {currentCategory?.title}
          </h1>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for dental equipment, instruments, materials..."
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA - Independent Scrolling Sections */}
      <div className="bg-gray-50">
        <div className="px-4">
          <div className="flex gap-4 py-4" style={{ height: 'calc(100vh - 600px)', minHeight: '600px' }}>
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
                  {/* Brand Filter */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Brand</h3>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors group">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBrands([...selectedBrands, brand]);
                              } else {
                                setSelectedBrands(selectedBrands.filter(b => b !== brand));
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">{brand}</span>
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
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 animate-pulse shadow-sm">
                      <div className="bg-gray-200 h-48 rounded-lg mb-3" />
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
                  <div className="text-6xl mb-4">🔍</div>
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

      {/* FOOTER */}
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
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
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
