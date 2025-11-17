export default function MembershipDetails() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* ✅ Hero Section */}
      <div className="max-w-[1400px] mx-auto px-6 mt-6">
        <img
          src="/images/membership-main-banner.png"
          alt="Membership Banner"
          className="w-full rounded-xl shadow"
        />
      </div>

      {/* ✅ Benefits */}
      <div className="max-w-[1400px] mx-auto mt-10 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Elevate Your Dental Journey with DentalKart Membership
        </h2>
        <h3 className="text-lg text-orange-600 font-semibold mb-8">Membership Benefits</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "FREE SHIPPING", desc: "Free Shipping For Members On Every Order." },
            { title: "DOUBLE REWARD VALUE", desc: "Double Reward Coins On Orders Above ₹499." },
            { title: "PRIORITY SHIPPING", desc: "Expedited Delivery & Processing." },
            { title: "EDUCATION PASS DISCOUNT", desc: "Exclusive Seminar & Training Discounts." },
          ].map((b) => (
            <div key={b.title} className="bg-white rounded-xl p-6 shadow hover:shadow-lg">
              <h4 className="text-primary font-semibold mb-2">{b.title}</h4>
              <p className="text-sm text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Plan Section */}
      <div className="max-w-[1400px] mx-auto mt-12 px-6 text-center">
        <h3 className="text-xl font-bold mb-6">Choose Your Plan</h3>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white border rounded-xl p-6 shadow-md w-[280px]">
            <h4 className="font-semibold text-gray-800 mb-2">Plus Plan (6 Months)</h4>
            <p className="text-2xl font-bold text-primary mb-2">₹83.2/month</p>
            <p className="text-sm text-gray-500 mb-4">Save ₹1320</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryDark">
              Continue
            </button>
          </div>
          <div className="bg-white border rounded-xl p-6 shadow-md w-[280px]">
            <h4 className="font-semibold text-gray-800 mb-2">Plus Plan (12 Months)</h4>
            <p className="text-2xl font-bold text-primary mb-2">₹66.6/month</p>
            <p className="text-sm text-gray-500 mb-4">Best Value</p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryDark">
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* ✅ FAQ */}
      <div className="max-w-[1400px] mx-auto mt-16 px-6">
        <h3 className="text-xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "How to buy Dentalkart Plus Membership?",
            "Are Plus Benefits applicable in all cities?",
            "What happens to my old reward points?",
            "When does Plus Membership start?",
          ].map((q) => (
            <div key={q} className="bg-white rounded-lg shadow p-4 hover:shadow-lg">
              <p className="text-sm font-medium text-gray-700">{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Terms */}
      <div className="max-w-[1400px] mx-auto mt-16 px-6">
        <h3 className="text-xl font-bold mb-3 text-center">Terms and Conditions</h3>
        <ul className="list-decimal list-inside text-gray-600 text-sm leading-6">
          <li>Membership starts from date of purchase.</li>
          <li>Non-refundable & valid only for one account.</li>
          <li>Free delivery applies on orders above ₹499.</li>
          <li>Reward coins double for Plus members.</li>
        </ul>
      </div>
    </div>
  );
}
