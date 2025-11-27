import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ApiTestPage() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [productsCount, setProductsCount] = useState(0);
  const [brandsCount, setBrandsCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    setApiStatus('loading');
    setError(null);

    try {
      // Test health endpoint
      const healthResponse = await fetch('http://localhost:5000/health');
      if (!healthResponse.ok) throw new Error('Health check failed');

      // Test products endpoint
      const productsResponse = await fetch('http://localhost:5000/api/products');
      const productsData = await productsResponse.json();
      
      // Test brands endpoint
      const brandsResponse = await fetch('http://localhost:5000/api/brands');
      const brandsData = await brandsResponse.json();

      if (productsData.success && brandsData.success) {
        setProductsCount(productsData.data.length);
        setBrandsCount(brandsData.data.length);
        setApiStatus('success');
      } else {
        throw new Error('API returned error response');
      }
    } catch (err) {
      console.error('API Test Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setApiStatus('error');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🔧 API Connection Test
            </h1>
            <p className="text-xl text-gray-600">
              Testing connection between frontend and backend
            </p>
          </motion.div>

          <div className="grid gap-8">
            {/* API Status Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Backend Connection</h2>
                <button
                  onClick={testApiConnection}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Test Again
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                {apiStatus === 'loading' && (
                  <>
                    <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                    <span className="text-lg font-semibold text-blue-600">Testing connection...</span>
                  </>
                )}
                {apiStatus === 'success' && (
                  <>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <span className="text-lg font-semibold text-green-600">Connection successful!</span>
                  </>
                )}
                {apiStatus === 'error' && (
                  <>
                    <XCircle className="w-8 h-8 text-red-600" />
                    <span className="text-lg font-semibold text-red-600">Connection failed</span>
                  </>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 font-medium">Error Details:</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              )}

              {apiStatus === 'success' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-green-900 mb-2">Products Available</h3>
                    <p className="text-3xl font-bold text-green-600">{productsCount}</p>
                    <p className="text-green-700 text-sm">Products in database</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Brands Available</h3>
                    <p className="text-3xl font-bold text-blue-600">{brandsCount}</p>
                    <p className="text-blue-700 text-sm">Brands in database</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Server Info */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Server Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Frontend Server</h3>
                  <p className="text-gray-600">http://localhost:5174</p>
                  <p className="text-sm text-green-600">✅ Running</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Backend Server</h3>
                  <p className="text-gray-600">http://localhost:5000</p>
                  <p className={`text-sm ${apiStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {apiStatus === 'success' ? '✅ Running' : '❌ Not accessible'}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Available Endpoints:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• GET /health - Health check</li>
                  <li>• GET /api/products - Get all products</li>
                  <li>• GET /api/brands - Get all brands</li>
                  <li>• POST /api/auth/* - Authentication endpoints</li>
                </ul>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Pages</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <a
                    href="/"
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Home Page
                  </a>
                  <a
                    href="/cart-demo"
                    className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Cart Demo
                  </a>
                  <a
                    href="/brands"
                    className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Brands Page
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}