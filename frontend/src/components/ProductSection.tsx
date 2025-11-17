import { ShoppingCart } from "lucide-react";

export default function ProductSection({ title }: { title: string }) {
  const products = [
    {
      name: "Waldent Endomotor X3",
      price: "₹15,499",
      img: "/hotselling/brand2.png",
    },
    {
      name: "Ivoclar Composite Kit",
      price: "₹7,899",
      img: "/products/composite.png",
    },
    {
      name: "Dentsply ProTaper Files",
      price: "₹3,299",
      img: "/products/protaper.png",
    },
    {
      name: "GC Fuji GIC Restorative",
      price: "₹1,899",
      img: "/products/gic.png",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
          >
            <img src={p.img} alt={p.name} className="w-full h-48 object-contain p-4" />
            <div className="p-4">
              <p className="font-semibold text-sm mb-1 text-gray-800">{p.name}</p>
              <p className="text-primary font-bold mb-2">{p.price}</p>
              <button className="flex items-center justify-center w-full border border-primary text-primary rounded-lg py-2 text-sm font-medium hover:bg-primary hover:text-white transition">
                <ShoppingCart size={16} className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
