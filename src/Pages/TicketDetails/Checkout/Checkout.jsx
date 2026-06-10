import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CreditCard, X, CheckCircle, ArrowRight, Bus, MapPin, Calendar, Users } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../Components/Loader/Loader.jsx";

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [transport, setTransport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seatCount, setSeatCount] = useState(1);
  
  // পেমেন্ট এবং মোডাল স্টেট
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
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (!transport) return <div className="text-center mt-20 text-gray-500">Transport Details Not Found.</div>;

  const totalPrice = transport.price * seatCount;

  const handlePaymentSubmit = () => {
    if (!paymentMethod) return alert("Please select a payment method!");

    setIsProcessing(true);
    const bookingInfo = {
      transportId: transport._id,
      email: user?.email || "guest@gmail.com",
      transportType: transport.category,
      route: `${transport.from || "Dhaka"} → ${transport.to || "Destination"}`,
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
          setBookingSuccess(true);
        } else {
          alert(data.message || "Booking failed.");
        }
      })
      .catch((err) => {
        console.error("Booking error:", err);
        setIsProcessing(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      
      {/* 🎯 পেমেন্ট মোডাল */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-6 max-w-md w-full shadow-2xl relative border border-gray-100">
            <button 
              onClick={() => { setIsPaymentModalOpen(false); setBookingSuccess(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-1.5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            {!bookingSuccess ? (
              <>
                <div className="flex items-center gap-2 border-b pb-3 mb-4">
                  <CreditCard className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-gray-800">Complete Your Payment</h3>
                </div>
                <div className="space-y-3 bg-gray-50 p-4 rounded-2xl text-xs font-semibold text-gray-600 mb-6">
                  <div className="flex justify-between"><span>Operator:</span> <span className="text-gray-900 font-bold">{transport.name}</span></div>
                  <div className="flex justify-between"><span>Total Cost:</span> <span className="text-red-600 font-bold">৳{totalPrice}</span></div>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Select Gateway</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["bkash", "nagad", "rocket"].map((m) => (
                      <button key={m} onClick={() => setPaymentMethod(m)} 
                        className={`p-2 border rounded-xl text-xs font-bold capitalize ${paymentMethod === m ? "border-red-500 bg-red-50 text-red-600" : "border-gray-200"}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={handlePaymentSubmit} disabled={isProcessing} className="w-full bg-red-500 text-white font-bold py-3.5 rounded-xl">
                  {isProcessing ? "Processing..." : `Pay ৳${totalPrice} & Confirm`}
                </button>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-lg font-black">Payment Successful!</h2>
                <Link to="/my-tickets" className="block w-full bg-gray-900 text-white font-bold py-3 rounded-xl text-xs">View My Tickets</Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* মেইন কন্টেন্ট */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-[40px] shadow-xl border border-gray-100">
        <h1 className="text-2xl font-black mb-6 flex items-center gap-2"><Bus className="text-red-500"/> Booking Checkout</h1>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-gray-50 p-6 rounded-3xl">
            <div>
              <h2 className="text-lg font-bold">{transport.name}</h2>
              <p className="text-xs text-gray-400 font-bold uppercase">{transport.type} • {transport.time}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400">Total Price</p>
              <p className="text-2xl font-black text-red-500">৳{totalPrice}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Number of Tickets</label>
            <select value={seatCount} onChange={(e) => setSeatCount(parseInt(e.target.value))} className="w-full p-4 bg-gray-50 rounded-2xl font-bold">
              {[...Array(Math.min(transport.availableSeats || 4, 4)).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>{n + 1} Seat(s)</option>
              ))}
            </select>
          </div>

          <button onClick={() => setIsPaymentModalOpen(true)} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
            Proceed to Payment <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;