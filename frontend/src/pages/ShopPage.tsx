import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Heart, ShoppingCart, Star, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  discount?: number;
}

interface Filters {
  manufacturers: string[];
  categories: string[];
  priceRange: [number, number];
  rating: number;
  sortBy: string;
  searchQuery: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  
  const [filters, setFilters] = useState<Filters>({
    manufacturers: [],
    categories: [],
    priceRange: [0, 100000],
    rating: 0,
    sortBy: 'relevance',
    searchQuery: ''
  });

  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState(0);

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to dummy data if API fails
      loadDummyData();
    } finally {
      setLoading(false);
    }
  };

  const loadDummyData = () => {
    const dummyProducts: Product[] = [
      {
        id: 1,
        name: "Dental Ultrasonic Scaler",
        brand: "Woodpecker",
        category: "Equipment",
        price: 12999,
        mrp: 15999,
        rating: 4.5,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400",
        inStock: true,
        discount: 19
      },
      {
        id: 2,
        name: "LED Curing Light",
        brand: "3M ESPE",
        category: "Equipment",
        price: 8499,
        mrp: 10999,
        rating: 4.8,
        reviews: 256,
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400",
        inStock: true,
        discount: 23
      },
      {
        id: 3,
        name: "Dental Composite Kit",
        brand: "Dentsply",
        category: "Materials",
        price: 3299,
        mrp: 3299,
        rating: 4.6,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400",
        inStock: true
      },
      {
        id: 4,
        name: "Surgical Extraction Kit",
        brand: "Hu-Friedy",
        category: "Instruments",
        price: 5999,
        mrp: 7499,
        rating: 4.7,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1598531228433-d9f0b5f9c4e0?w=400",
        inStock: true,
        discount: 20
      },
      {
        id: 5,
        name: "Apex Locator",
        brand: "Dentsply",
        category: "Equipment",
        price: 15999,
        mrp: 18999,
        rating: 4.6,
        reviews: 178,
        image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=400",
        inStock: true,
        discount: 16
      },
      {
        id: 6,
        name: "Dental Loupes 3.5x",
        brand: "Orascoptic",
        category: "Equipment",
        price: 24999,
        mrp: 29999,
        rating: 4.9,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
        inStock: true,
        discount: 17
      },
      {
        id: 7,
        name: "Autoclave Sterilizer",
        brand: "Tuttnauer",
        category: "Equipment",
        price: 45999,
        mrp: 45999,
        rating: 4.4,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400",
        inStock: false
      },
      {
        id: 8,
        name: "Dental Chair Unit",
        brand: "Sirona",
        category: "Furniture",
        price: 189999,
        mrp: 219999,
        rating: 4.8,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400",
        inStock: true,
        discount: 14
      }
    ];
    setProducts(dummyProducts);
    setFilteredProducts(dummyProducts);
  };

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [selectedManufacturers, selectedCategories, priceRange, minRating, filters.sortBy, filters.searchQuery, products]);

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (filters.searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Manufacturer filter
    if (selectedManufacturers.length > 0) {
      filtered = filtered.filter(p => selectedManufacturers.includes(p.brand));
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Price range filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-az':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const toggleManufacturer = (brand: string) => {
    setSelectedManufacturers(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const resetFilters = () => {
    setSelectedManufacturers([]);
    setSelectedCategories([]);
    setPriceRange([0, 100000]);
    setMinRating(0);
    setFilters(prev => ({ ...prev, sortBy: 'relevance', searchQuery: '' }));
  };

  const uniqueBrands = Array.from(new Set(products.map(p => p.brand))).sort();
  const uniqueCategories = Array.from(new Set(products.map(p => p.category))).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="text-2xl">🦷</div>
              <h1 className="text-xl font-bold text-[#007AFF]">Dentalkart</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search over 20,000 Dental Products"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#007AFF] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <SlidersHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-64 flex-shrink-0 bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-[#007AFF] hover:underline"
                  >
                    Reset
                  </button>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007AFF] focus:border-transparent text-sm"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="name-az">Name: A to Z</option>
                    <option value="name-za">Name: Z to A</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6 pb-6 border-b">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6 pb-6 border-b">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                          minRating === rating
                            ? 'bg-[#007AFF] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm">& Up</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Manufacturers */}
                <div className="mb-6 pb-6 border-b">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Manufacturers
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uniqueBrands.map((brand) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedManufacturers.includes(brand)}
                          onChange={() => toggleManufacturer(brand)}
                          className="rounded border-gray-300 text-[#007AFF] focus:ring-[#007AFF]"
                        />
                        <span className="text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Category
                  </label>
                  <div className="space-y-2">
                    {uniqueCategories.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="rounded border-gray-300 text-[#007AFF] focus:ring-[#007AFF]"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007AFF]"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <p className="text-gray-500">No products found matching your criteria.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-[#007AFF] hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => {
                  const navigate = useNavigate();
                  return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                          {product.discount}% OFF
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            wishlist.includes(product.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <p className="text-xs text-[#007AFF] font-medium mb-1">{product.brand}</p>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 h-10">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                          {product.rating}
                          <Star className="h-3 w-3 ml-0.5 fill-current" />
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.mrp !== product.price && (
                          <span className="text-xs text-gray-500 line-through">
                            ₹{product.mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => e.stopPropagation()}
                        disabled={!product.inStock}
                        className={`w-full py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                          product.inStock
                            ? 'bg-[#007AFF] text-white hover:bg-[#0056b3]'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
