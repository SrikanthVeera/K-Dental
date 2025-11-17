import Slider from "react-slick";

const brands = [
  "/brands/brand.png",
  "/brands/brand1.png",
  "/brands/brand2.png",
  "/brands/brand3.png",
  "/brands/brand4.png",
  "/brands/brand5.png",
  "/brands/brand4.png",
  "/brands/brand3.png",
  "/brands/brand1.png",
];

export default function BrandCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="max-w-[1400px] mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Brands</h2>
      <Slider {...settings}>
        {brands.map((logo, i) => (
          <div key={i} className="p-4 flex justify-center">
            <img
              src={logo}
              alt="Brand Logo"
              className="max-h-14 object-contain grayscale hover:grayscale-0 transition"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
