import { BRANDS, CATEGORIES } from "../mock/data";

type Props = {
  q: string;
  setQ: (v: string) => void;
  brand: string[];
  setBrand: (v: string[]) => void;
  category: string[];
  setCategory: (v: string[]) => void;
  price: [number, number];
  setPrice: (v: [number, number]) => void;
};

export default function SidebarFilters({
  q, setQ, brand, setBrand, category, setCategory, price, setPrice,
}: Props) {

  const toggle = (arr: string[], value: string, setter: (v: string[]) => void) => {
    setter(arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]);
  };

  return (
    <aside className="bg-white border rounded-xl p-4 sticky top-24 h-max">
      <div>
        <div className="font-semibold mb-2">Search</div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div className="mt-6">
        <div className="font-semibold mb-2">Brand</div>
        <div className="space-y-2 text-sm text-gray-700">
          {BRANDS.map((b) => (
            <label key={b} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={brand.includes(b)}
                onChange={() => toggle(brand, b, setBrand)}
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="font-semibold mb-2">Category</div>
        <div className="space-y-2 text-sm text-gray-700">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={category.includes(c)}
                onChange={() => toggle(category, c, setCategory)}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="font-semibold mb-2">Price</div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={price[0]}
            onChange={(e) => setPrice([Number(e.target.value || 0), price[1]])}
            className="w-24 border rounded-lg px-2 py-1"
          />
          <span>–</span>
          <input
            type="number"
            min={0}
            value={price[1]}
            onChange={(e) => setPrice([price[0], Number(e.target.value || 0)])}
            className="w-24 border rounded-lg px-2 py-1"
          />
        </div>
      </div>
    </aside>
  );
}
