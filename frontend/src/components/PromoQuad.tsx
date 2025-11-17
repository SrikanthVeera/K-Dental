export default function PromoQuad() {
  const tiles = [
    { img: "https://via.placeholder.com/600x220/0E62B7/ffffff?text=Elite+HD%2B", title: "Elite HD+", sub: "Buy now" },
    { img: "https://via.placeholder.com/600x220/1B84E7/ffffff?text=Implant+Kits", title: "Implant Kits", sub: "Starter to Advance" },
    { img: "https://via.placeholder.com/600x220/2ED3B7/0F172A?text=Membership", title: "Membership", sub: "Unlock benefits" },
    { img: "https://via.placeholder.com/600x220/F7FBFF/0F172A?text=Buying+Guide", title: "Buying Guide", sub: "Expert picks" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 mt-10 grid md:grid-cols-2 gap-4">
      {tiles.slice(0,2).map(t => (
        <div key={t.title} className="relative overflow-hidden rounded-xl border bg-white hover:shadow-md transition">
          <img src={t.img} className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/25 flex items-end p-4 text-white">
            <div>
              <div className="text-lg font-bold">{t.title}</div>
              <div className="text-sm opacity-90">{t.sub}</div>
            </div>
          </div>
        </div>
      ))}
      {tiles.slice(2).map(t => (
        <div key={t.title} className="relative overflow-hidden rounded-xl border bg-white hover:shadow-md transition">
          <img src={t.img} className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/25 flex items-end p-4 text-white">
            <div>
              <div className="text-lg font-bold">{t.title}</div>
              <div className="text-sm opacity-90">{t.sub}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
