import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import CategoryPage from "./pages/CategoryPage";
import BuyingGuide from "./pages/BuyingGuide";
import Freebies from "./pages/Freebies";
import BestSeller from "./pages/BestSeller";
import Membership from "./pages/Membership";
import MembershipDetails from "./pages/MembershipDetails";
import Events from "./pages/Events";
import NewClinicSetup from "./pages/NewClinicSetup";
import ProductsDemo from "./pages/ProductsDemo";
import BrandsPage from "./pages/BrandsPage";
import BrandProductsPage from "./pages/BrandProductsPage";

// Cart imports
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import CartDemoPage from "./pages/CartDemoPage";
import ApiTestPage from "./pages/ApiTestPage";
import ProductDetailPage from "./pages/ProductDetailPage";

// New Auth imports
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

// Auth imports
import UnifiedAuth from "./pages/UnifiedAuth";

// Dashboard imports
import CustomerDashboard from "./pages/CustomerDashboard";
import ServicemanDashboard from "./pages/ServicemanDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Admin imports
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Header />
            <HomePage />
            <Footer />
          </>
        } />
        <Route path="/old-home" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/shop" element={
          <>
            <Header />
            <Shop />
            <Footer />
          </>
        } />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/buying-guide" element={
          <>
            <Header />
            <BuyingGuide />
            <Footer />
          </>
        } />
        <Route path="/freebies" element={
          <>
            <Header />
            <Freebies />
            <Footer />
          </>
        } />
        <Route path="/best-seller" element={
          <>
            <Header />
            <BestSeller />
            <Footer />
          </>
        } />
        <Route path="/membership" element={
          <>
            <Header />
            <Membership />
            <Footer />
          </>
        } />
        <Route path="/membership/details" element={
          <>
            <Header />
            <MembershipDetails />
            <Footer />
          </>
        } />
        <Route path="/events" element={
          <>
            <Header />
            <Events />
            <Footer />
          </>
        } />
        <Route path="/new-clinic-setup" element={
          <>
            <Header />
            <NewClinicSetup />
            <Footer />
          </>
        } />
        <Route path="/products-demo" element={
          <>
            <Header />
            <ProductsDemo />
            <Footer />
          </>
        } />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/products" element={<BrandProductsPage />} />

        {/* Cart Routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/cart-demo" element={<CartDemoPage />} />
        <Route path="/api-test" element={<ApiTestPage />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<UnifiedAuth />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        <Route path="/dashboard/serviceman" element={<ServicemanDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

