import { Boxes, ShieldCheck, Award } from "lucide-react";

const features = [
  {
    icon: Boxes,
    title: "20,000+ Products",
    subtitle: "Largest Dental Store",
  },
  {
    icon: Award,
    title: "450+ Brands",
    subtitle: "Trusted Manufacturers",
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine",
    subtitle: "Verified & Certified",
  },
];

export default function FeatureBar() {
  return (
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 mt-8">
      {features.map(({ icon: Icon, title, subtitle }) => (
        <div
          key={title}
          className="flex items-center gap-4 bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="bg-primary/10 text-primary w-12 h-12 flex items-center justify-center rounded-full">
            <Icon size={26} />
          </div>

          <div>
            <p className="font-semibold text-gray-900">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
