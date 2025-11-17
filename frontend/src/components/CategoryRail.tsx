import { Link } from "react-router-dom";

const cats = [
  { name: "Endodontics", img: "https://via.placeholder.com/72?text=Endo" },
  { name: "Orthodontics", img: "https://via.placeholder.com/72?text=Ortho" },
  { name: "Consumables", img: "https://via.placeholder.com/72?text=Cons" },
  { name: "Equipment", img: "https://via.placeholder.com/72?text=Equip" },
  { name: "Surgical", img: "https://via.placeholder.com/72?text=Surg" },
  { name: "Hygiene", img: "https://via.placeholder.com/72?text=Hyg" },
  { name: "Lab", img: "https://via.placeholder.com/72?text=Lab" },
  { name: "Implants", img: "https://via.placeholder.com/72?text=Impl" },
];

export default function CategoryRail() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-4 md:grid-cols-8 gap-3">
      {cats.map(c => (
        <Link
          to={`/category/${c.name.toLowerCase()}`}
          key={c.name}
          className="bg-white border rounded-xl p-3 flex flex-col items-center gap-2 hover:shadow-md transition"
        >
          <img src={c.img} alt={c.name} className="w-14 h-14 object-contain" />
          <div className="text-xs font-medium text-gray-700 text-center">{c.name}</div>
        </Link>
      ))}
    </div>
  );
}
