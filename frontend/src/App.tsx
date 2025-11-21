import { Routes, Route } from "react-router-dom";
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
        <Route path="/product/:slug" element={
          <>
            <Header />
            <ProductDetail />
            <Footer />
          </>
        } />
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

        {/* Unified Auth Route */}
        <Route path="/auth" element={<UnifiedAuth />} />

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

