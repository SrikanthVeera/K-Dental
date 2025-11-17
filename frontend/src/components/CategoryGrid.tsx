const categories = [
  {
    name: "Implants",
    img: "https://cdn.dentalkart.com/Category/implants.webp",
  },
  {
    name: "Endodontics",
    img: "https://cdn.dentalkart.com/Category/endodontics.webp",
  },
  {
    name: "Orthodontics",
    img: "https://cdn.dentalkart.com/Category/orthodontics.webp",
  },
  {
    name: "Surgical",
    img: "https://cdn.dentalkart.com/Category/surgical.webp",
  },
  {
    name: "Consumables",
    img: "https://cdn.dentalkart.com/Category/consumables.webp",
  },
  {
    name: "Equipment",
    img: "https://cdn.dentalkart.com/Category/equipment.webp",
  },
];

export default function CategoryGrid() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 mt-12">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Shop by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((c) => (
          <div
            key={c.name}
            className="group cursor-pointer bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <img
              src={c.img}
              alt={c.name}
              className="h-28 w-full object-cover group-hover:scale-105 transition duration-200"
            />
            <div className="py-2 text-center font-medium text-sm">
              {c.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
