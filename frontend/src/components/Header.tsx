import { Link } from "react-router-dom";
import { Search, User, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

// ✅ Category Data
const categories = [
  { name: "Dental Brands", subs: ["Straumann", "Dentsply", "Ivoclar"] },
  { name: "Pharmacy", subs: ["Antibiotics", "Anesthesia", "Pain Relief"] },
  { name: "Offer Zone", subs: ["Combos", "Hot Selling", "Clearance Sale"] },
  { name: "General Dentistry", subs: ["Instruments", "Disposables"] },
  { name: "Student Section", subs: ["Starter Kits", "Books"] },
  { name: "Equipments", subs: ["Scalers", "Compressors", "X-Ray Units"] },
  { name: "Restorative", subs: ["Composites", "Burs", "Bonding Agents"] },
  { name: "Endodontics", subs: ["Files", "Obturation", "Irrigation"] },
];

// ✅ Items Data
const items: Record<string, string[]> = {
  Combos: ["Starter Kits", "Value Packs", "Bundles"],
  "Hot Selling": ["Top Rated", "Trending", "Fast Moving"],
  "Clearance Sale": ["Last Stock", "Discount Deals"],
  Straumann: ["Implants", "Abutments"],
  Dentsply: ["Endo Files", "Burs"],
  Ivoclar: ["Composites", "Ceramics"],
  Instruments: ["Mirrors", "Probes"],
};

// ✅ Brand Tabs & Logos
const brandTabs = ["Top Brand", "Newly Added Brands", "Featured Brands", "Dentalkart Suggests"];
const brandLogos = [
  "/brands/orthometric.png",
  "/brands/gc.png",
  "/brands/dentsply.png",
  "/brands/waldent.png",
  "/brands/superendo.png",
  "/brands/waldentalchem.png",
  "/brands/etdental.png",
  "/brands/mani.png",
  "/brands/gdc.png",
  "/brands/woodpecker.png",
];

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const menuItems = [
    "Category",
    "Brand",
    "Buying Guide",
    "Freebies",
    "Best Seller",
    "Membership",
    "Events",
    "New Clinic Setup",
  ];

  const [openCategory, setOpenCategory] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [brandTab, setBrandTab] = useState("Top Brand");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const subList = categories.find((c) => c.name === selectedCategory)?.subs || [];
  const itemList = items[selectedSub as any] || [];

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      {/* ✅ Top Row */}
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4 gap-6">
        <Link to="/">
          <img src="/logo.svg" alt="K Dental" className="h-12" />
        </Link>

        {/* ✅ Search Bar */}
        <div className="flex-1 flex justify-center relative hidden md:flex">
          <input
            type="text"
            placeholder="Search over 20,000 Dental Products"
            className="w-[60%] max-w-[600px] border rounded-full px-14 py-3 text-sm shadow focus:ring-2 focus:ring-primary"
          />
          <Search
            className="absolute left-[calc(50%-260px)] top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
        </div>

        {/* ✅ Login & Cart */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-sm hover:text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-2 hover:text-primary"
            >
              <User size={20} /> <span className="hidden md:inline">Login</span>
            </Link>
          )}
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:bg-primaryDark"
          >
            <ShoppingCart size={20} /> Cart
          </Link>
        </div>
      </div>

      {/* ✅ Menu Row */}
      <nav className="border-t bg-white">
        <div
          className="
            relative max-w-[1400px] mx-auto flex gap-10 px-6 py-3 text-[15px] font-medium
            w-full min-w-max overflow-x-auto md:overflow-visible scrollbar-none
          "
        >
          {menuItems.map((item) => {
            // CATEGORY
            if (item === "Category") {
              return (
                <button
                  key={item}
                  onClick={() => {
                    setOpenCategory(!openCategory);
                    setOpenBrand(false);
                  }}
                  className="hover:text-primary flex items-center gap-2"
                >
                   {item}
                </button>
              );
            }

            // BRAND
            if (item === "Brand") {
              return (
                <div key={item} className="relative">
                  <button
                    onClick={() => {
                      setOpenBrand(!openBrand);
                      setOpenCategory(false);
                    }}
                    className="hover:text-primary"
                  >
                    Brand
                  </button>
                </div>
              );
            }

            // ✅ MEMBERSHIP - Navigate to new page
            if (item === "Membership") {
              return (
                <Link
                  key={item}
                  to="/membership"
                  className="hover:text-primary transition"
                  onClick={() => {
                    setOpenCategory(false);
                    setOpenBrand(false);
                  }}
                >
                  {item}
                </Link>
              );
            }

            // ✅ Use React Router Link for others
            const route = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <Link
                key={item}
                to={route}
                className="hover:text-primary transition"
                onClick={() => {
                  setOpenCategory(false);
                  setOpenBrand(false);
                  setShowMembership(false);
                }}
              >
                {item}
              </Link>
            );
          })}

          {/* ✅ CATEGORY DROPDOWN */}
          {openCategory && (
            <div className="absolute left-0 top-full w-full bg-white shadow-xl border-t z-[999]">
              <div className="max-w-[1400px] mx-auto p-6">
                <input
                  className="w-full border rounded-lg px-10 py-3 text-sm shadow-sm mb-4"
                  placeholder="Search Category"
                />
                <div className="grid grid-cols-3 gap-6 h-[330px]">
                  {/* Category */}
                  <div className="border rounded-xl overflow-y-auto bg-[#F4F9FF] p-3">
                    <h4 className="text-xs font-bold mb-3 text-gray-500">CATEGORY</h4>
                    {categories.map((c) => (
                      <div
                        key={c.name}
                        className={`p-2 rounded-lg cursor-pointer mb-1 ${
                          selectedCategory === c.name
                            ? "bg-primary text-white"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => {
                          setSelectedCategory(c.name);
                          setSelectedSub(null);
                        }}
                      >
                        {c.name}
                      </div>
                    ))}
                  </div>

                  {/* Sub Category */}
                  <div className="border rounded-xl overflow-y-auto bg-[#F4F9FF] p-3">
                    <h4 className="text-xs font-bold mb-3 text-gray-500">SUB CATEGORY</h4>
                    {subList.length ? (
                      subList.map((s) => (
                        <div
                          key={s}
                          className={`p-2 rounded-lg cursor-pointer mb-1 ${
                            selectedSub === s
                              ? "bg-primary text-white"
                              : "hover:bg-gray-200"
                          }`}
                          onClick={() => setSelectedSub(s)}
                        >
                          {s}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">Select Category</span>
                    )}
                  </div>

                  {/* Items */}
                  <div className="border rounded-xl overflow-y-auto bg-[#F4F9FF] p-3">
                    <h4 className="text-xs font-bold mb-3 text-gray-500">
                      {selectedSub || "ITEMS"}
                    </h4>
                    {itemList.length ? (
                      itemList.map((i) => (
                        <div
                          key={i}
                          className="p-2 rounded-lg cursor-pointer hover:bg-gray-200 mb-1"
                        >
                          {i}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">Select Sub Category</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 text-primary font-semibold cursor-pointer hover:underline">
                  Full Store Directory →
                </div>
              </div>
            </div>
          )}

          {/* ✅ BRAND DROPDOWN */}
          {openBrand && (
            <div className="absolute left-0 top-full w-full bg-white shadow-xl border-t z-[999] py-6">
              <div className="max-w-[1400px] mx-auto">
                <div className="flex gap-3 mb-6">
                  {brandTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setBrandTab(tab)}
                      className={`px-5 py-2 rounded-lg border text-sm ${
                        brandTab === tab
                          ? "bg-primary text-white"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                  <Link 
                    to="/brands"
                    onClick={() => setOpenBrand(false)}
                    className="ml-auto px-5 py-2 border rounded-lg hover:bg-gray-100 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View All Brands →
                  </Link>
                </div>

                {/* Brand Logos */}
                <div className="grid grid-cols-5 gap-6 px-2">
                  {brandLogos.map((logo, i) => (
                    <Link
                      key={i}
                      to="/brands"
                      onClick={() => setOpenBrand(false)}
                      className="border rounded-lg p-4 flex justify-center items-center hover:shadow-lg cursor-pointer bg-white transition-all"
                    >
                      <img src={logo} className="max-h-14 object-contain" alt="brand" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}


        </div>
      </nav>
    </header>
  );
}
