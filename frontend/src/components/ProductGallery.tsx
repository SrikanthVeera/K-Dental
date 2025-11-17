import { useState } from "react";

export default function ProductGallery({ images }: { images?: string[] }) {
  const validImages = Array.isArray(images) && images.length > 0 ? images : [
    "https://via.placeholder.com/800x600?text=No+Image"
  ];

  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Main Image */}
      <div className="aspect-[4/3] bg-white border rounded-xl overflow-hidden flex items-center justify-center">
        <img
          src={validImages[active]}
          className="w-full h-full object-contain"
          alt="product"
        />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {validImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`border rounded-lg overflow-hidden aspect-square bg-white ${
                i === active ? "border-primary" : ""
              }`}
            >
              <img src={src} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
