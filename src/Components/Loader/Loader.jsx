import React from "react";

const Loader = ({ message = "Loading Live MongoDB Fleets..." }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 space-y-4">
      {/* ৩টি বাউন্সিং এবং পালসিং ডট অ্যানিমেশন (আপনার স্ক্রিনশটের মতো) */}
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce"></div>
      </div>
      
      {/* লোডিং মেসেজ */}
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loader;