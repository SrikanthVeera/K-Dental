import React, { useState } from "react";

export default function NewClinicSetup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    budget: "",
    remarks: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Clinic setup request submitted successfully!");
  };

  return (
    <div className="bg-gray-50 pb-20">
      {/* ✅ Hero Banner */}
      <div className="w-full">
        <img
          src="/images/new-clinic-banner.png"
          alt="New Dental Clinic Setup"
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* ✅ Benefits Section */}
      <div className="max-w-[1200px] mx-auto bg-white mt-10 rounded-2xl shadow p-8 text-center">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          What Added Benefits Do You Get With DentalKart’s New Clinic Setup?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Installation Support",
              desc: "Seamless and reliable installation assistance for all your dental equipment.",
            },
            {
              title: "Clinic Setup Consultation",
              desc: "Expert guidance for clinic layout, design, and equipment selection.",
            },
            {
              title: "Post-Installation Care",
              desc: "Free post-installation maintenance and customer support.",
            },
            {
              title: "Continuous Support",
              desc: "Dedicated support at every step of your journey.",
            },
            {
              title: "Upfront Payment Benefit",
              desc: "Exclusive cashback for full payment upfront.",
            },
            {
              title: "Flexible Customization",
              desc: "Custom setup packages tailored to your needs.",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 bg-[#F8FAFF] hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-primary mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
        <button className="mt-8 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primaryDark transition">
          Get Started
        </button>
      </div>

      {/* ✅ Info Section */}
      <div className="max-w-[1200px] mx-auto bg-[#F4F9FF] mt-10 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Setting Up A Dental Clinic? We’ve Got You Covered!
        </h3>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Starting a new dental clinic can be overwhelming — financially and logistically.
          That’s where DentalKart comes in. We’re not just a supplier — we’re your setup partner,
          helping you choose the right equipment while staying within budget.
          Our setup packages help you invest smartly and get your clinic up and running smoothly.
        </p>
      </div>

      {/* ✅ Clinic Setup Form */}
      <div className="max-w-[900px] mx-auto mt-10 bg-white rounded-2xl shadow p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Schedule Your Free Clinic Setup Call
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="border rounded-lg px-4 py-3 text-sm shadow-sm"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            className="border rounded-lg px-4 py-3 text-sm shadow-sm"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            required
            className="border rounded-lg px-4 py-3 text-sm shadow-sm"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
            className="border rounded-lg px-4 py-3 text-sm shadow-sm"
          />
          <input
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="Budget (in lakhs)"
            required
            className="border rounded-lg px-4 py-3 text-sm shadow-sm"
          />
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            placeholder="Any additional information"
            className="border rounded-lg px-4 py-3 text-sm shadow-sm md:col-span-2"
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 mt-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primaryDark transition"
          >
            Submit Request
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Need help?{" "}
          <a href="#" className="text-primary font-semibold">
            Contact us
          </a>
        </p>
      </div>

      {/* ✅ YouTube Video */}
      <div className="max-w-[900px] mx-auto mt-16 text-center">
        <h3 className="text-lg font-semibold mb-6 text-gray-700">
          See how we set up your perfect dental clinic
        </h3>
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="480"
            src="https://www.youtube.com/embed/3G18LkI3zKc"
            title="How to Start Your Dental Clinic | DentalKart Setup Guide"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-gray-500 text-sm mt-3">
          Watch our detailed walkthrough of the clinic setup process and see how we can help you
          create your dream dental practice.
        </p>
      </div>

      {/* ✅ FAQ Section */}
      <div className="max-w-[1000px] mx-auto mt-16 bg-white rounded-2xl shadow p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">FAQ</h3>
        <div className="space-y-4">
          {[
            {
              q: "Can I Get A Basic Equipment Setup To Start A Dental Clinic?",
              a: "Yes, DentalKart provides a range of essential dental equipment and consumables to help you set up your practice confidently.",
            },
            {
              q: "Does DentalKart Offer Consultation For Choosing The Right Equipment?",
              a: "Absolutely. Our experts guide you in selecting tools and layouts suited to your specialty, space, and budget.",
            },
            {
              q: "Is Installation And Setup Included With DentalKart Purchases?",
              a: "Yes. DentalKart offers free installation assistance and full setup support with all clinic setup packages.",
            },
            {
              q: "Can I Buy Consumables Separately Or Only As Part Of A Kit?",
              a: "You can do both — buy complete setup kits or individual items based on your needs and preferences.",
            },
            {
              q: "What Support Does DentalKart Offer After Setup?",
              a: "We provide continuous post-purchase support, technical assistance, and expert guidance to ensure smooth clinic operations.",
            },
          ].map((faq, i) => (
            <div key={i}>
              <h4 className="font-semibold text-gray-800 mb-1">{faq.q}</h4>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
