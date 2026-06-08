import { Plane, Search, ArrowLeftRight, Calendar, Users } from "lucide-react";

const PlaneTickets = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
            <Plane className="w-8 h-8 text-indigo-600" /> Flight Ticket Booking
          </h1>
          <p className="text-gray-500 mt-2">Book domestic and international flights at lowest prices</p>
        </div>

        {/* Search Box */}
        <div className="w-full bg-white rounded-[40px] shadow-2xl border border-gray-100 p-2">
          <form className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 items-center" onSubmit={(e) => e.preventDefault()}>
            
            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Flying From</label>
              <select className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer">
                <option>Select Airport</option>
                <option>Dhaka (DAC)</option>
                <option>Cox's Bazar (CXB)</option>
                <option>Sylhet (ZYL)</option>
              </select>
            </div>

            <div className="hidden md:flex md:col-span-1 justify-center -mx-4 z-10">
              <div className="bg-white p-2.5 rounded-full border border-gray-100 text-gray-400 shadow-sm">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>

            <div className="md:col-span-3 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase">Flying To</label>
              <select className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer">
                <option>Select Airport</option>
                <option>Cox's Bazar (CXB)</option>
                <option>Dhaka (DAC)</option>
                <option>Chittagong (CGP)</option>
              </select>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1"><Calendar className="w-4 h-4" /> Depart Date</label>
              <input type="date" className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer" defaultValue="2026-06-08" />
            </div>

            <div className="md:col-span-2 bg-gray-50 p-4 rounded-3xl border border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1"><Users className="w-4 h-4" /> Travel Class</label>
              <select className="w-full bg-transparent font-bold text-gray-700 outline-none mt-1 text-sm cursor-pointer">
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>

            <div className="md:col-span-1 flex justify-center">
              <button type="submit" className="w-16 h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl flex items-center justify-center shadow-lg transition-transform active:scale-90">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>

          <div className="px-6 py-4 bg-gray-50/30 rounded-b-[40px] text-[11px] flex flex-wrap items-center gap-3">
            <span className="font-bold text-gray-400 uppercase">Top Search:</span>
            {["Dhaka → Cox's Bazar", "Dhaka → Sylhet"].map((route, i) => (
              <span key={i} className="bg-white border border-gray-100 px-3 py-1.5 rounded-full text-gray-600 font-semibold cursor-pointer hover:text-indigo-600 transition shadow-sm">{route}</span>
            ))}
          </div>
        </div>

        <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-100 text-center text-gray-400 font-medium shadow-sm">
          Available Flights (Biman, US-Bangla, Air Astra) will be loaded here...
        </div>

      </div>
    </div>
  );
};

export default PlaneTickets;