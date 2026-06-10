import React, { useState, useEffect } from "react";

import { Bus, Search, ArrowLeftRight, Calendar, Users, CreditCard, Armchair, CheckCircle2, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth"; 
import Loader from "../../../Components/Loader/Loader.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BusTickets = () => {
  const { user } = useAuth();
  
  const [from, setFrom] = useState("Select Location");
  const [to, setTo] = useState("Select Location");
  const [date, setDate] = useState("2026-06-08");
  const [passengers, setPassengers] = useState(1); 
  
  const [searchedBuses, setSearchedBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [paymentBus, setPaymentBus] = useState(null); // ✅ নতুন state
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const totalSeats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4"];
  const bookedSeatsDemo = ["A2", "C3"]; 

  useEffect(() => {
    fetchBuses("&limit=5");
  }, []);

  const fetchBuses = (queryString) => {
    setLoading(true);
    fetch(`${API_URL}/transports?category=bus${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchedBuses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (from === "Select Location" || to === "Select Location") {
      alert("Please select a valid origin and destination!");
      return;
    }
    if (from === to) {
      alert("Origin and Destination cannot be the same!");
      return;
    }
    
    setSelectedBus(null);
    setPaymentBus(null);
    setSelectedSeats([]);
    setBookingSuccess(false);
    setIsPaymentModalOpen(false);

    let query = "";
    if (from !== "Select Location") query += `&from=${from}`;
    if (to !== "Select Location") query += `&to=${to}`;

    fetchBuses(query); 
  };

const handleViewSeats = (bus) => {
  if (!user) {
    navigate("/login");
    return;
  }
  setSelectedBus(bus);
  setSelectedSeats([]);
  setIsPaymentModalOpen(false);
  setPaymentBus(null);
};
  const handleSeatClick = (seat) => {
    if (bookedSeatsDemo.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length >= passengers) {
        alert(`You can only select up to ${passengers} seat(s)!`);
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handlePaymentSubmit = () => {
    if (!paymentMethod) return alert("Please select a payment method!");
    if (selectedSeats.length !== passengers) {
      return alert(`Please select exactly ${passengers} seat(s) before proceeding!`);
    }
    
    setIsProcessing(true);

    const bookingInfo = {
      transportId: paymentBus._id || paymentBus.id, // ✅ paymentBus
      email: user?.email || "guest@gmail.com",
      transportType: "bus",
      route: `${paymentBus.from} → ${paymentBus.to}`, // ✅ paymentBus
      price: Number(paymentBus.price) * selectedSeats.length, // ✅ paymentBus
      date: date,
      vehicleName: paymentBus.name, // ✅ paymentBus
      seats: selectedSeats.join(", "),
      totalPassengers: passengers
    };

    fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookingInfo)
    })
      .then(res => res.json())
      .then(data => {
        setIsProcessing(false);
        if (data.success || data.insertedId) {
          setIsPaymentModalOpen(false);
          setBookingSuccess(true); 
          setSelectedSeats([]);
          setPaymentMethod("");
          setSelectedBus(null);
          setPaymentBus(null); // ✅ reset
          fetchBuses("&limit=5"); 
        } else {
          alert(data.message || "Booking rejected by server engine.");
        }
      })
      .catch((err) => {
        console.error("Booking error:", err);
        setIsProcessing(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 relative">
      
      {/* Booking Success Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setBookingSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900">Booking Successful!</h3>
            <p className="text-sm text-gray-500">Your seats have been securely reserved. Have a safe journey with Ticket Bari!</p>
            <button 
              onClick={() => setBookingSuccess(false)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md transition text-sm"
            >
              Awesome, Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Payment Gateway Modal — paymentBus ব্যবহার করছে */}
      {isPaymentModalOpen && paymentBus && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative border border-gray-100">
            
            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 border-b pb-3">
              <CreditCard className="w-5 h-5 text-red-500" />
              <h3 className="text-base font-bold text-gray-800">Complete Your Payment</h3>
            </div>

            <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border text-xs font-semibold text-gray-600">
              <div className="flex justify-between"><span>Bus Name:</span> <span className="text-gray-900 font-bold">{paymentBus.name}</span></div>
              <div className="flex justify-between"><span>Route:</span> <span className="text-gray-900">{paymentBus.from} → {paymentBus.to}</span></div>
              <div className="flex justify-between"><span>Passengers:</span> <span className="font-mono font-bold">{passengers} Person(s)</span></div>
              <div className="flex justify-between"><span>Seats:</span> <span className="text-red-500 font-mono font-bold">{selectedSeats.join(", ")}</span></div>
              <div className="flex justify-between border-t pt-2 font-bold text-sm text-gray-900">
                <span>Total Cost:</span> <span>৳{paymentBus.price * selectedSeats.length}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Gateway</label>
              <div className="grid grid-cols-3 gap-2">
                {["bkash", "nagad", "rocket"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-2.5 border rounded-xl text-xs font-bold capitalize transition-all duration-200 active:scale-95
                      ${paymentMethod === method ? "border-red-500 bg-red-50 text-red-600 shadow-sm ring-1 ring-red-500" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handlePaymentSubmit()}
              disabled={isProcessing}
              className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50 text-xs active:scale-[0.98]"
            >
              <CreditCard className="w-4 h-4" />
              {isProcessing ? "Confirming Gateway Escrow..." : `Pay ৳${paymentBus.price * selectedSeats.length} & Confirm`}
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
            <Bus className="w-8 h-8 text-red-500" /> Bus Ticket Booking
          </h1>
          <p className="text-gray-500 mt-2">Buy bus tickets online instantly with secure gateway</p>
        </div>

        {/* Search Box */}
        <div className="w-full bg-white rounded-[40px] shadow-2xl border border-gray-100 p-2">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 items-center" onSubmit={handleSearch}>
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Depart From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer">
                <option value="Select Location">Select Location</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Cox's Bazar">Cox's Bazar</option>
              </select>
            </div>

            <div className="hidden md:flex md:col-span-1 justify-center -mx-4 z-10">
              <div className="bg-white p-2.5 rounded-full border border-gray-100 text-gray-400 shadow-sm">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>

            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Going To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer">
                <option value="Select Location">Select Location</option>
                <option value="Cox's Bazar">Cox's Bazar</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Dhaka">Dhaka</option>
              </select>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1"><Calendar className="w-4 h-4" /> Journey Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer" />
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1"><Users className="w-4 h-4" /> Passengers</label>
              <select 
                value={passengers} 
                onChange={(e) => { setPassengers(Number(e.target.value)); setSelectedSeats([]); setIsPaymentModalOpen(false); }} 
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option value={1}>1 Passenger</option>
                <option value={2}>2 Passengers</option>
                <option value={3}>3 Passengers</option>
                <option value={4}>4 Passengers</option>
              </select>
            </div>

            <div className="md:col-span-1 flex justify-center">
              <button type="submit" className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-3xl flex items-center justify-center shadow-lg transition-transform active:scale-90">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>

        {/* Bus List */}
        {loading ? (
          <Loader message="Fetching Live Buses From Database..." />
        ) : !Array.isArray(searchedBuses) || searchedBuses.length === 0 ? (
          <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-100 text-center text-gray-400 font-medium shadow-sm">
            No Buses available for this specific route setup.
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Available Buses found in DB</h3>
            {searchedBuses.map((bus, index) => {
              const busKey = bus._id || bus.id || `bus-${index}`;
              return (
                <div key={busKey} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-lg transition">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{bus.name}</h4>
                    <p className="text-xs font-semibold text-gray-400 uppercase mt-0.5">{bus.type}</p>
                    <div className="mt-3 flex gap-4 text-xs text-gray-500">
                      <span>Route: <b className="text-gray-700">{bus.from} → {bus.to}</b></span>
                      <span>Departure: <b className="text-gray-700">{bus.time}</b></span>
                      <span>Available Seats: <b className="text-red-500">{bus.availableSeats}</b></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-auto gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Fare</p>
                      <h5 className="text-xl font-black text-gray-800">৳{bus.price}</h5>
                    </div>
                    <button 
                      onClick={() => handleViewSeats(bus)} 
                      className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm active:scale-95"
                    >
                      View Seats
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Seat Selection Modal */}
        {selectedBus && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-5xl w-full p-6 relative shadow-2xl border border-gray-100">
              
              <button 
                onClick={() => { setSelectedBus(null); setSelectedSeats([]); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
                <div className="md:col-span-5 bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Seats ({selectedBus.name})</h4>
                  <p className="text-[11px] text-gray-400 mb-6">Please select exactly <b>{passengers}</b> seat(s)</p>
                  <div className="grid grid-cols-4 gap-3 max-w-[200px] mx-auto">
                    {totalSeats.map((seat) => {
                      const isBooked = bookedSeatsDemo.includes(seat);
                      const isSelected = selectedSeats.includes(seat);
                      return (
                        <button
                          key={seat}
                          disabled={isBooked}
                          type="button"
                          onClick={() => handleSeatClick(seat)}
                          className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center border transition
                            ${isBooked ? "bg-gray-100 text-gray-300 cursor-not-allowed" : 
                              isSelected ? "bg-red-500 border-red-600 text-white shadow-md" : 
                              "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"}`}
                        >
                          <Armchair className="w-3.5 h-3.5 mb-0.5" />
                          {seat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="md:col-span-7 bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Checkout Details</h4>
                    <div className="space-y-2 bg-white p-4 rounded-2xl border text-xs font-semibold text-gray-600">
                      <div className="flex justify-between"><span>Bus Name:</span> <span className="text-gray-900 font-bold">{selectedBus.name}</span></div>
                      <div className="flex justify-between"><span>Route:</span> <span className="text-gray-900">{selectedBus.from} → {selectedBus.to}</span></div>
                      <div className="flex justify-between"><span>Passengers Count:</span> <span className="text-gray-900 font-mono font-bold">{passengers} Person(s)</span></div>
                      <div className="flex justify-between"><span>Seats Chosen:</span> <span className="text-red-500 font-mono font-bold">{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</span></div>
                      <div className="flex justify-between border-t pt-2 font-bold text-sm text-gray-900">
                        <span>Total Cost:</span> <span>৳{selectedBus.price * selectedSeats.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* ✅ এখানে selectedBus কে paymentBus এ save করে seat modal বন্ধ করছি */}
                  {selectedSeats.length === passengers && (
                    <button
                      onClick={() => {
                        setPaymentBus(selectedBus);
                        setSelectedBus(null);
                        setIsPaymentModalOpen(true);
                      }}
                      className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition text-xs active:scale-95"
                    >
                      <CreditCard className="w-4 h-4" />
                      Proceed to Payment Popup
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusTickets;
