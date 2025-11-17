import { useState } from "react";

const bestSellers = [
  {
    id: 1,
    name: "Woodpecker UDS-P Ultrasonic Scaler",
    brand: "Woodpecker",
    price: 10368,
    mrp: 18000,
    discount: "42.0%",
    image: "https://via.placeholder.com/220x220?text=Scaler",
  },
  {
    id: 2,
    name: "GDC Crown Crimping Plier",
    brand: "GDC",
    price: 1733,
    mrp: 2800,
    discount: "41.2%",
    image: "https://via.placeholder.com/220x220?text=Crimping+Plier",
  },
  {
    id: 3,
    name: "Mani K File 21mm (6 Pcs)",
    brand: "Mani",
    price: 173,
    mrp: 250,
    discount: "30.8%",
    image: "https://via.placeholder.com/220x220?text=Endo+Files",
  },
  {
    id: 4,
    name: "Woodpecker Apex Locator Minipex",
    brand: "Woodpecker",
    price: 9725,
    mrp: 15000,
    discount: "35.2%",
    image: "https://via.placeholder.com/220x220?text=Apex+Locator",
  },
  {
    id: 5,
    name: "Ivoclar Bluephase Curing Light",
    brand: "Ivoclar",
    price: 10845,
    mrp: 17000,
    discount: "36.2%",
    image: "https://via.placeholder.com/220x220?text=Curing+Light",
  },
  {
    id: 6,
    name: "3M ESPE RelyX Luting Cement",
    brand: "3M",
    price: 2400,
    mrp: 3900,
    discount: "38.4%",
    image: "https://via.placeholder.com/220x220?text=Luting+Cement",
  },
];

export default function BestSeller() {
  const [filter, setFilter] = useState("Brands");

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* ✅ Top Banner */}
      <div className="max-w-[1400px] mx-auto mb-8">
        <img
          src="https://via.placeholder.com/1400x300?text=Best+Seller+Banner"
          alt="Best Seller"
          className="w-full rounded-lg shadow"
        />
      </div>

      {/* ✅ Section Title */}
      <div className="max-w-[1400px] mx-auto px-6 mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">🔥 Best Seller Products</h1>
        <p className="text-sm text-gray-600">
          Explore our top-rated and most-loved dental products by professionals.
        </p>
      </div>

      {/* ✅ Filters */}
      <div className="max-w-[1400px] mx-auto px-6 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {["Brands", "Price Range", "Rating"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 border rounded-lg ${
                filter === f ? "bg-primary text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select className="border rounded-lg px-4 py-2 text-sm bg-white hover:cursor-pointer">
          <option>Sort by: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

      {/* ✅ Product Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-6">
        {bestSellers.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition p-4 flex flex-col items-center"
          >
            <img src={p.image} alt={p.name} className="w-full h-44 object-contain mb-3" />
            <h3 className="text-sm font-semibold text-gray-800 text-center">{p.name}</h3>
            <p className="text-gray-500 text-xs mt-1">{p.brand}</p>
            <div className="mt-2">
              <span className="text-primary font-bold text-lg">₹{p.price}</span>{" "}
              <span className="text-gray-400 text-sm line-through">₹{p.mrp}</span>
            </div>
            <p className="text-green-600 text-sm mt-1">{p.discount} off</p>
            <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark text-sm">
              ADD
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Pagination */}
      <div className="max-w-[1400px] mx-auto mt-10 flex justify-center gap-2">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            className="px-4 py-2 border rounded-lg bg-white hover:bg-primary hover:text-white transition"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
