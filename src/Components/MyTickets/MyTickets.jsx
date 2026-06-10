import React, { useEffect, useState } from "react";
import { CreditCard, Calendar, ShieldCheck, AlertCircle, Trash2, Download } from "lucide-react";
import useAuth from "../../hooks/useAuth"; 

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyTickets = () => {
  const { user } = useAuth();
  const [myTickets, setMyTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📡 ডাটাবেস থেকে ইউজারের নির্দিষ্ট টিকিটগুলো লোড করা
  useEffect(() => {
    const userEmail = user?.email || "guest@gmail.com";
    
    fetch(`${API_URL}/bookings?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setMyTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading user tickets:", err);
        setLoading(false);
      });
  }, [user]);

  // 🗑️ টিকিট ক্যানসেল বা ডিলিট করার হ্যান্ডলার
  const handleCancelTicket = (id) => {
    if (window.confirm("Are you sure you want to cancel this ticket booking?")) {
      fetch(`${API_URL}/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Ticket canceled successfully!");
            setMyTickets(myTickets.filter((ticket) => ticket._id !== id));
          }
        });
    }
  };

  // 📥 ডাইনামিক PDF ডাউনলোড হ্যান্ডলার (প্রিন্ট লেআউট দিয়ে তৈরি)
  const handleDownloadPDF = (ticket) => {
    // একটি নতুন প্রিন্ট উইন্ডো তৈরি করা হচ্ছে
    const printWindow = window.open("", "_blank");
    
    const htmlContent = `
      <html>
        <head>
          <title>Ticket-${ticket._id || 'Receipt'}</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; padding: 40px; background-color: #fff; }
            .ticket-box { max-w: 600px; margin: 0 auto; border: 2px dashed #e2e8f0; padding: 30px; rounded: 16px; background: #fff; position: relative; }
            .header { text-align: center; border-bottom: 2px solid #ef4444; padding-bottom: 15px; margin-bottom: 25px; }
            .header h1 { margin: 0; color: #ef4444; font-size: 28px; text-transform: uppercase; letter-spacing: 1px; }
            .header p { margin: 5px 0 0 0; color: #64748b; font-size: 12px; font-weight: bold; }
            .badge { display: inline-block; background: #fef2f2; color: #ef4444; padding: 4px 10px; font-size: 10px; font-weight: bold; border-radius: 4px; text-transform: uppercase; margin-bottom: 15px; }
            .title { font-size: 20px; font-weight: bold; margin: 0; color: #1e293b; }
            .route { font-size: 14px; color: #475569; margin: 5px 0 20px 0; font-weight: 600; }
            .info-grid { display: grid; grid-cols: 2; display: flex; justify-content: space-between; border-top: 1px solid #f1f5f9; border-b: 1px solid #f1f5f9; py: 15px; padding: 15px 0; margin-bottom: 20px; }
            .info-item { font-size: 13px; color: #64748b; }
            .info-item b { color: #0f172a; display: block; margin-top: 4px; font-size: 14px; }
            .footer { display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 12px 20px; margin-top: 20px; border-radius: 8px; }
            .status { color: #10b981; font-weight: bold; font-size: 12px; text-transform: uppercase; display: flex; align-items: center; }
            .price { font-size: 18px; font-weight: 900; color: #1e293b; margin: 0; }
            .verification { text-align: center; font-size: 10px; color: #94a3b8; font-family: monospace; margin-top: 25px; }
            @media print {
              body { padding: 0; }
              .ticket-box { border: 2px dashed #000; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="ticket-box">
            <div class="header">
              <h1>Ticket Bari</h1>
              <p>Online Digital Transport Ticket Manifest</p>
            </div>
            
            <div class="badge">${ticket.transportType} Official Node</div>
            <div class="title">${ticket.vehicleName}</div>
            <div class="route">${ticket.route}</div>
            
            <div class="info-grid">
              <div class="info-item">Journey Date: <b>${ticket.date}</b></div>
              <div class="info-item" style="text-align: right;">Seats Allocated: <b style="color: #ef4444; font-family: monospace;">${ticket.seats}</b></div>
            </div>
            
            <div class="footer">
              <div class="status">✓ Paid & Verified</div>
              <div class="price">৳${ticket.price}</div>
            </div>
            
            <div class="verification">
              Verification Node hash: TKB-LIVE-2026-${ticket._id?.substring(0, 8).toUpperCase()}
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-800">My Booked Tickets</h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Live Manifest of your reserved nodes</p>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="text-center py-12 text-sm font-bold text-gray-400 animate-pulse">
            Fetching active transport bookings...
          </div>
        )}

        {/* EMPTY BOOKINGS STATE */}
        {!loading && myTickets.length === 0 && (
          <div className="bg-white rounded-3xl border p-12 text-center max-w-md mx-auto space-y-3 shadow-sm">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-bold text-gray-700">No Tickets Found!</h3>
            <p className="text-xs text-gray-400">You haven't booked any bus, train, or launch tickets yet using this account email node.</p>
          </div>
        )}

        {/* 🎟️ TICKETS GRID / LIST */}
        {!loading && myTickets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myTickets.map((ticket) => (
              <div key={ticket._id} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden">
                
                {/* Upper Section */}
                <div>
                  <div className="flex justify-between items-start">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      ticket.transportType === 'bus' ? 'bg-red-50 text-red-600' :
                      ticket.transportType === 'train' ? 'bg-blue-50 text-blue-600' : 'bg-cyan-50 text-cyan-600'
                    }`}>
                      {ticket.transportType} Document
                    </span>
                    
                    {/* অ্যাকশন বাটনস (ডাউনলোড এবং ক্যানসেল) */}
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleDownloadPDF(ticket)} 
                        title="Download Ticket PDF"
                        className="text-gray-400 hover:text-slate-900 transition p-1.5 hover:bg-gray-100 rounded-full"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleCancelTicket(ticket._id)} 
                        title="Cancel Booking"
                        className="text-gray-300 hover:text-red-500 transition p-1.5 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-gray-800 mt-3">{ticket.vehicleName}</h3>
                  <p className="text-xs font-bold text-gray-600 mt-1">{ticket.route}</p>
                  
                  <div className="mt-4 space-y-1.5 border-t border-b border-gray-50 py-3 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-400" /> Date: <b className="text-gray-700">{ticket.date}</b></div>
                    <div className="flex items-center gap-1.5">Seats: <b className="text-red-500 font-mono tracking-wide">{ticket.seats}</b></div>
                  </div>
                </div>

                {/* Lower Section / Price Badge */}
                <div className="mt-4 flex justify-between items-center bg-gray-50 -mx-5 -mb-5 px-5 py-3 rounded-b-3xl">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" /> Paid Verified
                  </div>
                  <h4 className="text-base font-black text-gray-800">৳{ticket.price}</h4>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyTickets;