import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Menu, X, Bus, ChevronDown } from 'lucide-react'; 
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); 

  const handleLogout = () => {
    logoutUser().catch(err => console.log(err));
  };

  const navStyle =
  "relative font-semibold text-gray-700 transition-all duration-300 hover:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-600 after:to-red-500 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="font-extrabold text-2xl flex items-center gap-1.5 text-blue-700 tracking-tight hover:scale-105 transition-all duration-300">
            <span className="md:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition" onClick={() => setOpen(!open)}>
              {open ? <X className="w-6 h-6 text-blue-700" /> : <Menu className="w-6 h-6 text-blue-700" />}
            </span>
            <RouterLink to="/" className="relative font-semibold text-gray-700 transition-all duration-300 hover:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-600 after:to-red-500 after:transition-all after:duration-300 hover:after:w-full">
              <Bus className="w-7 h-7 text-red-500 transform -rotate-6 group-hover:rotate-6 transition-all duration-500" /> TICKET<span className="text-red-500">BARI</span>
            </RouterLink>
          </div>

          {/* Navigation Links */}
          <ul className={`absolute md:static bg-white md:bg-transparent shadow-xl md:shadow-none p-6 md:p-0 rounded-2xl md:flex gap-6 items-center border border-gray-100 md:border-none transition-all duration-300
            ${open ? 'top-20 left-4 right-4 block z-50' : '-top-[500px] left-4 right-4 pointer-events-none md:pointer-events-auto hidden md:flex'}`}>
            
            <li>
              <RouterLink to="/" onClick={() => setOpen(false)} className={navStyle}>Home</RouterLink>
            </li>
            
            {/* 🚀 Root Option: Services Dropdown */}
            <div className="relative">
           <button
  onClick={() => setServicesOpen(!servicesOpen)}
  className="flex items-center gap-1 font-semibold text-gray-700 hover:text-blue-700 transition-all duration-300 hover:scale-105">
  Services
  <ChevronDown
    className={`w-4 h-4 transition-all duration-500 ${
      servicesOpen ? "rotate-180" : ""
    }`}
  />
</button>
              
              {servicesOpen && (
                <div className="absolute left-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                  <RouterLink to="/services/bus" onClick={() => { setServicesOpen(false); setOpen(false); }} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">Bus Tickets</RouterLink>
                  <RouterLink to="/services/train" onClick={() => { setServicesOpen(false); setOpen(false); }} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">Train Tickets</RouterLink>
                  <RouterLink to="/services/launch" onClick={() => { setServicesOpen(false); setOpen(false); }} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">Launch Tickets</RouterLink>
                  <RouterLink to="/services/plane" onClick={() => { setServicesOpen(false); setOpen(false); }} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">Plane Tickets</RouterLink>
                </div>
              )}
            </div>
            
            {/* 🚀 Separate Component Links */}
            <li><RouterLink to="/about" onClick={() => setOpen(false)} className={navStyle}>About</RouterLink></li>
       <li><RouterLink to="/my-tickets" onClick={() => setOpen(false)} className={navStyle}>My Tickets</RouterLink></li>

{/* ✅ শুধু admin দেখতে পাবে */}
{user?.email === "admin@gmail.com" && (
  <li><RouterLink to="/admin-dashboard" onClick={() => setOpen(false)} className={navStyle}>Dashboard</RouterLink></li>
)}

<li><RouterLink to="/contact" onClick={() => setOpen(false)} className={navStyle}>Contact Us</RouterLink></li>
          </ul>

          {/* User Profile / Sign In Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <div className="flex items-center gap-2.5 cursor-pointer select-none bg-gray-50 p-1.5 pr-4 rounded-full hover:bg-gray-100 transition" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <img src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"} alt="User" className="w-9 h-9 rounded-full border border-blue-200 object-cover" />
                  <span className="hidden md:inline font-semibold text-sm text-gray-700">{user?.displayName?.split(' ')[0]}</span>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2.5 z-50">
                    <button onClick={() => { setDropdownOpen(false); handleLogout(); }} className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-95">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <RouterLink to="/login">
                <button className="bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all duration-300 hover:bg-red-500 shadow-sm active:scale-95 text-sm">
                  Sign In
                </button>
              </RouterLink>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;