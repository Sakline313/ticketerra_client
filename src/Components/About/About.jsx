import { motion } from "framer-motion";
import { Star, ShieldCheck, Anchor, Compass, ArrowUpRight, Award } from "lucide-react";

const About = () => {
  // Container এনিমেশন (ভিতরের সব চাইল্ড একটা একটা করে সিকোয়েন্সে আসবে)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  // উপাদানগুলোর নিচ থেকে উপরে ওঠার স্মুথ ইফেক্ট
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 20 },
    },
  };

  // ইমেজের জন্য প্রিমিয়াম স্কেল ও ডিরেকশন ইফেক্ট
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative min-h-screen bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* ✨ Premium Abstract Background Elements */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-32">
        
        {/* 🗺️ SECTION 1: JOURNEY & HERO INTRO */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
        >
          
          {/* Left: Interactive Modern Stats Card */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4 bg-white/70 backdrop-blur-md border border-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] space-y-6 relative group"
          >
            <div className="absolute top-6 right-6 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-xs font-black text-red-500 uppercase tracking-[0.2em] block">• Premium Experience</span>
            
            <div className="space-y-2">
              <div className="flex items-baseline text-7xl font-black text-slate-900 tracking-tight">
                4.8<span className="text-red-500 text-5xl">/</span>5
              </div>
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </motion.div>
                ))}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-1">Global Client Satisfaction</p>
            </div>

            {/* Separator Line */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            
            {/* Live Users Grid */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex -space-x-3 overflow-hidden">
                <img className="inline-block h-11 w-11 rounded-full ring-4 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" alt="User" />
                <img className="inline-block h-11 w-11 rounded-full ring-4 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" alt="User" />
                <img className="inline-block h-11 w-11 rounded-full ring-4 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" alt="User" />
                <div className="flex items-center justify-center h-11 w-11 rounded-full bg-slate-900 text-white text-xs font-black ring-4 ring-white">+2k</div>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">Active Voyagers</span>
            </div>
          </motion.div>

          {/* Right: Typography and Luxury Image Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-[0.3em] block">// IDENTITY</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight">
                Your Journey, Our <br />
                <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">Passion For Sailing</span>
              </h2>
              
              {/* Dual Floating Premium Images */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <motion.div 
                  variants={imageVariants}
                  whileHover={{ y: -8, rotate: -1, scale: 1.02 }}
                  className="rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden h-52 border border-white"
                >
                  <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=600" className="h-full w-full object-cover transition duration-700 hover:scale-110" alt="Yacht" />
                </motion.div>
                <motion.div 
                  variants={imageVariants}
                  whileHover={{ y: -8, rotate: 1, scale: 1.02 }}
                  className="rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden h-52 border border-white md:mt-6"
                >
                  <img src="https://images.unsplash.com/photo-1505242844905-ac2413fd4740?q=80&w=600" className="h-full w-full object-cover transition duration-700 hover:scale-110" alt="Ocean" />
                </motion.div>
              </div>
            </motion.div>

            {/* Paragraph Text and Custom Button */}
            <motion.div variants={itemVariants} className="space-y-8 md:pl-4">
              <p className="text-slate-500 leading-relaxed text-base font-medium">
                We design and execute unparalleled luxury transit protocols. From navigating high-end oceanic cruise paths to monitoring state-of-the-art intercity smart terminals, Ticket Bari guarantees automated booking flows backed by premium hospitality matrices.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 20px 30px rgba(239, 68, 68, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="group bg-slate-900 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-4 shadow-xl transition-all duration-300 cursor-pointer text-sm tracking-wider"
              >
                <span>EXPLORE MEMBERSHIP</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.button>
            </motion.div>
          </div>

        </motion.div>

        {/* 🛥️ SECTION 2: LUXURY SERVICES GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start pt-20 border-t border-slate-200/60"
        >
          {/* Header Description Left */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6 lg:sticky lg:top-10">
            <span className="text-xs font-extrabold text-red-500 uppercase tracking-[0.3em] block">• WORLDFLEET SERVICES</span>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              Experience Premium Yacht Club Membership And <br />
              <span className="font-medium text-slate-400 italic">Luxury Travel Architecture.</span>
            </h3>
            <p className="text-slate-400 text-sm font-semibold">Every route is integrated with high-tier security checkpoints and automated reservation logs.</p>
          </motion.div>

          {/* Cards Flex Grid Right */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Card 1: Rental Architecture */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.05)" }}
              className="p-8 bg-white rounded-[2.5rem] border border-slate-100 space-y-6 transition-all duration-300 relative group overflow-hidden shadow-sm"
            >
              <div className="absolute -right-6 -bottom-6 text-slate-50 opacity-5 group-hover:scale-120 transition-transform duration-500"><Anchor className="w-40 h-40" /></div>
              <div className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-red-500 shadow-md">
                <Anchor className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-black text-slate-900 group-hover:text-red-500 transition-colors">Elite Fleet Provision</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">Curated access to premium marine architectures and bullet-liners globally with verified processing node integrations.</p>
              </div>
            </motion.div>

            {/* Card 2: Strategic Routing */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.05)" }}
              className="p-8 bg-white rounded-[2.5rem] border border-slate-100 space-y-6 transition-all duration-300 relative group overflow-hidden shadow-sm"
            >
              <div className="absolute -right-6 -bottom-6 text-slate-50 opacity-5 group-hover:scale-120 transition-transform duration-500"><Compass className="w-40 h-40" /></div>
              <div className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-red-500 shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-black text-slate-900 group-hover:text-red-500 transition-colors">Global Navigation Layer</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">Continuous telemetry encryption and live itinerary updates over cloud protocols for fail-safe point-to-point transfers.</p>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;