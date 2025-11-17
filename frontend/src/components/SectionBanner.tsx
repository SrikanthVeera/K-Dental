export default function SectionBanner({
  img,
  title,
  subtitle,
}: { img: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="relative rounded-xl overflow-hidden border">
        <img src={img} className="w-full h-44 md:h-56 object-cover" />
        <div className="absolute inset-0 bg-black/25 flex items-center px-6 text-white">
          <div>
            <div className="text-2xl md:text-3xl font-serif font-bold">{title}</div>
            {subtitle && <div className="mt-1 text-sm md:text-base">{subtitle}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
