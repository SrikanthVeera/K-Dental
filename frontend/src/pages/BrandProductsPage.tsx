import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Star, Heart } from 'lucide-react';

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
  
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (brandName) {
      fetchBrandAndProducts();
    }
  }, [brandName]);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const fetchBrandAndProducts = async () => {
    setLoading(true);
    try {
      const productsResponse = await axios.get(`http://localhost:5000/api/products?brand=${encodeURIComponent(brandName)}`);
      setProducts(productsResponse.data.data || []);

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

  const categories = [
    { name: 'Promotions', icon: '🎁', color: 'from-pink-500 to-rose-500', hoverColor: 'hover:from-pink-600 hover:to-rose-600' },
    { name: 'Monday8', icon: '📅', color: 'from-blue-500 to-cyan-500', hoverColor: 'hover:from-blue-600 hover:to-cyan-600' },
    { name: 'Natural', icon: '🌿', color: 'from-green-500 to-emerald-500', hoverColor: 'hover:from-green-600 hover:to-emerald-600' },
    { name: 'Devices', icon: '🔧', color: 'from-purple-500 to-indigo-500', hoverColor: 'hover:from-purple-600 hover:to-indigo-600' },
    { name: 'Service', icon: '⚙️', color: 'from-orange-500 to-amber-500', hoverColor: 'hover:from-orange-600 hover:to-amber-600' }
  ];

  const features = [
    { icon: '📦', title: '20,000+ Products', color: 'bg-blue-500', shadowColor: 'shadow-blue-200' },
    { icon: '🏷️', title: '450+ Brands', color: 'bg-blue-600', shadowColor: 'shadow-blue-300' },
    { icon: '✓', title: '100% Original', color: 'bg-blue-500', shadowColor: 'shadow-blue-200' },
    { icon: '💰', title: 'Best price', color: 'bg-blue-600', shadowColor: 'shadow-blue-300' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <div className="text-xl font-semibold text-blue-600 animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-2xl font-bold text-gray-800">Brand not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Hero Banner Section */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/20"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
          <Link 
            to="/brands" 
            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-6 transition-all duration-300 hover:gap-3 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">←</span> 
            <span className="font-medium">Back to Brands</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fadeInLeft">
              <div className="inline-block">
                <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-900/30 px-4 py-2 rounded-full">
                  {brand.name}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Standard Photopolymer
                <span className="block text-yellow-400 mt-2 animate-pulse">Model Resin</span>
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Fine Details. Flawless Prints. Unmatched Accuracy
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-white text-slate-900 px-6 py-3 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <div className="text-xs text-gray-600 font-medium">Starting at</div>
                  <div className="text-2xl font-bold">₹1,199/-</div>
                </div>
                <div className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-yellow-300 transition-colors cursor-pointer">
                  1KG
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Available colors:</span>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-cyan-400 border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform duration-300 animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform duration-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>

            {/* Right Image Carousel */}
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl animate-fadeInRight">
              <button 
                onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-slate-900 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              >
                <span className="text-2xl font-bold">‹</span>
              </button>
              
              <div className="relative h-full">
                {[1, 2, 3].map((_, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ${
                      currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <img 
                      src={brand.logo}
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-slate-900 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              >
                <span className="text-2xl font-bold">›</span>
              </button>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-8 bg-white shadow-lg' : 'w-2 bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 cursor-pointer group animate-fadeInUp"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg ${feature.shadowColor} group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-12`}>
                  {feature.icon}
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fadeIn">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="group cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${cat.color} ${cat.hoverColor} aspect-square rounded-full flex items-center justify-center text-6xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500"></div>
                <span className="relative z-10 transform group-hover:scale-125 transition-transform duration-500">
                  {cat.icon}
                </span>
              </div>
              <p className="text-center mt-4 font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300 text-lg">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800">
            All Products
            <span className="text-lg font-normal text-gray-500 ml-3">({products.length} items)</span>
          </h2>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-2xl animate-fadeIn">
            <div className="text-6xl mb-4 animate-bounce">📦</div>
            <p className="text-gray-500 text-lg">No products available for this brand yet.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  product: Product;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addToCart = () => {
    console.log('Added to cart:', product);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-fadeInUp"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
          {product.discount}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Brand */}
        <p className="text-sm text-blue-600 font-semibold mb-1">
          {product.brand}
        </p>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {product.rating}
          </span>
          <span className="text-sm text-gray-500">
            ({product.numReviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.mrp !== product.price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          disabled={!product.inStock}
          className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
            product.inStock
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-colors duration-300 pointer-events-none" />
    </div>
  );
}
