import { Link } from "react-router-dom";

export default function Membership() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between px-10 gap-10">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Dentalkart Membership</h1>
          <p className="text-gray-600 mb-4">
            Plus membership pays the buyer with double benefits. Delivery gets free on any purchase above ₹499 and bonus of double reward coins.
          </p>
          <p className="text-orange-600 font-semibold mb-5">
            See Membership Plan For More Offers And Services
          </p>
          <Link
            to="/membership/details"
            className="px-6 py-3 border border-gray-400 rounded-lg text-sm hover:bg-primary hover:text-white"
          >
            Explore More
          </Link>
        </div>

        <img
          src="/images/membership-banner.png"
          alt="Membership Banner"
          className="w-[400px] rounded-xl shadow"
        />
      </div>
    </div>
  );
}
