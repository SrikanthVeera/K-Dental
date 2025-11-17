import { useParams } from "react-router-dom";
import { getProductBySlug } from "../mock/data";
import ProductGallery from "../components/ProductGallery";
import RatingStars from "../components/RatingStars";
import { useCart } from "../store/cart";
import { useState } from "react";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");
  const add = useCart(s => s.add);
  const [variant, setVariant] = useState<string | undefined>(product?.variants?.[0]?.value);

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="text-slate-600 mt-2">The product you’re looking for doesn’t exist.</p>
      </div>
    );
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <ProductGallery images={product.images} />

      <div>
        <div className="text-sm text-slate-500">{product.brand}</div>
        <h1 className="text-2xl md:text-3xl font-semibold mt-1">{product.name}</h1>

        <div className="mt-2 flex items-center gap-2">
          <RatingStars value={product.rating} />
          <span className="text-xs text-slate-500">({product.rating.toFixed(1)})</span>
        </div>

        <div className="mt-4 flex items-end gap-3">
          <div className="text-3xl font-bold text-primary">₹{product.price}</div>
          <div className="text-slate-400 line-through">₹{product.mrp}</div>
          <div className="text-green-600 font-medium text-sm">{discount}% off</div>
        </div>

        {product.variants && (
          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Variant</div>
            <div className="flex flex-wrap gap-2">
              {product.variants.map(v => (
                <button
                  key={v.value}
                  onClick={() => setVariant(v.value)}
                  className={`px-3 py-1.5 rounded-lg border text-sm ${
                    variant === v.value ? "border-primary bg-primary/10" : ""
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            className="bg-primary hover:bg-primaryDark text-white px-5 py-3 rounded-lg"
            onClick={() => add(product, 1, variant)}
          >
            Add to Cart
          </button>
          <button className="px-5 py-3 rounded-lg border">Buy Now</button>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-slate-700 leading-relaxed">{product.description}</p>
        </div>

        {product.specs && (
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border rounded-lg p-3 bg-white">
                  <span className="text-slate-500">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
