import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Ticket } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[36px] border border-gray-100 shadow-2xl p-8 text-center space-y-6">
        
        {/* Verified Verification Animation Checkmark */}
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 animate-bounce">
          <CheckCircle className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Payment Successful!</h2>
          <p className="text-sm font-semibold text-gray-400 max-w-xs mx-auto">Your booking document has been logged into the cloud manifest node seamlessly.</p>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Booking Verification:</span>
          <span className="font-mono text-emerald-600 uppercase tracking-wide">TKB-LIVE-2026</span>
        </div>

        {/* Dynamic Route Switching Buttons */}
        <div className="space-y-3 pt-2">
          <Link to="/mytickets" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl text-sm transition shadow-md flex items-center justify-center gap-2">
            <Ticket className="w-4 h-4" /> View My Booked Tickets
          </Link>
          <Link to="/" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-2xl text-xs transition flex items-center justify-center gap-1.5">
            Back to Dashboard Hub <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;