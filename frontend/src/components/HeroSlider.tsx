import Slider from "react-slick";

export default function HeroSlider() {
  const banners = [
    "/images/banner1.png",
    "/images/banner2.png",
    "/images/banner3.png",
    "/images/banner4.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="max-w-[1400px] mx-auto mt-4 rounded-3xl overflow-hidden shadow-lg">
      <Slider {...settings}>
        {banners.map((img, i) => (
          <div key={i}>
            <img
              src={img}
              alt={`Banner ${i + 1}`}
              className="w-full h-[420px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
