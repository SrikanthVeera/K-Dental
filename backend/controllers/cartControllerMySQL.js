import { Cart, CartItem, Product } from '../models/index.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
            },
          ],
        },
      ],
    });

    if (!cart) {
      cart = await Cart.create({ userId: req.user.id });
    }

    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    let cart = await Cart.findOne({ where: { userId: req.user.id } });

    if (!cart) {
      cart = await Cart.create({ userId: req.user.id });
    }

    const existingItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
        price: product.price,
      });
    }

    // Update cart totals
    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    cart.totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();

    // Reload cart with products
    cart = await Cart.findByPk(cart.id, {
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    res.json({
      success: true,
      message: 'Item added to cart',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(req.params.itemId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    const product = await Product.findByPk(cartItem.productId);
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    // Update cart totals
    const cart = await Cart.findByPk(cartItem.cartId);
    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    cart.totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();

    // Reload cart with products
    const updatedCart = await Cart.findByPk(cart.id, {
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    res.json({
      success: true,
      message: 'Cart updated',
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.itemId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    const cartId = cartItem.cartId;
    await cartItem.destroy();

    // Update cart totals
    const cart = await Cart.findByPk(cartId);
    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    cart.totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();

    // Reload cart with products
    const updatedCart = await Cart.findByPk(cart.id, {
      include: [
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }],
        },
      ],
    });

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    await CartItem.destroy({ where: { cartId: cart.id } });

    cart.totalItems = 0;
    cart.totalPrice = 0;
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared',
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
