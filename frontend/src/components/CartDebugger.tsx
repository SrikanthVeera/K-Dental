import { useEffect, useState } from 'react';
import { useCartStore } from '../store/cartStore';

/**
 * Cart Debugger Component
 * Shows real-time cart state and localStorage sync status
 * Remove this component in production
 */
export default function CartDebugger() {
  const { items, getTotalItems } = useCartStore();
  const [localStorageData, setLocalStorageData] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Update localStorage display whenever cart changes
    const updateLocalStorage = () => {
      const stored = localStorage.getItem('dental-cart-storage');
      setLocalStorageData(stored || 'No data');
    };

    updateLocalStorage();
    
    // Listen for storage changes
    window.addEventListener('storage', updateLocalStorage);
    
    // Poll for changes (in case storage event doesn't fire)
    const interval = setInterval(updateLocalStorage, 1000);

    return () => {
      window.removeEventListener('storage', updateLocalStorage);
      clearInterval(interval);
    };
  }, [items]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 z-50"
        type="button"
      >
        🐛 Debug Cart
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-blue-600 rounded-lg shadow-2xl p-4 max-w-md z-50 max-h-96 overflow-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">🐛 Cart Debugger</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
          type="button"
        >
          ✕
        </button>
      </div>

      {/* Cart State */}
      <div className="mb-4">
        <h4 className="font-semibold text-sm mb-2 text-blue-600">Cart State (Zustand)</h4>
        <div className="bg-gray-50 p-2 rounded text-xs">
          <div className="mb-1">
            <strong>Total Items:</strong> {getTotalItems()}
          </div>
          <div className="mb-1">
            <strong>Cart Length:</strong> {items.length}
          </div>
          <div>
            <strong>Items:</strong>
            {items.length === 0 ? (
              <span className="text-red-500"> Empty</span>
            ) : (
              <ul className="mt-1 space-y-1">
                {items.map(item => (
                  <li key={item.id} className="text-xs">
                    ID: {item.id} | {item.name} | Qty: {item.quantity}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* localStorage State */}
      <div className="mb-4">
        <h4 className="font-semibold text-sm mb-2 text-green-600">localStorage</h4>
        <div className="bg-gray-50 p-2 rounded text-xs">
          <div className="mb-1">
            <strong>Key:</strong> dental-cart-storage
          </div>
          <div>
            <strong>Data:</strong>
            <pre className="mt-1 whitespace-pre-wrap break-words text-xs">
              {localStorageData === 'No data' ? (
                <span className="text-red-500">No data found</span>
              ) : (
                JSON.stringify(JSON.parse(localStorageData), null, 2)
              )}
            </pre>
          </div>
        </div>
      </div>

      {/* Sync Status */}
      <div className="mb-4">
        <h4 className="font-semibold text-sm mb-2 text-purple-600">Sync Status</h4>
        <div className="bg-gray-50 p-2 rounded text-xs">
          {localStorageData === 'No data' ? (
            <div className="text-red-500">❌ localStorage is empty</div>
          ) : (
            <div className="text-green-500">✅ localStorage is synced</div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={() => {
            console.log('Cart State:', { items, total: getTotalItems() });
            console.log('localStorage:', localStorage.getItem('dental-cart-storage'));
          }}
          className="w-full bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
          type="button"
        >
          Log to Console
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="w-full bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
          type="button"
        >
          Clear localStorage & Reload
        </button>
      </div>
    </div>
  );
}
