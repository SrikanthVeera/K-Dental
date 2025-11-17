import React from "react";

const guides = [
  {
    title: "Maxillary Sinus Augmentation",
    subtitle: "Step-by-Step Guide. Product-by-Product Confidence.",
    img: "/guides/sinus.jpg",
  },
  {
    title: "Composite Restoration",
    subtitle: "Unlock clinical perfection—dive into an expert-crafted composite protocol.",
    img: "/guides/composite.jpg",
  },
  {
    title: "Non-vital Thermocatalytic Tooth Bleaching",
    subtitle: "Experience advanced minimally invasive bleaching technique.",
    img: "/guides/tooth-bleaching.jpg",
  },
  {
    title: "Apexification",
    subtitle: "Materials & Techniques for Lasting Apical Closure.",
    img: "/guides/apexification.jpg",
  },
  {
    title: "Ceramic Veneers",
    subtitle: "Preparation & Cementation Protocol — Technique to Tools.",
    img: "/guides/ceramic.jpg",
  },
  {
    title: "Apexogenesis",
    subtitle: "Your Procedure. Our Products. One Seamless Workflow.",
    img: "/guides/apexogenesis.jpg",
  },
  {
    title: "Must Have Equipments",
    subtitle: "From X-ray to autoclave—equip your clinic with essentials.",
    img: "/guides/equipments.jpg",
  },
  {
    title: "Tooth Jewellery Placement",
    subtitle: "Your Resource for Safe, Non-Invasive Tooth Jewellery.",
    img: "/guides/jewellery.jpg",
  },
  {
    title: "Complete Guide to Implant Placement",
    subtitle: "From Case Assessment to Final Screw Placement.",
    img: "/guides/implant.jpg",
  },
  {
    title: "Emergency Medicine & Monitoring Kit for Dental Clinics",
    subtitle: "Stay prepared for the unexpected in every procedure!",
    img: "/guides/emergency.jpg",
  },
  {
    title: "Crown Lengthening Procedure",
    subtitle: "Empower your practice with precision crown lengthening expertise.",
    img: "/guides/crown.jpg",
  },
  {
    title: "GIC Restoration",
    subtitle: "Equip, Restore, Repeat – Everything You Need for GIC Procedures!",
    img: "/guides/gic.jpg",
  },
  {
    title: "Fiber Post Cementation",
    subtitle: "Core Build-Up in Endodontically Treated Tooth.",
    img: "/guides/fiberpost.jpg",
  },
  {
    title: "Topical Fluoride Varnish Application",
    subtitle: "One Quick Coat for Lasting Cavity Defense.",
    img: "/guides/fluoride.jpg",
  },
];

export default function BuyingGuide() {
  return (
    <div className="bg-[#f9fbff] min-h-screen pb-10">
      {/* Header Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center px-6 py-5">
          <h1 className="text-2xl font-bold text-primary">Buying Guide</h1>
          <input
            type="text"
            placeholder="Search Buying Guide"
            className="border px-4 py-2 rounded-full w-[250px] focus:ring-2 focus:ring-primary outline-none text-sm"
          />
        </div>
      </div>

      {/* Main Banner */}
      <div className="max-w-[1400px] mx-auto mt-6">
        <img
          src="/guides/main-banner.jpg"
          alt="Buying Guide Banner"
          className="w-full h-[280px] md:h-[380px] object-cover rounded-xl shadow"
        />
      </div>

      {/* Guide Cards */}
      <div className="max-w-[1400px] mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={guide.img}
              alt={guide.title}
              className="w-full h-[180px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {guide.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{guide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="max-w-[1400px] mx-auto bg-white shadow mt-12 mb-8 rounded-xl flex flex-col md:flex-row items-center justify-between px-8 py-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 md:mb-0">
          Subscribe to our{" "}
          <span className="text-primary">Newsletter</span>
        </h3>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter email address"
            className="border rounded-l-full px-5 py-2 w-[250px] focus:ring-2 focus:ring-primary outline-none text-sm"
          />
          <button className="bg-primary text-white px-5 py-2 rounded-r-full hover:bg-primaryDark">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
