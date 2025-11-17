import HeroSlider from "../components/HeroSlider";
import BrandCarousel from "../components/BrandCarousel";
import CategoryIcons from "../components/CategoryIcons";
import ProductSection from "../components/ProductSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* ✅ Banner */}
      <HeroSlider />

      {/* ✅ Brand Carousel */}
      <BrandCarousel />

      {/* ✅ Shop by Category */}
      <CategoryIcons />

      {/* ✅ Featured Sections */}
      <div className="max-w-[1400px] mx-auto mt-10 space-y-16">
        <ProductSection title="Hot Selling Products" />
        <ProductSection title="Top Rated Products" />
        <ProductSection title="Best Deals on Equipment" />
        <ProductSection title="New Arrivals" />
        <ProductSection title="Consumables" />
        <ProductSection title="Endodontics" />
        <ProductSection title="Restorative" />
        <ProductSection title="Implants" />
        <ProductSection title="Orthodontics" />
      </div>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
