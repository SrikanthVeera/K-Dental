import { useState } from "react";
import { Calendar, MapPin, Globe, Clock } from "lucide-react";

const events = [
  {
    id: 1,
    title: "83rd Clinical Course on Immediate Loading & Minimally Invasive Implantology",
    type: "In-Person",
    mode: "Health & Medicine",
    location: "Pune, Maharashtra",
    date: "Fri Nov 14, 2025 - 09:00 AM (IST)",
    image: "https://via.placeholder.com/400x250?text=Implantology+Course",
  },
  {
    id: 2,
    title: "TiILT with Nitin - A Masterclass in Zygomatic & Graftless Implantology",
    type: "In-Person",
    mode: "Health & Medicine",
    location: "Mumbai, Maharashtra",
    date: "Sat Nov 15, 2025 - 09:00 AM (IST)",
    image: "https://via.placeholder.com/400x250?text=Masterclass",
  },
  {
    id: 3,
    title: "AICTE-Evaluated Management Certificate Course",
    type: "Virtual",
    mode: "Health & Medicine",
    location: "Online Event",
    date: "Sat Nov 15, 2025 - 08:00 AM (IST)",
    image: "https://via.placeholder.com/400x250?text=AICTE+Course",
  },
  {
    id: 4,
    title: "46th ISPDP National Conference 2025",
    type: "In-Person",
    mode: "Health & Medicine",
    location: "Hyderabad, Telangana",
    date: "Fri Nov 21, 2025 - 09:00 AM (IST)",
    image: "https://via.placeholder.com/400x250?text=ISPDP+Conference",
  },
  {
    id: 5,
    title: "36th National Conference of IAOMR 2025",
    type: "In-Person",
    mode: "Health & Medicine",
    location: "Navi Mumbai, Maharashtra",
    date: "Fri Nov 28, 2025 - 09:00 AM (IST)",
    image: "https://via.placeholder.com/400x250?text=IAOMR+2025",
  },
  {
    id: 6,
    title: "Indian Society of Periodontology and Implantology National Conference",
    type: "In-Person",
    mode: "Health & Medicine",
    location: "Bangalore, Karnataka",
    date: "Fri Dec 05, 2025 - 09:00 AM (IST)",
    image: "https://via.placeholder.com/400x250?text=Periodontology+Conference",
  },
];

export default function Events() {
  const [tab, setTab] = useState("Live Events");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [typeFilter, setTypeFilter] = useState("All Event Types");

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* ✅ Header */}
      <div className="bg-white border-b py-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Dentalkart Events</h1>
      </div>

      {/* ✅ Tabs */}
      <div className="max-w-[1400px] mx-auto flex justify-center gap-6 mt-6 border-b pb-3">
        {["Live Events", "Past Events"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 border-b-2 font-medium ${
              tab === t ? "border-primary text-primary" : "border-transparent text-gray-600"
            }`}
          >
            {t} {t === "Live Events" ? "(24)" : "(60)"}
          </button>
        ))}
      </div>

      {/* ✅ Filters */}
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-4 px-6 mt-6">
        <input
          type="text"
          placeholder="Search Events"
          className="border rounded-lg px-4 py-2 w-full md:w-1/3 shadow-sm"
        />

        <div className="flex flex-wrap gap-3">
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            <option>All Cities</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Hyderabad</option>
            <option>Bangalore</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>All Categories</option>
            <option>Implantology</option>
            <option>Endodontics</option>
            <option>Orthodontics</option>
            <option>Prosthodontics</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option>All Event Types</option>
            <option>In-Person</option>
            <option>Virtual</option>
          </select>
        </div>
      </div>

      {/* ✅ Event Cards */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-10">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-2">
                {event.title}
              </h3>
              <div className="text-gray-500 text-sm flex items-center gap-2 mb-1">
                <Clock size={14} /> {event.date}
              </div>
              <div className="text-gray-500 text-sm flex items-center gap-2 mb-1">
                <MapPin size={14} /> {event.location}
              </div>
              <div className="text-gray-500 text-sm flex items-center gap-2 mb-2">
                <Globe size={14} /> {event.mode}
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  {event.type}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  {event.mode}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
