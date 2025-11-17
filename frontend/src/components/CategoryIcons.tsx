import { Pill, Microscope, Sparkles, Scale, Droplet, Wrench } from "lucide-react";

const categories = [
  { name: "Implants", icon: Pill },
  { name: "Endodontics", icon: Microscope },
  { name: "Orthodontics", icon: Sparkles },
  { name: "Surgical", icon: Scale },
  { name: "Consumables", icon: Droplet },
  { name: "Equipment", icon: Wrench },
];

export default function CategoryIcons() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 mt-10 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Shop by Category</h2>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-5 text-center">
        {categories.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center p-5 bg-white border rounded-xl hover:shadow-lg transition cursor-pointer"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-3">
              <Icon size={30} className="text-primary" />
            </div>
            <p className="text-sm font-medium text-gray-800">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
