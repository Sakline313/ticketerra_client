import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Anchor, Calendar, Users, DollarSign, ArrowRight } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../Components/Loader/Loader.jsx";

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [transport, setTransport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seatCount, setSeatCount] = useState(1);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";



  useEffect(() => {
    fetch(`${API_URL}/transports/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTransport(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader message="Configuring secure checkout portal..." />;
  if (!transport) return <div className="text-center py-20 font-bold">Transport Details Not Found.</div>;

  const totalPrice = transport.price * seatCount;

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    
    // পেমেন্ট পেজে পাঠানোর জন্য বুকিং ডাটা অবজেক্ট তৈরি
    const checkoutPayload = {
      transportId: transport._id,
      vehicleName: transport.name,
      transportType: transport.category,
      route: `${transport.from} → ${transport.to}`,
      date: "2026-06-08", // আপনার স্টেট বা প্রজেক্ট অনুযায়ী ডাইনামিক করতে পারেন
      seats: seatCount,
      price: totalPrice,
      email: user?.email || "guest@gmail.com"
    };

    // স্টেট হিসেবে পেমেন্ট পেজে ডাটা পাস করা
    navigate("/payment", { state: checkoutPayload });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Ticket Summary Summary */}
        <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl space-y-4">
          <span className="bg-blue-50 text-blue-600 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-md">
            Reservation Node
          </span>
          <h2 className="text-2xl font-black text-gray-800">{transport.name}</h2>
          <p className="text-sm font-bold text-gray-500">{transport.from} → {transport.to}</p>
          
          <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-4 text-xs font-semibold text-gray-400">
            <div>Type: <span className="text-gray-700 font-bold block mt-1">{transport.type}</span></div>
            <div>Time: <span className="text-gray-700 font-bold block mt-1">{transport.time}</span></div>
          </div>

          <div className="bg-green-50/50 border border-green-100 p-4 rounded-2xl flex justify-between items-center">
            <span className="text-xs font-bold text-green-700 uppercase">Available Tickets</span>
            <span className="font-mono font-black text-green-600">{transport.availableSeats} Left</span>
          </div>
        </div>

        {/* Dynamic Quantity & Billing Control */}
        <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-xl flex flex-col justify-between">
          <form onSubmit={handleProceedToPayment} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                Select Ticket Quantity
              </label>
              <select
                value={seatCount}
                onChange={(e) => setSeatCount(parseInt(e.target.value))}
                className="w-full bg-gray-50 p-3.5 rounded-xl border font-bold text-gray-700 outline-none cursor-pointer"
              >
                {[...Array(Math.min(transport.availableSeats, 4)).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1} {transport.category === "launch" ? "Cabin" : "Seat"}(s)
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t border-dashed pt-4 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-400">
                <span>Base Fare</span>
                <span>৳{transport.price}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-800 pt-1">
                <span>Total Payable</span>
                <span className="text-blue-600">৳{totalPrice}</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 text-sm group">
              Proceed to Payment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Checkout;