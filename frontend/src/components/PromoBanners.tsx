export default function PromoBanners() {
  const banners = [
    {
      id: 1,
      img: "https://via.placeholder.com/600x200/1B84E7/ffffff?text=Clinic+Setup+Offer",
      title: "Start Your New Clinic",
      subtitle: "Exclusive packages for dentists",
    },
    {
      id: 2,
      img: "https://via.placeholder.com/600x200/2ED3B7/ffffff?text=Ortho+Special+Deals",
      title: "Orthodontics Deals",
      subtitle: "Up to 30% OFF on braces tools",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 grid md:grid-cols-2 gap-4">
      {banners.map((banner) => (
        <div key={banner.id} className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
          <img src={banner.img} className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 text-white">
            <h3 className="text-lg font-bold">{banner.title}</h3>
            <p className="text-sm">{banner.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
