import React, { useEffect, useState } from "react";
import { Plane, Search, ArrowLeftRight, Calendar } from "lucide-react";

const PlaneTickets = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // সার্চের জন্য স্টেট (State)
  const [flyFrom, setFlyFrom] = useState("Select Airport");
  const [flyTo, setFlyTo] = useState("Select Airport");
  const [departureDate, setDepartureDate] = useState("2026-06-08");
  const [flightClass, setFlightClass] = useState("Economy");

  // প্রথমবার পেজ লোড হলে সব ফ্লাইট নিয়ে আসবে
  useEffect(() => {
    fetchFlights("");
  }, []);

  // ডাটা ফেচ করার কমন ফাংশন
  const fetchFlights = (queryString) => {
    setLoading(true);
    // আপনার DB ক্যাটাগরি অনুযায়ী category=plane অথবা category=flight লিখে নিন
    fetch(`http://localhost:5000/transports?category=plane${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching flight data:", err);
        setLoading(false);
      });
  };

  // সার্চ বাটনে ক্লিক করলে এই ফাংশনটি রান হবে
  const handleSearch = (e) => {
    e.preventDefault();
    
    let query = "";
    if (flyFrom !== "Select Airport") query += `&from=${flyFrom}`;
    if (flyTo !== "Select Airport") query += `&to=${flyTo}`;
    if (departureDate) query += `&date=${departureDate}`;
    
    fetchFlights(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
            <Plane className="w-8 h-8 text-indigo-500" /> Flight Ticket Booking
          </h1>
          <p className="text-gray-500 mt-2">Book domestic and international flights at the best rates</p>
        </div>

        {/* Search Box */}
        <div className="w-full bg-white rounded-[40px] shadow-2xl border border-gray-100 p-2">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 items-center" onSubmit={handleSearch}>
            
            {/* Fly From */}
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Fly From</label>
              <select 
                value={flyFrom}
                onChange={(e) => setFlyFrom(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option>Select Airport</option>
                <option value="Dhaka">Dhaka (DAC)</option>
                <option value="Cox's Bazar">Cox's Bazar (CXB)</option>
                <option value="Sylhet">Sylhet (ZYL)</option>
                <option value="Chittagong">Chittagong (CGP)</option>
              </select>
            </div>

            <div className="hidden md:flex md:col-span-1 justify-center -mx-4 z-10">
              <div className="bg-white p-2.5 rounded-full border border-gray-100 text-gray-400 shadow-sm">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>

            {/* Fly To */}
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Fly To</label>
              <select 
                value={flyTo}
                onChange={(e) => setFlyTo(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option>Select Airport</option>
                <option value="Cox's Bazar">Cox's Bazar (CXB)</option>
                <option value="Dhaka">Dhaka (DAC)</option>
                <option value="Sylhet">Sylhet (ZYL)</option>
                <option value="Chittagong">Chittagong (CGP)</option>
              </select>
            </div>

            {/* Departure Date */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Departure Date
              </label>
              <input 
                type="date" 
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer" 
              />
            </div>

            {/* Flight Class */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Class</label>
              <select 
                value={flightClass}
                onChange={(e) => setFlightClass(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-1 flex justify-center">
              <button type="submit" className="w-16 h-16 bg-indigo-500 hover:bg-indigo-600 text-white rounded-3xl flex items-center justify-center shadow-lg transition-transform active:scale-90">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>

          {/* Trending Section Click Logic */}
          <div className="px-6 py-4 bg-gray-50/30 rounded-b-[40px] text-[11px] flex flex-wrap items-center gap-3">
            <span className="font-bold text-gray-400 uppercase">Trending:</span>
            {["Dhaka → Cox's Bazar", "Dhaka → Sylhet"].map((route, i) => (
              <span 
                key={i} 
                onClick={() => {
                  const [from, to] = route.split(" → ");
                  setFlyFrom(from);
                  setFlyTo(to);
                  fetchFlights(`&from=${from}&to=${to}`);
                }}
                className="bg-white border border-gray-100 px-3 py-1.5 rounded-full text-gray-600 font-semibold cursor-pointer hover:text-indigo-500 transition shadow-sm"
              >
                {route}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Flight List Section */}
        <div className="mt-8 mb-12">
          {loading ? (
            <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center text-gray-500 font-medium shadow-sm animate-pulse">
              Searching flights...
            </div>
          ) : flights.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center text-gray-400 font-medium shadow-sm">
              No available flights found for this route.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {flights.map((flight) => (
                <div key={flight._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-indigo-50 text-indigo-500 rounded-2xl">
                      <Plane className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{flight.name}</h3>
                      <div className="flex gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                        <span>{flight.from} → {flight.to}</span>
                        <span>•</span>
                        <span>{flight.type || "Boeing 737"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col items-baseline md:items-end gap-2">
                    <span className="text-xs text-gray-400 font-medium">Time: {flight.time}</span>
                    <span className="text-xs text-green-500 font-bold bg-green-50 px-2 py-1 rounded-lg">Available</span>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-auto md:gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    <div>
                      <span className="text-2xl font-black text-gray-800">৳{flight.price}</span>
                      <span className="text-xs text-gray-400 block">per person</span>
                    </div>
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-2xl transition shadow-md active:scale-95 text-sm">
                      Select Flight
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PlaneTickets;