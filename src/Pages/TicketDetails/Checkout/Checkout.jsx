import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Anchor, Calendar, Users, DollarSign, ArrowRight, CreditCard, X, CheckCircle, Ticket } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../Components/Loader/Loader.jsx";

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [transport, setTransport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seatCount, setSeatCount] = useState(1);
  
  // 🎯 পপআপ মোডাল এবং পেমেন্ট প্রসেসিং স্টেটসমূহ
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

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

  // বাটনে ক্লিক করলে এখন পেজ চেঞ্জ না হয়ে পপআপ ওপেন হবে
  const handleOpenPaymentModal = (e) => {
    e.preventDefault();
    setIsPaymentModalOpen(true);
  };

  // পপআপের ভেতর ফাইনাল পেমেন্ট সাবমিট হ্যান্ডলার
  const handlePaymentSubmit = () => {
    if (!paymentMethod) return alert("Please select a payment method!");
    
    setIsProcessing(true);

    const bookingInfo = {
      transportId: transport._id,
      email: user?.email || "guest@gmail.com",
      transportType: transport.category,
      route: `${transport.from} → ${transport.to}`,
      price: totalPrice,
      date: "2026-06-08", 
      vehicleName: transport.name,
      seats: `${seatCount} Ticket(s)`,
      totalPassengers: seatCount
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
          setBookingSuccess(true); // সাকসেস স্টেট ট্রু হলে পপআপের ভেতরের ডিজাইন চেঞ্জ হবে
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
    <div className="min-h-screen bg-gray-50 py-12 relative">
      
      {/* 🎯 ১. মেইন পেমেন্ট এবং গেটওয়ে পপআপ মোডাল */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-6 max-w-md w-full space-y-5 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            
            {/* ক্লোজ বাটন */}
            <button 
              onClick={() => { setIsPaymentModalOpen(false); setBookingSuccess(false); setPaymentMethod(""); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            {!bookingSuccess ? (
              <>
                {/* পেমেন্ট ইন্টারফেস কন্টেন্ট */}
                <div className="flex items-center gap-2 border-b pb-3">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  <h3 className="text-base font-bold text-gray-800">Complete Your Payment</h3>
                </div>

                {/* সামারি কার্ড */}
                <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border text-xs font-semibold text-gray-600">
                  <div className="flex justify-between"><span>Operator:</span> <span className="text-gray-900 font-bold">{transport.name}</span></div>
                  <div className="flex justify-between"><span>Route:</span> <span className="text-gray-900">{transport.from} → {transport.to}</span></div>
                  <div className="flex justify-between"><span>Quantity:</span> <span className="text-gray-900 font-mono font-bold">{seatCount} Ticket(s)</span></div>
                  <div className="flex justify-between border-t pt-2 font-bold text-sm text-gray-900">
                    <span>Total Cost:</span> <span className="text-blue-600">৳{totalPrice}</span>
                  </div>
                </div>

                {/* গেটওয়ে সিলেকশন */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Gateway</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["bkash", "nagad", "rocket"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`p-2.5 border rounded-xl text-xs font-bold capitalize transition-all duration-200 active:scale-95
                          ${paymentMethod === method ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-500" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* পে বাটন */}
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isProcessing}
                  className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50 text-xs active:scale-[0.98]"
                >
                  <CreditCard className="w-4 h-4" />
                  {isProcessing ? "Processing Escrow Securing..." : `Pay ৳${totalPrice} & Confirm Ticket`}
                </button>
              </>
            ) : (
              /* 🎯 ২. পেমেন্ট সাকসেসফুল হলে পপআপের ভেতরেই এই কন্টেন্টটি শো করবে */
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-black text-gray-800 tracking-tight">Payment Successful!</h2>
                  <p className="text-xs font-semibold text-gray-400 max-w-xs mx-auto">Your booking document has been logged into the cloud manifest node seamlessly.</p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Booking Verification:</span>
                  <span className="font-mono text-emerald-600 uppercase tracking-wide">TKB-LIVE-2026</span>
                </div>

                <div className="space-y-2 pt-2">
                  <Link to="/mytickets" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2">
                    <Ticket className="w-4 h-4" /> View My Booked Tickets
                  </Link>
                  <button 
                    onClick={() => { setIsPaymentModalOpen(false); setBookingSuccess(false); }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    Close & Keep Exploring
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* মূল স্ক্রিন কন্টেন্ট */}
      <div className="max-w-3xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Ticket Summary */}
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
          <form onSubmit={handleOpenPaymentModal} className="space-y-6">
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