import { useState, useEffect } from "react";
import { Bus, Search, ArrowLeftRight, Calendar, Users, CreditCard, Armchair, CheckCircle2 } from "lucide-react";
import useAuth from "../../../hooks/useAuth"; // আপনার প্রজেক্টের Auth হুক

const BusTickets = () => {
  const { user } = useAuth();
  
  // স্টেট ম্যানেজমেন্ট
  const [from, setFrom] = useState("Select Location");
  const [to, setTo] = useState("Select Location");
  const [date, setDate] = useState("2026-06-08");
  const [passengers, setPassengers] = useState(1); // সংখ্যা আকারে ইনিশিয়াল ভ্যালু ১ করা হলো
  
  const [searchedBuses, setSearchedBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // ডেমো সিট প্ল্যান
  const totalSeats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4"];
  const bookedSeatsDemo = ["A2", "C3"]; // অলরেডি বুকড সিট

  // প্রথমবার পেজ লোড হওয়ার সাথে সাথে সব বাসের ডেটা ব্যাকএন্ড থেকে নিয়ে আসবে
  useEffect(() => {
    fetchBuses("");
  }, []);

  // ডেটা ফেচ করার কমন ডাইনামিক ফাংশন
  const fetchBuses = (queryString) => {
    setLoading(true);
    fetch(`http://localhost:5000/transports?category=bus${queryString}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchedBuses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bus data:", err);
        setLoading(false);
      });
  };

  // সার্চ হ্যান্ডলার (সার্চ বাটনে ক্লিক করলে বা ট্রেন্ডিং রুটে ক্লিক করলে ফিল্টার করবে)
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
    setSelectedSeats([]);
    setBookingSuccess(false);

    // ডাইনামিক কুয়েরি স্ট্রিং তৈরি
    let query = "";
    if (from !== "Select Location") query += `&from=${from}`;
    if (to !== "Select Location") query += `&to=${to}`;
    if (date) query += `&date=${date}`;

    fetchBuses(query);
  };

  // সিট ক্লিক হ্যান্ডলার
  const handleSeatClick = (seat) => {
    if (bookedSeatsDemo.includes(seat)) return;
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      // ইউজার সিলেক্ট করা প্যাসেঞ্জার সংখ্যার বেশি সিট বুক করতে পারবে না
      if (selectedSeats.length >= passengers) {
        alert(`You can only select up to ${passengers} seat(s) as per your passenger selection!`);
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // পেমেন্ট ও টিকিট বুকিং হ্যান্ডলার
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) return alert("Please select a payment method!");
    if (selectedSeats.length === 0) return alert("Please select at least one seat!");
    
    setIsProcessing(true);

    const bookingInfo = {
      email: user?.email || "guest@gmail.com",
      transportType: "bus",
      route: `${from === "Select Location" ? selectedBus.from : from} → ${to === "Select Location" ? selectedBus.to : to}`,
      price: selectedBus.price * selectedSeats.length,
      date: date,
      vehicleName: selectedBus.name,
      seats: selectedSeats.join(", "),
      totalPassengers: passengers // বুকিং অবজেক্টে প্যাসেঞ্জার সংখ্যা পাঠানো হচ্ছে
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookingInfo)
    })
      .then(res => res.json())
      .then(data => {
        setIsProcessing(false);
        if (data.insertedId) {
          setBookingSuccess(true);
          setSelectedSeats([]);
          setPaymentMethod("");
          // বুকিং শেষ হলে পুনরায় ফ্রেশ ডেটা লোড করবে
          fetchBuses("");
          setSelectedBus(null);
        }
      })
      .catch(() => setIsProcessing(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
            <Bus className="w-8 h-8 text-red-500" /> Bus Ticket Booking
          </h1>
          <p className="text-gray-500 mt-2">Buy bus tickets online instantly with secure gateway</p>
        </div>

        {/* Search Box */}
        <div className="w-full bg-white rounded-[40px] shadow-2xl border border-gray-100 p-2">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 items-center" onSubmit={handleSearch}>
            
            {/* Depart From */}
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Depart From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer">
                <option>Select Location</option>
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

            {/* Going To */}
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Going To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer">
                <option>Select Location</option>
                <option value="Cox's Bazar">Cox's Bazar</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Dhaka">Dhaka</option>
              </select>
            </div>

            {/* Journey Date */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1"><Calendar className="w-4 h-4" /> Journey Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer" />
            </div>

            {/* Passengers (মান পরিবর্তন এবং ডাইনামিক কন্ট্রোল যুক্ত) */}
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1"><Users className="w-4 h-4" /> Passengers</label>
              <select 
                value={passengers} 
                onChange={(e) => {
                  setPassengers(Number(e.target.value));
                  setSelectedSeats([]); // প্যাসেঞ্জার পরিবর্তন করলে আগের সিট সিলেকশন রিসেট হবে
                }} 
                className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer"
              >
                <option value={1}>1 Passenger</option>
                <option value={2}>2 Passengers</option>
                <option value={3}>3 Passengers</option>
                <option value={4}>4 Passengers</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-1 flex justify-center">
              <button type="submit" className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-3xl flex items-center justify-center shadow-lg transition-transform active:scale-90">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>

          {/* Trending Click Logic */}
          <div className="px-6 py-4 bg-gray-50/30 rounded-b-[40px] text-[11px] flex flex-wrap items-center gap-3">
            <span className="font-bold text-gray-400 uppercase">Trending:</span>
            {["Dhaka → Cox's Bazar", "Dhaka → Rajshahi"].map((route, i) => (
              <span 
                key={i} 
                onClick={() => { 
                  const targetTo = route.includes("Rajshahi") ? "Rajshahi" : "Cox's Bazar";
                  setFrom("Dhaka"); 
                  setTo(targetTo); 
                  fetchBuses(`&from=Dhaka&to=${targetTo}`);
                }} 
                className="bg-white border border-gray-100 px-3 py-1.5 rounded-full text-gray-600 font-semibold cursor-pointer hover:text-red-500 transition shadow-sm"
              >
                {route}
              </span>
            ))}
          </div>
        </div>

        {/* BOOKING SUCCESS NOTIFICATION */}
        {bookingSuccess && (
          <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-emerald-900">Ticket Purchase Successful!</h3>
            <p className="text-sm text-emerald-600">Your seat has been reserved. You can view this on your <b>My Tickets</b> dashboard page.</p>
          </div>
        )}

        {/* LOADING & EMPTY STATES */}
        {loading && <div className="mt-12 text-center text-sm font-bold text-gray-400 animate-pulse">Searching Live MongoDB Fleets...</div>}

        {!loading && searchedBuses.length === 0 && !bookingSuccess && (
          <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-100 text-center text-gray-400 font-medium shadow-sm">
            No Buses available for this specific route setup.
          </div>
        )}

        {/* 🚌 BUS LIST RENDER AREA */}
        {!loading && searchedBuses.length > 0 && (
          <div className="mt-10 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Available Buses found in DB</h3>
            {searchedBuses.map((bus) => (
              <div key={bus._id || bus.id} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-lg transition">
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
                  <button onClick={() => { setSelectedBus(bus); setSelectedSeats([]); }} className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm">
                    View Seats
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 💺 SEAT AND SECURE CHECKOUT SECTION */}
        {selectedBus && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
            {/* Seat Grid */}
            <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl text-center">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Seats</h4>
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
                          isSelected ? "bg-red-500 border-red-600 text-white shadow-md shadow-red-200" : 
                          "bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100"}`}
                    >
                      <Armchair className="w-3.5 h-3.5 mb-0.5" />
                      {seat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price breakdown and Payment info */}
            <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Checkout Details</h4>
                <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border text-xs font-semibold text-gray-600">
                  <div className="flex justify-between"><span>Bus Engine:</span> <span className="text-gray-900 font-bold">{selectedBus.name}</span></div>
                  <div className="flex justify-between"><span>Route:</span> <span className="text-gray-900">{selectedBus.from} → {selectedBus.to}</span></div>
                  <div className="flex justify-between"><span>Passengers Count:</span> <span className="text-gray-900 font-mono font-bold">{passengers} Person(s)</span></div>
                  <div className="flex justify-between"><span>Seats Chosen:</span> <span className="text-red-500 font-mono font-bold">{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</span></div>
                  <div className="flex justify-between border-t pt-2 font-bold text-sm text-gray-900">
                    <span>Total Cost:</span> <span>৳{selectedBus.price * selectedSeats.length}</span>
                  </div>
                </div>

                {selectedSeats.length === passengers && (
                  <div className="mt-4 space-y-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">Select Gateway</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["bkash", "nagad", "rocket"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`p-2 border rounded-xl text-xs font-bold capitalize transition
                            ${paymentMethod === method ? "border-red-500 bg-red-50 text-red-600 shadow-sm" : "border-gray-100 bg-gray-50 text-gray-600"}`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedSeats.length === passengers && (
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isProcessing}
                  className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50 text-xs"
                >
                  <CreditCard className="w-4 h-4" />
                  {isProcessing ? "Confirming Gateway Escrow..." : `Pay ৳${selectedBus.price * selectedSeats.length} & Reserve Ticket`}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BusTickets;