export type Product = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  image: string;
};

export const brands = ["Ivoclar", "Dentsply", "GC", "Woodpecker", "Coltene"];
export const categories = ["Consumables", "Equipment", "Endodontics", "Orthodontics", "Surgical"];

export const products: Product[] = [
  {
    id: 1,
    slug: "composite-syringe-auto-mix",
    name: "Composite Syringe Auto Mix",
    brand: "Ivoclar",
    category: "Consumables",
    price: 2200,
    mrp: 3000,
    rating: 4.5,
    image: "https://via.placeholder.com/300x240?text=Composite",
  },
  {
    id: 2,
    slug: "ultrasonic-scaler-woodpecker",
    name: "Ultrasonic Scaler Machine",
    brand: "Woodpecker",
    category: "Equipment",
    price: 12500,
    mrp: 16000,
    rating: 4.8,
    image: "https://via.placeholder.com/300x240?text=Scaler",
  },
  {
    id: 3,
    slug: "root-canal-files-set",
    name: "Root Canal Files Set",
    brand: "Dentsply",
    category: "Endodontics",
    price: 1800,
    mrp: 2500,
    rating: 4.3,
    image: "https://via.placeholder.com/300x240?text=Endo+Files",
  },
  {
    id: 4,
    slug: "orthodontic-brackets-kit",
    name: "Orthodontic Brackets Kit",
    brand: "GC",
    category: "Orthodontics",
    price: 4200,
    mrp: 5200,
    rating: 4.4,
    image: "https://via.placeholder.com/300x240?text=Ortho+Kit",
  },
  {
    id: 5,
    slug: "surgical-kit-ss",
    name: "Dental Surgical Kit – Stainless Steel",
    brand: "Coltene",
    category: "Surgical",
    price: 4500,
    mrp: 6000,
    rating: 4.7,
    image: "https://via.placeholder.com/300x240?text=Surgical+Kit",
  },
];

// ✅ Support older imports
export const BRANDS = brands;
export const CATEGORIES = categories;
export const PRODUCTS = products;

// ✅ Getter function
export function getProductBySlug(slug: string) {
  return products.find((item) => item.slug === slug);
}
