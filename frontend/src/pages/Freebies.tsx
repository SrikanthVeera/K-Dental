import { useState } from "react";

const freebies = [
  {
    id: 1,
    name: "Woodpecker Physio Implant Motor",
    brand: "Dentsply",
    image: "https://via.placeholder.com/220x220?text=Implant+Motor",
    price: 69865,
    mrp: 95025,
    discount: "42.2%",
  },
  {
    id: 2,
    name: "Woodpecker RVG I Sensor",
    brand: "Woodpecker",
    image: "https://via.placeholder.com/220x220?text=RVG+Sensor",
    price: 62600,
    mrp: 76000,
    discount: "45.5%",
  },
  {
    id: 3,
    name: "Woodpecker Air Polisher AP-H",
    brand: "Woodpecker",
    image: "https://via.placeholder.com/220x220?text=Air+Polisher",
    price: 20889,
    mrp: 30000,
    discount: "43.0%",
  },
  {
    id: 4,
    name: "GDC Crown Crimping Plier",
    brand: "GDC",
    image: "https://via.placeholder.com/220x220?text=Crown+Plier",
    price: 1733,
    mrp: 2800,
    discount: "42.2%",
  },
];

export default function Freebies() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* ✅ Banner */}
      <div className="max-w-[1400px] mx-auto">
        <img
          src="https://via.placeholder.com/1400x300?text=Freebies+Banner"
          alt="Freebies"
          className="w-full rounded-lg shadow mb-6"
        />
      </div>

      {/* ✅ Filters */}
      <div className="max-w-[1400px] mx-auto px-6 mb-6">
        <h2 className="text-xl font-bold mb-3">FILTERS BY</h2>
        <div className="flex flex-wrap gap-4">
          {["Brands", "Price Range", "Rating"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 border rounded-lg ${
                filter === f ? "bg-primary text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Product Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {freebies.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition p-4 flex flex-col items-center"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-contain mb-3"
            />
            <h3 className="text-sm font-semibold text-gray-800 text-center">{p.name}</h3>
            <p className="text-gray-500 text-xs mt-1">{p.brand}</p>
            <div className="mt-2">
              <span className="text-primary font-bold text-lg">₹{p.price}</span>{" "}
              <span className="text-gray-400 text-sm line-through">₹{p.mrp}</span>
            </div>
            <p className="text-green-600 text-sm mt-1">{p.discount} off</p>
            <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark">
              ADD
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
    