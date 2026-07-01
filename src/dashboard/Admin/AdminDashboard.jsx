import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Ticket, DollarSign, LogOut, ShieldAlert, Bus, Train, Ship } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalBookings: 0, totalUsers: 0, totalRevenue: 0, busTickets: 0, trainTickets: 0, launchTickets: 0 });
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // এখানে API_URL ডিক্লেয়ার করা হয়েছে
  const API_URL = "https://server-project11.vercel.app"; 

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      
      // সংশোধিত Fetch: localhost এর পরিবর্তে API_URL ব্যবহার করা হয়েছে
      fetch(`${API_URL}/admin/stats?email=${user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Forbidden Access! Admins Only.");
          return res.json();
        })
        .then((data) => {
          if (data && !data.message) setStats(data);
        })
        .catch((err) => setError(err.message));

      fetch(`${API_URL}/admin/bookings?email=${user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Forbidden Access! Admins Only.");
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data)) setBookings(data);
          else setBookings([]);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-3xl max-w-md shadow-2xl space-y-4">
          <h2 className="text-xl font-black">Authentication Required</h2>
          <p className="text-gray-400 text-sm">Please sign in with an active Admin account to monitor the live database logs.</p>
          <Link to="/login" className="block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition text-sm">Go to Login Page</Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-3xl max-w-md shadow-2xl space-y-4">
          <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto"><ShieldAlert className="w-10 h-10" /></div>
          <h2 className="text-2xl font-black">Access Denied</h2>
          <p className="text-gray-400 text-sm">{error}</p>
          <Link to="/" className="block w-full bg-white text-slate-950 font-bold py-3 rounded-xl hover:bg-gray-200 transition text-sm">Back to Home</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-500"></div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compiling Analytics...</p>
        </div>
      </div>
    );
  }

  // ট্রান্সপোর্ট অনুযায়ী আইকন ঠিক করার ফাংশন
  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'bus': return <Bus className="w-4 h-4 text-orange-500" />;
      case 'train': return <Train className="w-4 h-4 text-blue-500" />;
      case 'launch': return <Ship className="w-4 h-4 text-cyan-500" />;
      default: return <Ticket className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR */}
      <div className="w-66 bg-slate-950 text-white p-6 flex flex-col justify-between hidden md:flex border-r border-white/5">
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center font-black text-sm text-white">T</div>
            <h2 className="text-xl font-black tracking-widest">TICKET<span className="text-red-500">BARI</span></h2>
          </div>
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 bg-red-500 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-lg"><LayoutDashboard className="w-4 h-4" /> Dashboard</button>
            <button className="w-full flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl font-semibold text-sm transition"><Ticket className="w-4 h-4" /> Bookings</button>
            <button className="w-full flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl font-semibold text-sm transition"><Users className="w-4 h-4" /> Users Matrix</button>
          </nav>
        </div>
        <button onClick={() => logOut().then(() => navigate("/"))} className="flex items-center gap-3 text-slate-400 hover:text-red-400 font-bold text-sm transition py-3 px-4 rounded-xl"><LogOut className="w-4 h-4" /> Exit Panel</button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back, Admin</h1>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Logged in as: {user?.email}</p>
          </div>
        </div>

        {/* 📊 TOP OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Revenue</p>
              <h3 className="text-3xl font-black text-slate-900">৳{stats.totalRevenue}</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center"><DollarSign className="w-5 h-5" /></div>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Tickets Sold</p>
              <h3 className="text-3xl font-black text-slate-900">{stats.totalBookings}</h3>
            </div>
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center"><Ticket className="w-5 h-5" /></div>
          </div>
          <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Users</p>
              <h3 className="text-3xl font-black text-slate-900">{stats.totalUsers}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center"><Users className="w-5 h-5" /></div>
          </div>
        </div>

        {/* 🚌 🚆 🚢 TRANSPORT VEHICLE MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-orange-50/50 border border-orange-100 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center"><Bus className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Bus Tickets</p>
              <h4 className="text-xl font-black text-slate-800">{stats.busTickets || 0}</h4>
            </div>
          </div>
          <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center"><Train className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Train Tickets</p>
              <h4 className="text-xl font-black text-slate-800">{stats.trainTickets || 0}</h4>
            </div>
          </div>
          <div className="p-5 bg-cyan-50/50 border border-cyan-100 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-cyan-500 text-white rounded-xl flex items-center justify-center"><Ship className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Launch Tickets</p>
              <h4 className="text-xl font-black text-slate-800">{stats.launchTickets || 0}</h4>
            </div>
          </div>
        </div>

        {/* 📄 LIVE MANIFEST TABLE */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-900">Live Ticket Manifest</h3>
            <p className="text-xs font-semibold text-slate-400">Realtime monitoring data logs from ticketBariDB cloud node.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase">
                  <th className="pb-4">User Email</th>
                  <th className="pb-4">Transit Vector</th>
                  <th className="pb-4">Route Node</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 text-sm font-medium">
                {Array.isArray(bookings) && bookings.length > 0 ? (
                  bookings.map((booking, idx) => (
                    <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                      <td className="py-4 font-semibold text-slate-800">{booking.email}</td>
                      <td className="py-4 capitalize">
                        <div className="flex items-center gap-2 bg-slate-100 w-fit px-2.5 py-1 rounded-md text-xs font-bold">
                          {getTransportIcon(booking.transportType)}
                          <span>{booking.transportType || "Ticket"}</span>
                        </div>
                      </td>
                      <td className="py-4 font-mono text-xs text-slate-500">{booking.route || "Global Route"}</td>
                      <td className="py-4 font-bold text-slate-900">৳{booking.price || "0"}</td>
                      <td className="py-4"><span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-black">Approved</span></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="py-12 text-center text-slate-400">✨ No active ticket sales logged on cloud server.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;