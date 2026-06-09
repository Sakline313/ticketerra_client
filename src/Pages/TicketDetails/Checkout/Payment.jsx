import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Phone, Lock, CreditCard } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const Payment = () => {
  const { state: bookingData } = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("bkash"); // ডিফল্ট bkash
  const [walletNumber, setWalletNumber] = useState("");
  const [pin, setPin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bookingData) return <div className="text-center py-20 font-bold">No payment node initialized.</div>;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (walletNumber.length < 11) return alert("Please enter a valid 11-digit wallet number.");
    if (pin.length < 4) return alert("Security PIN must be valid.");

    setIsProcessing(true);

    // ডাটাবেজে বুকিং সেভ এবং সিট কমানোর জন্য POST API কল
   fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsProcessing(false);
        if (data.success) {
          navigate("/payment-success");
        } else {
          alert(data.message || "Payment node handshaking failed.");
        }
      })
      .catch((err) => {
        setIsProcessing(false);
        console.error("Payment registration anomaly:", err);
      });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-[32px] overflow-hidden shadow-2xl border border-gray-100">
        
        {/* Gateway Brand Selector Header */}
        <div className={`p-6 text-center text-white transition-colors duration-300 ${paymentMethod === 'bkash' ? 'bg-pink-600' : 'bg-orange-600'}`}>
          <h2 className="text-xl font-black uppercase tracking-wider flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-5 h-5" /> Secured Payment
          </h2>
          <p className="text-xs text-white/80 mt-1">TicketBari Gateway Node v2.6</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Method Switching Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button" 
              onClick={() => setPaymentMethod("bkash")}
              className={`p-3 rounded-2xl border font-bold text-xs transition flex items-center justify-center gap-2 ${paymentMethod === "bkash" ? "bg-pink-50 border-pink-500 text-pink-600" : "bg-gray-50 border-gray-100 text-gray-500"}`}
            >
              <div className="w-2 h-2 bg-pink-600 rounded-full animate-ping" /> bKash Wallet
            </button>
            <button 
              type="button" 
              onClick={() => setPaymentMethod("nagad")}
              className={`p-3 rounded-2xl border font-bold text-xs transition flex items-center justify-center gap-2 ${paymentMethod === "nagad" ? "bg-orange-50 border-orange-500 text-orange-600" : "bg-gray-50 border-gray-100 text-gray-500"}`}
            >
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-ping" /> Nagad Wallet
            </button>
          </div>

          {/* Ticket Specs Breakdown */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs font-semibold text-gray-500 space-y-1.5">
            <div className="flex justify-between"><span>Transit Vehicle:</span><b className="text-gray-800">{bookingData.vehicleName}</b></div>
            <div className="flex justify-between"><span>Seats Locked:</span><b className="text-red-500 font-mono">{bookingData.seats} Node(s)</b></div>
            <div className="flex justify-between border-t border-dashed pt-2 text-sm font-black text-gray-800">
              <span>Amount Due:</span>
              <span className={paymentMethod === 'bkash' ? 'text-pink-600' : 'text-orange-600'}>৳{bookingData.price}</span>
            </div>
          </div>

          {/* Secure Interactive Core Form */}
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Mobile Wallet Number</label>
              <input 
                type="number" 
                placeholder="017XXXXXXXX"
                value={walletNumber}
                onChange={(e) => setWalletNumber(e.target.value)}
                required
                className="w-full bg-gray-50 p-3.5 border rounded-xl outline-none font-bold text-gray-700 text-sm focus:bg-white transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Account Security PIN</label>
              <input 
                type="password" 
                placeholder="••••"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
                className="w-full bg-gray-50 p-3.5 border rounded-xl outline-none font-mono font-black text-gray-700 text-sm focus:bg-white tracking-widest transition"
              />
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full text-white font-black py-4 rounded-2xl text-sm shadow-xl transition active:scale-95 flex items-center justify-center gap-2 ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : paymentMethod === 'bkash' ? 'bg-pink-600 hover:bg-pink-700' : 'bg-orange-600 hover:bg-orange-700'}`}
            >
              {isProcessing ? "Transacting Node Funds..." : `Confirm & Pay ৳${bookingData.price}`}
            </button>
          </form>

          <p className="text-[10px] text-center text-gray-400 font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
            <CreditCard className="w-3 h-3" /> End-to-End SSL Encryption Verified
          </p>
        </div>

      </div>
    </div>
  );
};

export default Payment;