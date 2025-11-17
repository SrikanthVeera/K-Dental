import { Router, Request, Response } from 'express';

const router = Router();

// Mock product data - replace with actual database queries
const products = [
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
    discount: 19,
    description: "Professional ultrasonic scaler with LED light"
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
    discount: 23,
    description: "High-intensity LED curing light"
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
    inStock: true,
    description: "Complete composite restoration kit"
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
    discount: 20,
    description: "Premium surgical extraction instruments"
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
    discount: 16,
    description: "Electronic apex locator for root canal treatment"
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
    discount: 17,
    description: "Professional dental loupes with LED light"
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
    inStock: false,
    description: "Medical grade autoclave sterilizer"
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
    discount: 14,
    description: "Complete dental chair unit with accessories"
  },
  {
    id: 9,
    name: "Dental Handpiece",
    brand: "NSK",
    category: "Equipment",
    price: 18999,
    mrp: 22999,
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400",
    inStock: true,
    discount: 17,
    description: "High-speed dental handpiece"
  },
  {
    id: 10,
    name: "Dental X-Ray Unit",
    brand: "Carestream",
    category: "Equipment",
    price: 125000,
    mrp: 145000,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400",
    inStock: true,
    discount: 14,
    description: "Digital dental X-ray imaging system"
  }
];

// GET /api/products - Get all products with filters
router.get('/', (req: Request, res: Response) => {
  try {
    const {
      search,
      brand,
      category,
      minPrice,
      maxPrice,
      minRating,
      sortBy,
      page = 1,
      limit = 20
    } = req.query;

    let filteredProducts = [...products];

    // Search filter
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      );
    }

    // Brand filter
    if (brand) {
      const brands = (brand as string).split(',');
      filteredProducts = filteredProducts.filter(p => brands.includes(p.brand));
    }

    // Category filter
    if (category) {
      const categories = (category as string).split(',');
      filteredProducts = filteredProducts.filter(p => categories.includes(p.category));
    }

    // Price range filter
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
    }

    // Rating filter
    if (minRating) {
      filteredProducts = filteredProducts.filter(p => p.rating >= Number(minRating));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-az':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // relevance - keep original order
        break;
    }

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        total: filteredProducts.length,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(filteredProducts.length / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === Number(id));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});

// GET /api/products/filters/options - Get filter options
router.get('/filters/options', (req: Request, res: Response) => {
  try {
    const brands = Array.from(new Set(products.map(p => p.brand))).sort();
    const categories = Array.from(new Set(products.map(p => p.category))).sort();
    const priceRange = {
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    };

    res.json({
      success: true,
      data: {
        brands,
        categories,
        priceRange
      }
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options'
    });
  }
});

export default router;
