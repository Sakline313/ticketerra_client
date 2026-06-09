import React from 'react';

const PaymentModal = ({ isOpen, onClose, checkoutData }) => {
  // যদি মোডাল ওপেন না থাকে, তবে কিছুই রেন্ডার করবে না
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* মোডাল কন্টেইনার বক্স */}
      <div className="relative w-full max-w-2xl bg-white p-6 rounded-2xl shadow-2xl overflow-hidden mx-4">
        
        {/* ক্লোজ (ক্রস) বাটন */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-2xl font-bold"
        >
          &times;
        </button>

        {/* মোডালের মূল কন্টেন্ট (আপনার দেওয়া ইন্টারফেসটি এখানে বসবে) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          
          {/* বাম পাশ: সিট সিলেকশন বা রিভিউ */}
          <div className="border border-gray-100 p-4 rounded-xl bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              Select Seats ({checkoutData?.busName || 'Bus'})
            </h3>
            {/* আপনার সিট ম্যাট্রিক্সের ডিজাইন এখানে যুক্ত করতে পারেন */}
            <div className="p-4 bg-white rounded-lg border text-center text-gray-500">
              Selected Seat: <span className="text-red-500 font-bold">{checkoutData?.seat}</span>
            </div>
          </div>

          {/* ডান পাশ: চেকআউট ডিটেইলস */}
          <div className="border border-gray-100 p-4 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              Checkout Details
            </h3>
            
            <div className="space-y-2 text-sm border p-4 rounded-xl bg-gray-50">
              <div className="flex justify-between">
                <span className="text-gray-500">Bus Name:</span>
                <span className="font-semibold">{checkoutData?.busName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Passengers Count:</span>
                <span className="font-semibold">1 Person(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Seats Chosen:</span>
                <span className="font-semibold text-red-500">{checkoutData?.seat}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-base font-bold">
                <span>Total Cost:</span>
                <span>৳{checkoutData?.price}</span>
              </div>
            </div>

            {/* গেটওয়ে সিলেকশন */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-gray-400 uppercase">Select Gateway</span>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button className="py-2 border rounded-lg hover:bg-red-50 transition text-xs font-medium">Bkash</button>
                <button className="py-2 border rounded-lg hover:bg-orange-50 transition text-xs font-medium">Nagad</button>
                <button className="py-2 border rounded-lg hover:bg-blue-50 transition text-xs font-medium">Rocket</button>
              </div>
            </div>

            {/* পে বাটন */}
            <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2">
              <span>💳</span> Pay ৳{checkoutData?.price} & Reserve Ticket
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PaymentModal;