// lucide-react এ সোশ্যাল আইকনগুলোর সঠিক নাম নিচে দেওয়া হলো
import { ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-gray-400 pt-16 pb-8 border-t border-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-2xl text-white tracking-tight">
              TICKET<span className="text-red-500">BARI</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Book bus, train, launch & flight tickets easily online in Bangladesh. Compare top operators, choose seats, and enjoy a secure, reliable travel experience.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">TicketBari</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/all-tickets" className="hover:text-white transition">Popular Routes</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/services/bus" className="hover:text-white transition">Bus Tickets</a></li>
              <li><a href="/services/train" className="hover:text-white transition">Train Tickets</a></li>
              <li><a href="/services/launch" className="hover:text-white transition">Launch Tickets</a></li>
              <li><a href="/services/plane" className="hover:text-white transition">Flight Tickets</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div className="space-y-5">
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Notice</a></li>
                <li><a href="#" className="hover:text-white transition">Cancellation Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Follow Us</h4>
              {/* এসভিজি (SVG) দিয়ে সোশ্যাল আইকনগুলো রেন্ডার করা হলো যাতে lucide-এর ভার্সন ভেদে কোনো এরর না আসে */}
              <div className="flex gap-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition">
                  <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.498-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Section: We Accept (Payment Logos) */}
        <div className="border-t border-gray-800 py-8 text-center space-y-4">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Payment Gateways Accepted
          </p>
          <div className="flex flex-wrap justify-center gap-3 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <img src="https://www.logo.zone/logos/visa/visa-ar21.svg" alt="Visa" className="h-8 bg-white px-2 py-1 rounded" />
            <img src="https://www.logo.zone/logos/mastercard/mastercard-ar21.svg" alt="Mastercard" className="h-8 bg-white px-2 py-1 rounded" />
            <img src="https://placehold.co/80x30?text=bKash" alt="bKash" className="h-8 bg-white px-2 py-1 rounded" />
            <img src="https://placehold.co/80x30?text=Nagad" alt="Nagad" className="h-8 bg-white px-2 py-1 rounded" />
            <img src="https://placehold.co/80x30?text=Rocket" alt="Rocket" className="h-8 bg-white px-2 py-1 rounded" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-6 text-center text-xs text-gray-600">
          <p>© {new Date().getFullYear()} TicketBari. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;