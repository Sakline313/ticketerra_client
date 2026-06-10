import React, { useEffect, useState } from "react";
import { Train, Search, ArrowLeftRight, Calendar } from "lucide-react";
import Loader from "../../../Components/Loader/Loader.jsx";

const TrainTickets = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  // সার্চের জন্য স্টেট (State)
  const [fromStation, setFromStation] = useState("Select Station");
  const [toStation, setToStation] = useState("Select Station");
  const [journeyDate, setJourneyDate] = useState("2026-06-08");
  const [seatClass, setSeatClass] = useState("Snigdha (AC)");

  // প্রথমবার পেজ লোড হলে সব ট্রেন নিয়ে আসবে
  useEffect(() => {
    fetchTrains("");
  }, []);

  // ডাটা ফেচ করার কমন ফাংশন
  const fetchTrains = (queryString) => {
    setLoading(true);
    fetch(`http://localhost:5000/transports?category=train${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        setTrains(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching train data:", err);
        setLoading(false);
      });
  };

  // সার্চ বাটনে ক্লিক করলে এই ফাংশনটি রান হবে
  const handleSearch = (e) => {
    e.preventDefault();
    
    let query = "";
    // "Select Station" বা ফাঁকা না থাকলে কুয়েরিতে যোগ হবে
    if (fromStation && fromStation !== "Select Station" && fromStation.trim() !== "") {
      query += `&from=${encodeURIComponent(fromStation.trim())}`;
    }
    if (toStation && toStation !== "Select Station" && toStation.trim() !== "") {
      query += `&to=${encodeURIComponent(toStation.trim())}`;
    }
    // নোট: ব্যাকএন্ডে ডেট ফিল্টার যুক্ত না থাকলে এটি ক্যাটাগরি অনুসারে ডাটা আনবে
    if (journeyDate && journeyDate.trim() !== "") {
      query += `&date=${encodeURIComponent(journeyDate.trim())}`;
    }
    
    fetchTrains(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
            <Train className="w-8 h-8 text-green-500" /> Train Ticket Booking
          </h1>
          <p className="text-gray-500 mt-2">Fast and safe train ticket booking across the country</p>
        </div>

        {/* Search Box */}
        <div className="w-full bg-white rounded-[40px] shadow-2xl border border-gray-100 p-2">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 items-center" onSubmit={handleSearch}>
            
            {/* From Station */}
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">From Station</label>
              <select 
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option value="Select Station">Select Station</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>

            <div className="hidden md:flex md:col-span-1 justify-center -mx-4 z-10">
              <div className="bg-white p-2.5 rounded-full border border-gray-100 text-gray-400 shadow-sm">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>

            {/* To Station */}
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">To Station</label>
              <select 
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option value="Select Station">Select Station</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Khulna">Khulna</option>
                <option value="Chattogram">Chattogram</option>
              </select>
            </div>

            {/* Journey Date */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Journey Date
              </label>
              <input 
                type="date" 
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer" 
              />
            </div>

            {/* Seat Class */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Seat Class</label>
              <select 
                value={seatClass}
                onChange={(e) => setSeatClass(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option>Snigdha (AC)</option>
                <option>S_CHAIR (Non-AC)</option>
                <option>AC_BERTH</option>
                <option>SHOVON</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-1 flex justify-center">
              <button type="submit" className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-3xl flex items-center justify-center shadow-lg transition-transform active:scale-90">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>

          {/* Trending Section */}
          <div className="px-6 py-4 bg-gray-50/30 rounded-b-[40px] text-[11px] flex flex-wrap items-center gap-3">
            <span className="font-bold text-gray-400 uppercase">Trending:</span>
            {["Dhaka → Rajshahi", "Dhaka → Chattogram"].map((route, i) => (
              <span 
                key={i} 
                onClick={() => {
                  const [from, to] = route.split(" → ");
                  setFromStation(from);
                  setToStation(to);
                  fetchTrains(`&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
                }}
                className="bg-white border border-gray-100 px-3 py-1.5 rounded-full text-gray-600 font-semibold cursor-pointer hover:text-green-500 transition shadow-sm"
              >
                {route}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Train List Section */}
        <div className="mt-8 mb-12">
          {loading ? (
            <Loader message="Sifting Train Schedules Across Database..." />
          ) : trains.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center text-gray-400 font-medium shadow-sm">
              No trains found for this route.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {trains.map((train) => (
                <div key={train._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-green-50 text-green-500 rounded-2xl">
                      <Train className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{train.name}</h3>
                      <div className="flex gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                        <span>{train.from} → {train.to}</span>
                        <span>•</span>
                        <span>{train.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col items-baseline md:items-end gap-2">
                    <span className="text-xs text-gray-400 font-medium">Time: {train.time}</span>
                    <span className="text-xs text-green-500 font-bold bg-green-50 px-2 py-1 rounded-lg">Seats: {train.availableSeats || 0} Left</span>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-auto md:gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    <div>
                      <span className="text-2xl font-black text-gray-800">৳{train.price}</span>
                      <span className="text-xs text-gray-400 block">per ticket</span>
                    </div>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-2xl transition shadow-md active:scale-95 text-sm">
                      Book Now
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

export default TrainTickets;