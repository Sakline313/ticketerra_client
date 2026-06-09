import { useEffect, useState } from "react";
import { CreditCard, Calendar, ShieldCheck, AlertCircle, Trash2 } from "lucide-react";
import useAuth from "../../hooks/useAuth"; // লগইন ইউজারের ইমেইল ট্র্যাক করার জন্য

const MyTickets = () => {
  const { user } = useAuth();
  const [myTickets, setMyTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📡 ডাটাবেস থেকে ইউজারের নির্দিষ্ট টিকিটগুলো লোড করা
  useEffect(() => {
    const userEmail = user?.email || "guest@gmail.com";
    
    fetch(`http://localhost:5000/bookings?email=${userEmail}`)
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

  // 🗑️ টিকিট ক্যানসেল বা ডিলিট করার হ্যান্ডলার (অপশনাল)
  const handleCancelTicket = (id) => {
    if (window.confirm("Are you sure you want to cancel this ticket booking?")) {
      fetch(`http://localhost:5000/bookings/${id}`, {
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
                    <button onClick={() => handleCancelTicket(ticket._id)} className="text-gray-300 hover:text-red-500 transition p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
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