import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle, Clock, Package, MapPin, Phone, AlertCircle, User } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';

export default function OrderTrackingModal() {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen } = useUI();
  const { orders } = useCart();
  const [orderId, setOrderId] = useState('');
  const [searched, setSearched] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);

  if (!isOrderTrackingOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setSearched(true);
    const cleanId = orderId.toUpperCase().trim();
    // Allow searching by Tracking ID or Phone
    const foundOrder = orders.find(o => o.id.toUpperCase() === cleanId || o.phone.replace(/[\s-]/g, '') === cleanId.replace(/[\s-]/g, '') || o.phone.includes(cleanId));

    if (!foundOrder) {
      setTrackingResult(null);
      return;
    }

    let statusSteps = [
      { title: 'অর্ডার সফল হয়েছে', date: new Date(foundOrder.date).toLocaleString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }), completed: true },
      { title: 'পণ্য প্রস্তুত করা হচ্ছে', date: '', completed: false },
      { title: 'ডেলিভারি পার্টনারের কাছে হস্তান্তরিত', date: '', completed: false },
      { title: 'ডেলিভারি সম্পন্ন', date: '', completed: false }
    ];

    let currentStep = 0;
    let statusText = 'পেন্ডিং';

    if (foundOrder.status === 'Confirmed') {
      currentStep = 1;
      statusSteps[1].completed = true;
      statusText = 'অর্ডার কনফার্মড';
    } else if (foundOrder.status === 'Shipped') {
      currentStep = 2;
      statusSteps[1].completed = true;
      statusSteps[2].completed = true;
      statusText = 'শিপমেন্ট হয়েছে';
    } else if (foundOrder.status === 'Completed') {
      currentStep = 3;
      statusSteps[1].completed = true;
      statusSteps[2].completed = true;
      statusSteps[3].completed = true;
      statusText = 'ডেলিভারি সম্পন্ন';
    } else if (foundOrder.status === 'Cancelled') {
      statusText = 'অর্ডার বাতিল হয়েছে';
    }

    setTrackingResult({
      orderId: foundOrder.id,
      customerName: foundOrder.customerName,
      phone: foundOrder.phone,
      address: foundOrder.address,
      paymentMethod: 'ক্যাশ অন ডেলিভারি (COD)',
      totalAmount: foundOrder.total,
      statusText,
      currentStep,
      steps: statusSteps,
      isCancelled: foundOrder.status === 'Cancelled',
      items: foundOrder.items
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={() => setIsOrderTrackingOpen(false)}
      />
      
      {/* Main Container */}
      <div 
        className="bg-white rounded-[2rem] w-full max-w-2xl flex flex-col relative z-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-100/60 overflow-hidden max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between gap-4 shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">
              🚚
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight leading-tight">
                অর্ডার ট্র্যাকিং সিস্টেম
              </h2>
              <p className="text-xs text-slate-500 font-bold mt-1">
                আপনার অর্ডারের সর্বশেষ অবস্থা জানতে আইডি লিখুন
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsOrderTrackingOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Search Bar container */}
        <div className="p-5 border-b border-gray-50 bg-slate-50/40 shrink-0">
          <form onSubmit={handleTrack} className="flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="যেমন: #NP-1024 অথবা 017..."
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-[#00693E] font-bold text-gray-800 shadow-sm transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button 
              type="submit"
              className="px-6 py-3 bg-[#00693E] hover:bg-[#005030] text-white font-bold rounded-2xl text-sm shadow-md shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              খুঁজুন
            </button>
          </form>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-[300px]">
          {!searched ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 sm:p-12 text-slate-400 bg-white">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-10 h-10 text-slate-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">আপনার মেমো বা অর্ডারের নম্বর দিন</h3>
              <p className="text-sm font-medium leading-relaxed max-w-sm mx-auto">
                অর্ডার নিশ্চিত করার পর আপনার মোবাইলে প্রেরিত অর্ডার আইডি অথবা ফোন নম্বর টাইপ করে ট্র্যাক করুন।
              </p>
            </div>
          ) : !trackingResult ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 sm:p-12 text-slate-400 bg-slate-50">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-red-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">কোনো অর্ডার পাওয়া যায়নি</h3>
              <p className="text-sm font-medium">দয়া করে সঠিক আইডি বা নম্বরটি আবার চেক করুন।</p>
              <button 
                onClick={() => setSearched(false)}
                className="mt-6 px-5 py-2 bg-white border-2 border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          ) : (
            <div className="p-5 sm:p-6 bg-white h-full">
              {/* Order Quick Info Header */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase bg-slate-200/50 px-2 py-0.5 rounded-md">Order ID</span>
                    <span className="text-lg font-black text-slate-800">{trackingResult.orderId}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-600">
                    <User size={14} className="text-slate-400" /> {trackingResult.customerName}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-600 mt-1">
                    <Phone size={14} className="text-slate-400" /> {trackingResult.phone}
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <div className="text-[11px] font-bold text-slate-500">মোট বিল</div>
                  <div className="text-xl font-black text-[#00693E]">৳ {trackingResult.totalAmount}</div>
                  <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mt-1">
                    {trackingResult.paymentMethod}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 font-bold ${trackingResult.isCancelled ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-800 border border-emerald-100'}`}>
                {trackingResult.isCancelled ? <AlertCircle size={24} /> : <CheckCircle size={24} />}
                <div>
                  <div className="text-xs opacity-80 mb-0.5">বর্তমান অবস্থা</div>
                  <div className="text-lg">{trackingResult.statusText}</div>
                </div>
              </div>

              {/* Stepper tracking */}
              {!trackingResult.isCancelled && (
                <div className="relative pl-6 sm:pl-8 mb-8">
                  {/* Vertical Line connecting steps */}
                  <div className="absolute left-[13px] sm:left-[17px] top-6 bottom-6 w-0.5 bg-slate-100 z-0"></div>

                  <div className="space-y-8">
                    {trackingResult.steps.map((step: any, index: number) => {
                      const isActive = trackingResult.currentStep === index;
                      const isPast = trackingResult.currentStep > index;
                      const isFuture = trackingResult.currentStep < index;
                      
                      let Icon = Clock;
                      if (index === 0) Icon = CheckCircle;
                      if (index === 1) Icon = Package;
                      if (index === 2) Icon = Truck;
                      if (index === 3) Icon = MapPin;

                      return (
                        <div key={index} className={`relative z-10 flex gap-4 sm:gap-6 ${isFuture ? 'opacity-40' : 'opacity-100'}`}>
                          {/* Step Icon Node */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm transition-all duration-300 ${isPast || isActive ? 'bg-[#00693E] text-white shadow-emerald-500/20' : 'bg-slate-100 text-slate-400'}`}>
                            {isPast ? <CheckCircle size={18} strokeWidth={3} /> : <Icon size={18} strokeWidth={2.5} />}
                          </div>

                          <div className={`flex flex-col justify-center pt-1 ${isActive ? 'scale-105 origin-left' : ''} transition-all duration-300`}>
                            <h4 className={`text-sm sm:text-base font-black tracking-tight ${isPast || isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                              {step.title}
                            </h4>
                            {step.date && (
                              <p className="text-xs font-bold text-slate-500 mt-0.5 flex items-center gap-1">
                                <Clock size={10} /> {step.date}
                              </p>
                            )}
                            {isActive && index === 1 && (
                              <p className="text-xs font-bold text-[#00693E] bg-emerald-50 px-2 py-1 rounded-md mt-2 inline-block">
                                আপনার অর্ডারটি প্যাক করা হচ্ছে
                              </p>
                            )}
                            {isActive && index === 2 && (
                              <p className="text-xs font-bold text-[#00693E] bg-emerald-50 px-2 py-1 rounded-md mt-2 inline-block">
                                ডেলিভারি ম্যানের জন্য অপেক্ষা করুন
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                  <Package size={16} className="text-slate-400" />
                  অর্ডারের আইটেমসমূহ
                </h4>
                <div className="space-y-3">
                  {trackingResult.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100/60">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.name}</p>
                          <p className="text-xs font-bold text-slate-500">{item.weight} × {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-slate-800">৳ {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
