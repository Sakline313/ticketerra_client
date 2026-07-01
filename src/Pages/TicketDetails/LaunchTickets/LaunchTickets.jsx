import React, { useEffect, useState } from "react";
import { Ship, Search, ArrowLeftRight, Calendar, Anchor } from "lucide-react";
import Loader from "../../../Components/Loader/Loader.jsx";
import { Link } from 'react-router-dom';

const LaunchTickets = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  // API URL সেটআপ
  const API_URL = "http://localhost:5000";

  // সার্চ স্টেট
  const [departFrom, setDepartFrom] = useState("Select Terminal");
  const [goingTo, setGoingTo] = useState("Select Terminal");
  const [journeyDate, setJourneyDate] = useState("2026-06-08");
  const [cabinType, setCabinType] = useState("Single Cabin");

  // ডাটা ফেচ করার ফাংশন
  const fetchLaunches = (queryString = "") => {
    setLoading(true);
    fetch(`${API_URL}/transports?category=launch${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        setLaunches(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching launch data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  // সার্চ হ্যান্ডেলারa
const handleSearch = (e) => {
    e.preventDefault();
    
    // ভ্যালিডেশন ঠিক করুন
    if (departFrom === "Select Terminal" || goingTo === "Select Terminal") {
      alert("Please select a valid origin and destination terminal!");
      return;
    }
    
    // ব্যাকএন্ডের সাথে মিল রেখে কুয়েরি তৈরি করুন
    let query = `&from=${departFrom}&to=${goingTo}&date=${journeyDate}&type=${cabinType}`;
    fetchLaunches(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
            <Ship className="w-8 h-8 text-blue-500" /> Launch Ticket Booking
          </h1>
          <p className="text-gray-500 mt-2">Book luxury launch cabins and deck tickets online</p>
        </div>

        {/* Search Box */}
        <div className="w-full bg-white rounded-[40px] shadow-2xl border border-gray-100 p-2">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 items-center" onSubmit={handleSearch}>
            
            {/* Depart From */}
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Depart From</label>
              <select 
                value={departFrom}
                onChange={(e) => setDepartFrom(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option>Select Terminal</option>
                <option value="Dhaka (Sadarghat)">Dhaka (Sadarghat)</option>
                <option value="Barishal">Barishal</option>
                <option value="Chandpur">Chandpur</option>
              </select>
            </div>

            <div className="hidden md:flex md:col-span-1 justify-center -mx-4 z-10">
              <div className="bg-white p-2.5 rounded-full border border-gray-100 text-gray-400 shadow-sm">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>

            {/* Going To */}
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Going To</label>
              <select 
                value={goingTo}
                onChange={(e) => setGoingTo(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option>Select Terminal</option>
                <option value="Barishal">Barishal</option>
                <option value="Dhaka (Sadarghat)">Dhaka (Sadarghat)</option>
                <option value="Bhola">Bhola</option>
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

            {/* Cabin Type */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Cabin Type</label>
              <select 
                value={cabinType}
                onChange={(e) => setCabinType(e.target.value)}
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option value="Single Cabin">Single Cabin</option>
                <option value="Double Cabin">Double Cabin</option>
                <option value="VIP Cabin">VIP Cabin</option>
                <option value="Deck">Deck</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="md:col-span-1 flex justify-center">
              <button type="submit" className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-3xl flex items-center justify-center shadow-lg transition-transform active:scale-90">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>

        {/* Dynamic Launch List */}
        <div className="mt-8 mb-12">
          {loading ? (
            <Loader message="Scanning waterways and secure cabin configurations..." />
          ) : launches.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-gray-100 text-center text-gray-400 font-medium shadow-sm">
              No luxury launches or cabins found for this route.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {launches.map((launch) => (
                <div key={launch._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl">
                      <Anchor className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{launch.name}</h3>
                      <div className="flex gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                        <span>{launch.from} → {launch.to}</span>
                        <span>•</span>
                        <span>{launch.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col items-baseline md:items-end gap-2">
                    <span className="text-xs text-gray-400 font-medium">Time: {launch.time}</span>
                    <span className="text-xs text-green-500 font-bold bg-green-50 px-2 py-1 rounded-lg">Seats: {launch.availableSeats} Left</span>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-auto md:gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    <div>
                      <span className="text-2xl font-black text-gray-800">৳{launch.price}</span>
                      <span className="text-xs text-gray-400 block">per cabin</span>
                    </div>
                    <Link to={`/checkout/${launch._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl transition shadow-md active:scale-95 text-sm block text-center">
                      Book Cabin
                    </Link>
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

export default LaunchTickets;