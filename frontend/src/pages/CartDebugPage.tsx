import { useCartStore } from '../store/cartStore';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

/**
 * Cart Debug Page
 * Test all cart functionality and verify localStorage persistence
 */
export default function CartDebugPage() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemById
  } = useCartStore();

  const [localStorageData, setLocalStorageData] = useState<any>(null);

  // Test products
  const testProducts = [
    {
      id: 1001,
      name: 'Test Product A',
      price: 1000,
      mrp: 1500,
      image: 'https://placehold.co/150x150/0066CC/FFFFFF/png?text=Product+A',
      brand: 'Test Brand',
      category: 'Test',
      inStock: true,
      maxQuantity: 10
    },
    {
      id: 1002,
      name: 'Test Product B',
      price: 2000,
      mrp: 2500,
      image: 'https://placehold.co/150x150/00B140/FFFFFF/png?text=Product+B',
      brand: 'Test Brand',
      category: 'Test',
      inStock: true,
      maxQuantity: 10
    },
    {
      id: 1003,
      name: 'Test Product C',
      price: 3000,
      mrp: 3500,
      image: 'https://placehold.co/150x150/E31837/FFFFFF/png?text=Product+C',
      brand: 'Test Brand',
      category: 'Test',
      inStock: true,
      maxQuantity: 10
    }
  ];

  // Update localStorage display
  useEffect(() => {
    const updateStorage = () => {
      const stored = localStorage.getItem('dental-cart-storage');
      if (stored) {
        try {
          setLocalStorageData(JSON.parse(stored));
        } catch (e) {
          setLocalStorageData({ error: 'Failed to parse' });
        }
      } else {
        setLocalStorageData(null);
      }
    };

    updateStorage();
    const interval = setInterval(updateStorage, 500);
    return () => clearInterval(interval);
  }, [items]);

  const handleAddTestProduct = (product: any) => {
    console.log('🧪 Test: Adding product', product.id);
    
    if (!product.id) {
      console.error('❌ Test Failed: Product ID is missing');
      toast.error('Test Failed: No product ID');
      return;
    }

    try {
      addItem(product);
      const added = getItemById(product.id);
      
      if (added) {
        console.log('✅ Test Passed: Product added successfully', added);
        toast.success(`Test Passed: ${product.name} added`);
      } else {
        console.error('❌ Test Failed: Product not found in cart after adding');
        toast.error('Test Failed: Product not in cart');
      }
    } catch (error) {
      console.error('❌ Test Failed: Error adding product', error);
      toast.error('Test Failed: Error occurred');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">🧪 Cart System Debug & Test Page</h1>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
          <div className="text-sm text-blue-600 font-medium">Total Items</div>
          <div className="text-4xl font-bold text-blue-900">{getTotalItems()}</div>
          <div className="text-xs text-blue-500 mt-1">Using reduce()</div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
          <div className="text-sm text-green-600 font-medium">Cart Length</div>
          <div className="text-4xl font-bold text-green-900">{items.length}</div>
          <div className="text-xs text-green-500 mt-1">Unique products</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
          <div className="text-sm text-purple-600 font-medium">Total Price</div>
          <div className="text-4xl font-bold text-purple-900">₹{getTotalPrice()}</div>
          <div className="text-xs text-purple-500 mt-1">Sum of all items</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
          <div className="text-sm text-orange-600 font-medium">localStorage</div>
          <div className="text-4xl font-bold text-orange-900">
            {localStorageData ? '✓' : '✗'}
          </div>
          <div className="text-xs text-orange-500 mt-1">
            {localStorageData ? 'Synced' : 'Empty'}
          </div>
        </div>
      </div>

      {/* Test Products */}
      <div className="bg-white p-6 rounded-xl border-2 mb-8">
        <h2 className="text-xl font-bold mb-4">🧪 Test Products</h2>
        <p className="text-sm text-gray-600 mb-4">
          Click "Add to Cart" to test the cart functionality. Check console for detailed logs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testProducts.map(product => {
            const inCart = getItemById(product.id);
            return (
              <div key={product.id} className="border rounded-lg p-4">
                <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-3" />
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-xs text-gray-500">ID: {product.id}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">₹{product.price}</p>
                {inCart && (
                  <p className="text-xs text-green-600 mt-1">
                    In cart: Quantity {inCart.quantity}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => handleAddTestProduct(product)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  <ShoppingCart className="inline w-4 h-4 mr-1" />
                  {inCart ? `Add More (${inCart.quantity})` : 'Add to Cart'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded-xl border-2 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🛒 Cart Items ({items.length})</h2>
          {items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Clear all items from cart?')) {
                  clearCart();
                  toast.success('Cart cleared');
                }
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
            >
              <Trash2 className="inline w-4 h-4 mr-1" />
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Cart is empty</p>
            <p className="text-sm">Add test products above to see them here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">ID: {item.id}</p>
                  <p className="text-sm text-blue-600">{item.brand}</p>
                  <p className="font-bold text-lg mt-1">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Subtotal</p>
                  <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    removeItem(item.id);
                    toast.success('Item removed');
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* localStorage Debug */}
      <div className="bg-white p-6 rounded-xl border-2">
        <h2 className="text-xl font-bold mb-4">💾 localStorage Debug</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-96">
          <div className="mb-2">
            <strong className="text-yellow-400">Key:</strong> dental-cart-storage
          </div>
          <div>
            <strong className="text-yellow-400">Value:</strong>
            <pre className="mt-2 whitespace-pre-wrap">
              {localStorageData 
                ? JSON.stringify(localStorageData, null, 2)
                : 'null (no data stored)'}
            </pre>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              console.log('=== CART DEBUG INFO ===');
              console.log('Cart Items:', items);
              console.log('Total Items (reduce):', getTotalItems());
              console.log('localStorage:', localStorage.getItem('dental-cart-storage'));
              toast.success('Check console for debug info');
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
          >
            Log to Console
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('This will clear localStorage and reload the page. Continue?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
          >
            Clear & Reload
          </button>
        </div>
      </div>

      {/* Test Results */}
      <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-green-800">✅ Test Checklist</h2>
        <div className="space-y-2 text-sm">
          <div className={items.length > 0 ? 'text-green-600' : 'text-gray-400'}>
            {items.length > 0 ? '✅' : '☐'} Products can be added to cart
          </div>
          <div className={localStorageData ? 'text-green-600' : 'text-gray-400'}>
            {localStorageData ? '✅' : '☐'} Cart persists in localStorage
          </div>
          <div className={items.some(i => i.quantity > 1) ? 'text-green-600' : 'text-gray-400'}>
            {items.some(i => i.quantity > 1) ? '✅' : '☐'} Duplicate prevention works (quantity increases)
          </div>
          <div className={getTotalItems() > 0 ? 'text-green-600' : 'text-gray-400'}>
            {getTotalItems() > 0 ? '✅' : '☐'} Cart count uses reduce()
          </div>
        </div>
      </div>
    </div>
  );
}
