import { Mail, Phone, MapPin, Send, User } from "lucide-react";

const Contact = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 py-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side */}
        <div
          data-aos="fade-right"
          className="text-white space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            HAVE QUESTIONS?
            <br />
            <span className="text-red-500">CONTACT US NOW</span>
          </h1>

          <p className="text-gray-300 text-lg max-w-md">
            Ticket Bari support team is here to help with your Bus,
            Launch, Train and Flight bookings. Get in touch for
            immediate assistance.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-lg">
              <Phone className="text-red-500" />
              <span>+880 1955-250001</span>
            </div>

            <div className="flex items-center gap-3 text-lg">
              <Mail className="text-red-500" />
              <span>support@ticketbari.com</span>
            </div>

            <div className="flex items-center gap-3 text-lg">
              <MapPin className="text-red-500" />
              <span>Ticket Bari HQ, Dhaka</span>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div
          data-aos="fade-left"
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-4 w-5 h-5 text-red-400" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-10 py-3 rounded-xl bg-white/10 border border-red-400/50 text-white placeholder-gray-300 outline-none focus:border-red-500 transition"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full py-3 px-4 rounded-xl bg-white/10 border border-red-400/50 text-white placeholder-gray-300 outline-none focus:border-red-500 transition"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full py-3 px-4 rounded-xl bg-white/10 border border-red-400/50 text-white placeholder-gray-300 outline-none focus:border-red-500 transition"
              />

              <input
                type="text"
                placeholder="Booking Type"
                className="w-full py-3 px-4 rounded-xl bg-white/10 border border-red-400/50 text-white placeholder-gray-300 outline-none focus:border-red-500 transition"
              />
            </div>

            <textarea
              rows="5"
              placeholder="Enter your message here..."
              className="w-full py-3 px-4 rounded-xl bg-white/10 border border-red-400/50 text-white placeholder-gray-300 outline-none focus:border-red-500 transition resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold tracking-wide hover:scale-105 hover:shadow-red-500/50 hover:shadow-xl transition-all duration-300 flex justify-center items-center gap-2"
            >
              <Send size={18} />
              SEND YOUR TICKET QUERY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;