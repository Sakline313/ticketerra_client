import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, Award } from "lucide-react";

const About = () => {
  // Configuration for scroll animations
  const fadeInVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden pt-6">
      
      {/* 🌌 Hero Section (Fade In from Bottom) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative py-24 bg-[#111111] text-white text-center px-4"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            About <span className="text-red-500">TicketBari</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Revolutionizing the way you travel across Bangladesh. One ticket at a time, making journeys simpler, faster, and secure.
          </p>
        </div>
      </motion.div>

      {/* 🚀 Our Story Section (Left & Right Entry) */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Content sliding in from Left */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideInLeft}
          className="space-y-6"
        >
          <span className="text-red-500 font-bold tracking-wider uppercase text-sm">Who We Are</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Your Trusted Partner For Modern Travel Booking
          </h2>
          <p className="text-gray-600 leading-relaxed text-base">
            TicketBari started with a simple mission—to digitize and simplify the ticket booking process across all major transport routes in Bangladesh. We bring bus, train, launch, and flight bookings under one roof to save your valuable time.
          </p>
          <p className="text-gray-600 leading-relaxed text-base">
            We believe in keeping things seamless. With our clean interface, you can compare seats from top operators and instantly secure your tickets without any hassle.
          </p>
        </motion.div>

        {/* Image sliding in from Right */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideInRight}
          className="relative h-[380px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
        >
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021" 
            alt="Travel Journey" 
            className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
          />
        </motion.div>

      </div>

      {/* ⚡ Core Features */}
      <div className="bg-white py-20 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Why We Stand Out</h2>
            <p className="text-gray-500 font-medium">We do not just sell tickets; we ensure your ultimate comfort and peace of mind on every journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInVariant}
              className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-6 font-bold group-hover:bg-red-500 group-hover:text-white transition-all">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Select your preferred seats and book your tickets in less than a minute without any complications.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInVariant}
              className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6 font-bold group-hover:bg-green-600 group-hover:text-white transition-all">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">100% Secure</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Enjoy completely safe, reliable, and encrypted payment options via bKash, Rocket, Nagad, or cards.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInVariant}
              className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-6 font-bold group-hover:bg-blue-500 group-hover:text-white transition-all">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Our dedicated support team is available around the clock to assist you with refunds, cancellations, or trip queries.</p>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInVariant}
              className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 font-bold group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">All Operators</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Compare and choose from the country's leading bus, launch, and airline operators on a single platform.</p>
            </motion.div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default About;