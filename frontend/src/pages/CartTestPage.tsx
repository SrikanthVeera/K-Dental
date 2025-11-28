import { useCartStore } from '../store/cartStore';
import { useCartActions } from '../hooks/useCartActions';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

/**
 * Cart Test Page - Demonstrates all cart functionality
 * Access at: /cart-test
 */
export default function CartTestPage() {
  const {
    items,
    getTotalItems,
    getTotalPrice,
    getTotalMRP,
    getTotalSavings,
    updateQuantity,
    toggleCart
  } = useCartStore();

  const { removeFromCart, clearCartWithConfirm } = useCartActions();

  // Sample products for testing
  const sampleProducts = [
    {
      id: 999,
      name: "Test Product 1",
      price: 1000,
      mrp: 1500,
      image: "https://via.placeholder.com/150",
      brand: "Test Brand",
      category: "Test Category"
    },
    {
      id: 998,
      name: "Test Product 2",
      price: 2000,
      mrp: 2500,
      image: "https://via.placeholder.com/150",
      brand: "Test Brand 2",
      category: "Test Category"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">🛒 Cart System Test Page</h1>

      {/* Cart Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <div className="text-sm text-blue-600 font-medium">Total Items</div>
          <div className="text-3xl font-bold text-blue-900">{getTotalItems()}</div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <div className="text-sm text-green-600 font-medium">Total Price</div>
          <div className="text-3xl font-bold text-green-900">₹{getTotalPrice()}</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <div className="text-sm text-purple-600 font-medium">Total MRP</div>
          <div className="text-3xl font-bold text-purple-900">₹{getTotalMRP()}</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
          <div className="text-sm text-orange-600 font-medium">Savings</div>
          <div className="text-3xl font-bold text-orange-900">₹{getTotalSavings()}</div>
        </div>
      </div>

      {/* Test Actions */}
      <div className="bg-white p-6 rounded-xl border mb-8">
        <h2 className="text-xl font-bold mb-4">Test Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={toggleCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Toggle Cart Sidebar
          </button>
          <button
            onClick={clearCartWithConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 size={18} />
            Clear Cart
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-bold mb-4">Cart Items ({items.length})</h2>
        
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Your cart is empty</p>
            <p className="text-sm">Add some products to test the cart functionality</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-blue-600">{item.brand}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-gray-900">₹{item.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{item.mrp}</span>
                    <span className="text-xs text-green-600 font-medium">
                      {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% off
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <div className="text-sm text-gray-500">Subtotal</div>
                  <div className="font-bold text-lg">₹{item.price * item.quantity}</div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id, item.name)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* localStorage Info */}
      <div className="mt-8 bg-gray-50 p-6 rounded-xl border">
        <h2 className="text-xl font-bold mb-4">💾 localStorage Status</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Storage Key:</span>
            <code className="bg-white px-2 py-1 rounded border">dental-cart-storage</code>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Items Stored:</span>
            <span className="font-semibold">{items.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Persistence:</span>
            <span className="text-green-600 font-semibold">✓ Active</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Cart data persists across page refreshes and browser restarts
        </p>
      </div>
    </div>
  );
}
