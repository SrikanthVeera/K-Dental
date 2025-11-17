import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "./ProductCard";
import type { Product } from "../mock/data";

interface Props {
  title: string;
  products: Product[];
}


export default function ProductCarousel({ title }: { title: string }) {
  const sampleProducts = [
    {
      id: 1,
      slug: "composite-syringe-auto-mix",
      name: "Composite Syringe Auto Mix – Dental Use",
      brand: "Ivoclar",
      price: 2200,
      mrp: 3000,
      rating: 4.5,
      image: "https://via.placeholder.com/200x200?text=Dental+Item",
    },
    {
      id: 2,
      slug: "ultrasonic-scaler-woodpecker",
      name: "Ultrasonic Scaler Machine",
      brand: "Woodpecker",
      price: 12500,
      mrp: 16000,
      rating: 4.8,
      image: "https://via.placeholder.com/200x200?text=Scaler+Machine",
    },
    {
      id: 3,
      slug: "root-canal-files-set",
      name: "Root Canal Files Set",
      brand: "Dentsply",
      price: 1800,
      mrp: 2500,
      rating: 4.3,
      image: "https://via.placeholder.com/200x200?text=Endo+Files",
    },
    {
      id: 4,
      slug: "surgical-kit-ss",
      name: "Dental Surgical Kit – Stainless Steel",
      brand: "NykaMed",
      price: 4500,
      mrp: 6000,
      rating: 4.7,
      image: "https://via.placeholder.com/200x200?text=Surgical+Kit",
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="text-xl font-bold text-primary mb-4">{title}</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {sampleProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product as any} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
