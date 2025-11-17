import { Product, Review, User } from '../models/index.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
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
      limit = 20,
    } = req.query;

    // Build where clause
    const where = {};

    // Search filter
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { brand: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    // Brand filter
    if (brand) {
      const brands = brand.split(',');
      where.brand = { [Op.in]: brands };
    }

    // Category filter
    if (category) {
      const categories = category.split(',');
      where.category = { [Op.in]: categories };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = Number(minPrice);
      if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    // Rating filter
    if (minRating) {
      where.rating = { [Op.gte]: Number(minRating) };
    }

    // Sorting
    let order = [];
    switch (sortBy) {
      case 'price-low':
        order = [['price', 'ASC']];
        break;
      case 'price-high':
        order = [['price', 'DESC']];
        break;
      case 'rating':
        order = [['rating', 'DESC']];
        break;
      case 'name-az':
        order = [['name', 'ASC']];
        break;
      case 'name-za':
        order = [['name', 'DESC']];
        break;
      default:
        order = [['createdAt', 'DESC']];
    }

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      order,
      limit: limitNum,
      offset,
    });

    res.json({
      success: true,
      data: products,
      pagination: {
        total: count,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(count / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image,
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    await product.update(updateData);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    await product.destroy();

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get filter options
// @route   GET /api/products/filters/options
// @access  Public
export const getFilterOptions = async (req, res) => {
  try {
    const [brands] = await sequelize.query(
      'SELECT DISTINCT brand FROM products ORDER BY brand'
    );

    const [categories] = await sequelize.query(
      'SELECT DISTINCT category FROM products ORDER BY category'
    );

    const [priceRange] = await sequelize.query(
      'SELECT MIN(price) as min, MAX(price) as max FROM products'
    );

    res.json({
      success: true,
      data: {
        brands: brands.map((b) => b.brand),
        categories: categories.map((c) => c.category),
        priceRange: priceRange[0] || { min: 0, max: 100000 },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = await Review.findOne({
      where: {
        userId: req.user.id,
        productId: req.params.id,
      },
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'Product already reviewed',
      });
    }

    // Create review
    await Review.create({
      userId: req.user.id,
      productId: req.params.id,
      rating: Number(rating),
      comment,
    });

    // Update product rating
    const reviews = await Review.findAll({
      where: { productId: req.params.id },
    });

    product.numReviews = reviews.length;
    product.rating = (
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
    ).toFixed(1);

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
