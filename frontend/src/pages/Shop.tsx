import { useMemo, useState } from "react";
import { PRODUCTS } from "../mock/data";
import SidebarFilters from "../components/SidebarFilters";
import ProductCard from "../components/ProductCard";

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating-desc";

export default function Shop() {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 999999]);
  const [sort, setSort] = useState<SortKey>("relevance");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      [p.name, p.brand, p.category].join(" ").toLowerCase().includes(q.toLowerCase())
    );

    if (brand.length) list = list.filter((p) => brand.includes(p.brand));
    if (category.length) list = list.filter((p) => category.includes(p.category));

    list = list.filter((p) => p.price >= price[0] && p.price <= price[1]);

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }, [q, brand, category, price, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-[260px_1fr] gap-6">
      {/* Sidebar */}
      <SidebarFilters
        q={q} setQ={setQ}
        brand={brand} setBrand={setBrand}
        category={category} setCategory={setCategory}
        price={price} setPrice={setPrice}
      />

      {/* Content */}
      <div>
        {/* Toolbar */}
        <div className="bg-white border rounded-xl p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{filtered.length}</span> products
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by</span>
            <select
              className="border rounded-lg px-2 py-1 text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white border rounded-xl p-6 text-center text-slate-600">
            No products match your filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  brand: p.brand,
                  price: p.price,
                  mrp: p.mrp,
                  rating: p.rating,
                  image: p.image,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
