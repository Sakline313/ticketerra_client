import { useNavigate } from "react-router-dom";
import { Bus, Ship, Plane, Train } from "lucide-react";
// import WhyChoose from "../../Components/WhyChoose/WhyChoose"; // আপনার স্ট্রাকচার অনুযায়ী সঠিক পাথ
import About from "../../Components/About/About";
import Contact from "../../Components/Contact/Contact";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 🌌 Hero Banner Section */}
      <div className="relative h-[500px] bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070')] bg-cover bg-center flex flex-col items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Ticket <span className="text-red-500">Bari</span>
          </h1>
          <p className="text-lg text-gray-200 font-medium mb-8">
            Select your preferred transport type below to book tickets instantly.
          </p>

          {/* 🚀 ৪টি অপশনের ক্লিন বাটন মেনু */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 bg-white/10 backdrop-blur-md p-5 rounded-3xl max-w-4xl mx-auto border border-white/20 shadow-xl">
            
            {/* Bus Option */}
            <button 
              onClick={() => navigate("/services/bus")} 
              className="flex items-center gap-2.5 bg-white hover:bg-red-50 text-gray-800 hover:text-red-500 px-7 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md active:scale-95 text-sm"
            >
              <Bus className="w-5 h-5 text-red-500" /> Bus
            </button>

            {/* 🚆 Train Option */}
            <button 
              onClick={() => navigate("/services/train")} 
              className="flex items-center gap-2.5 bg-white hover:bg-green-50 text-gray-800 hover:text-green-600 px-7 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md active:scale-95 text-sm"
            >
              <Train className="w-5 h-5 text-green-600" /> Train
            </button>

            {/* Launch Option */}
            <button 
              onClick={() => navigate("/services/launch")} 
              className="flex items-center gap-2.5 bg-white hover:bg-blue-50 text-gray-800 hover:text-blue-500 px-7 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md active:scale-95 text-sm"
            >
              <Ship className="w-5 h-5 text-blue-500" /> Launch
            </button>

            {/* Flight Option */}
            <button 
              onClick={() => navigate("/services/plane")} 
              className="flex items-center gap-2.5 bg-white hover:bg-indigo-50 text-gray-800 hover:text-indigo-600 px-7 py-4 rounded-2xl font-bold transition-all duration-300 shadow-md active:scale-95 text-sm"
            >
              <Plane className="w-5 h-5 text-indigo-600" /> Flight
            </button>

          </div>
        </div>
      </div>

      <About></About>
      <Contact></Contact>
     

    </div>
  );
};

export default Home;