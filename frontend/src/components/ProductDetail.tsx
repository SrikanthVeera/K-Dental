import { useParams } from "react-router-dom";
import { getProductBySlug } from "../mock/data";
import ProductGallery from "../components/ProductGallery";
import RatingStars from "../components/RatingStars";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");
  const { addItem, getItemById } = useCartStore();
  const [variant, setVariant] = useState<string | undefined>(product?.variants?.[0]?.value);
  const [isAdding, setIsAdding] = useState(false);
  
  const cartItem = product ? getItemById(product.id) : undefined;

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
      {/* Gallery */}
      <ProductGallery images={product.images} />

      {/* Info */}
      <div>
        <div className="text-sm text-slate-500">{product.brand}</div>
        <h1 className="text-2xl md:text-3xl font-semibold mt-1">{product.name}</h1>

        <div className="mt-2 flex items-center gap-2">
          <RatingStars value={product.rating} />
          <span className="text-xs text-slate-500">({product.rating.toFixed(1)})</span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-end gap-3">
          <div className="text-3xl font-bold text-primary">₹{product.price}</div>
          <div className="text-slate-400 line-through">₹{product.mrp}</div>
          <div className="text-green-600 font-medium text-sm">{discount}% off</div>
        </div>

        {/* Variant */}
        {product.variants && product.variants.length > 0 && (
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

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className={`px-5 py-3 rounded-lg transition-all ${
              isAdding 
                ? 'bg-green-500 text-white' 
                : 'bg-primary hover:bg-primaryDark text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              
              // Validate product ID
              if (!product.id || product.id === null || product.id === undefined) {
                console.error('❌ Cannot add to cart: Product ID is missing', product);
                toast.error('Cannot add product: Invalid product data');
                return;
              }

              // Validate required fields
              if (!product.name || !product.price) {
                console.error('❌ Cannot add to cart: Missing required fields', product);
                toast.error('Cannot add product: Incomplete data');
                return;
              }

              console.log('✅ Adding product to cart:', {
                id: product.id,
                name: product.name,
                price: product.price
              });
              
              setIsAdding(true);
              
              try {
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  mrp: product.mrp,
                  image: product.images?.[0] || product.image,
                  brand: product.brand,
                  category: product.category || "General",
                  inStock: true,
                  maxQuantity: 10
                });
                
                // Verify item was added
                const addedItem = getItemById(product.id);
                if (addedItem) {
                  console.log('✅ Product successfully added. Quantity:', addedItem.quantity);
                  toast.success(`${product.name} added to cart!`, {
                    duration: 2000,
                    position: 'top-center',
                  });
                } else {
                  console.error('❌ Product was not added to cart');
                  toast.error('Failed to add product');
                }
              } catch (error) {
                console.error('❌ Error adding to cart:', error);
                toast.error('An error occurred');
              } finally {
                setTimeout(() => setIsAdding(false), 1000);
              }
            }}
            disabled={isAdding}
          >
            {isAdding ? '✓ Added!' : cartItem ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
          </button>
          <button 
            type="button"
            className="px-5 py-3 rounded-lg border hover:bg-gray-50 transition-colors"
          >
            Buy Now
          </button>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-slate-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Specs */}
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
