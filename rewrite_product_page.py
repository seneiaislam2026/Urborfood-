import os

content = """import React, { useState, useEffect } from 'react';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShieldCheck, Truck, RefreshCw, CheckCircle2, ChevronRight, MapPin, Phone, User, AlertCircle, ShoppingBag, Star, Info, Lock, ThumbsUp, Copy, Check, ChevronLeft } from 'lucide-react';
import { toBanglaNumber } from '../utils/banglaHelpers';
import ImageLoader from '../components/ui/ImageLoader';

export default function ProductLandingPage() {
  const { selectedProduct, setSelectedProduct } = useUI();
  const { addToCart, placeOrder, clearCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [successTrackingId, setSuccessTrackingId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const price = product.discountedPrice || product.originalPrice;
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.originalPrice;
  const deliveryCharge = 60;
  const totalPrice = (price * quantity) + deliveryCharge;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (phone.length !== 11 || !phone.startsWith('01')) {
      setFormError('দয়া করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)');
      return;
    }
    
    setIsSubmitting(true);
    try {
      addToCart(product, quantity);
      
      setTimeout(() => {
         const trackingId = placeOrder(customerName, phone, address);
         setSuccessTrackingId(trackingId);
         setOrderSuccess(true);
         clearCart();
         setIsSubmitting(false);
      }, 100);
    } catch (error) {
      console.error('Order error:', error);
      setFormError('অর্ডারটি সম্পন্ন করা যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।');
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="bg-[#fcfdfd] min-h-screen flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-white p-10 rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 max-w-lg w-full text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-600 relative before:absolute before:inset-0 before:bg-emerald-100 before:rounded-full before:animate-ping before:opacity-50">
            <CheckCircle2 size={48} strokeWidth={2.5} className="relative z-10" />
          </div>
          <h2 className="text-[32px] font-black text-slate-800 tracking-tight mb-4">অর্ডার সফল হয়েছে!</h2>
          <p className="text-slate-500 text-[17px] leading-relaxed mb-8 font-medium">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।</p>
          
          <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8 relative overflow-hidden group">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">আপনার ট্র্যাকিং আইডি</p>
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-mono font-black text-slate-800 text-2xl tracking-wider">{successTrackingId}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(successTrackingId);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`p-3 rounded-lg transition-all duration-300 flex items-center justify-center ${copied ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
              >
                {copied ? <Check size={20} strokeWidth={3} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          <button 
            onClick={() => {
              setOrderSuccess(false);
              setSelectedProduct(null);
            }}
            className="w-full bg-slate-900 text-white px-8 py-4.5 rounded-xl font-bold text-[17px] hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} /> হোমে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdfd] min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-28 lg:pb-12">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-[1100px] mx-auto px-5 h-[72px] flex items-center justify-between">
          <button 
            onClick={() => setSelectedProduct(null)}
            className="flex items-center gap-2.5 text-slate-500 hover:text-slate-900 font-bold transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-slate-100 group-hover:border-slate-300 transition-colors">
              <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-[15px]">ফিরে যান</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              <ShieldCheck size={14} /> নিরাপদ শপিং
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column - Product Presentation */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Main Product Hero */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100/50">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-[13px]">
                  <Star size={16} className="fill-current" />
                  <span className="mt-0.5 text-slate-700">{toBanglaNumber(product.rating || 5.0)}</span>
                  <span className="text-slate-400 font-medium ml-1">(৪২০+)</span>
                </div>
              </div>

              <h1 className="text-[32px] sm:text-[44px] font-black text-slate-900 leading-[1.15] tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mt-2">
                <span className="text-[40px] sm:text-[48px] font-black text-emerald-600 tracking-tight leading-none">
                  ৳{toBanglaNumber(price)}
                </span>
                {hasDiscount && (
                  <span className="text-[20px] sm:text-[24px] text-slate-400 line-through font-bold decoration-slate-300">
                    ৳{toBanglaNumber(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Immersive Image Display */}
            <div className="relative rounded-[32px] overflow-hidden bg-slate-50 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] group aspect-[4/3]">
              {hasDiscount && (
                <div className="absolute top-5 left-5 bg-slate-900 text-white px-4 py-2 rounded-full text-[13px] font-black shadow-xl z-10 flex items-center gap-1.5 backdrop-blur-md bg-opacity-90">
                  <span>সাশ্রয়</span>
                  <span className="bg-white/20 px-1.5 py-0.5 rounded text-[11px]">৳{toBanglaNumber((product.originalPrice || 0) - price)}</span>
                </div>
              )}
              <div className="w-full h-full relative">
                <ImageLoader 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                />
              </div>
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/50 text-[14px] font-bold text-slate-800 flex items-center gap-2">
                <PackageIcon /> ওজন: <span className="text-emerald-700">{product.weight}</span>
              </div>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: ShieldCheck, text: '১০০% বিশুদ্ধ' },
                { icon: CheckCircle2, text: 'প্রিমিয়াম মান' },
                { icon: Truck, text: 'হোম ডেলিভারি' },
                { icon: RefreshCw, text: 'সহজ রিটার্ন' }
              ].map((prop, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center gap-2 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-700 flex items-center justify-center">
                    <prop.icon size={20} strokeWidth={2} />
                  </div>
                  <span className="text-[13px] font-bold text-slate-700">{prop.text}</span>
                </div>
              ))}
            </div>

            {/* Detailed Info */}
            <div className="bg-white rounded-[24px] border border-slate-200/60 p-6 sm:p-8 shadow-sm">
              <h3 className="text-[20px] font-black text-slate-900 mb-6 flex items-center gap-2.5">
                <Info size={24} className="text-emerald-600" /> বিস্তারিত বিবরণ
              </h3>
              <p className="text-[16px] leading-[1.8] text-slate-600 font-medium mb-6">
                আমাদের প্রতিটি পণ্য শতভাগ বিশুদ্ধ ও স্বাস্থ্যসম্মত উপায়ে প্রস্তুত করা হয়। ভেজালমুক্ত ও গুণগত মান সম্পন্ন এই পণ্যটি আপনার পরিবারের জন্য একটি স্বাস্থ্যকর পছন্দ।
              </p>
              <ul className="space-y-4">
                {[
                  'কোনো প্রকার ক্ষতিকর রাসায়নিক বা প্রিজারভেটিভ নেই',
                  'স্বাদ ও পুষ্টিগুণ ১০০% অটুট থাকে',
                  'স্বাস্থ্যকর পরিবেশে নিজস্ব তত্ত্বাবধানে প্রক্রিয়াজাতকৃত'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-emerald-700" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 text-[15px] leading-relaxed font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Checkout Panel */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-[104px]" id="checkout-form">
              <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 p-7 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                  <h3 className="text-[22px] font-black mb-1.5 relative z-10">অর্ডার নিশ্চিত করুন</h3>
                  <p className="text-slate-400 text-[14px] font-medium relative z-10">নিচের ফর্মটি পূরণ করুন, আমরাই আপনার সাথে যোগাযোগ করব</p>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Quantity */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <span className="block text-[15px] font-bold text-slate-800 mb-1">পরিমাণ নির্ধারণ করুন</span>
                      <span className="text-[12px] text-slate-500 font-medium">{product.weight} এর প্যাকেজ</span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg hover:bg-white hover:shadow-sm flex items-center justify-center text-slate-600 transition-all"
                      >
                        <Minus size={18} strokeWidth={2.5} />
                      </button>
                      <span className="w-8 text-center font-black text-slate-900 text-lg">{toBanglaNumber(quantity)}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 flex items-center justify-center text-white transition-all"
                      >
                        <Plus size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    {formError && (
                      <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-[14px] font-bold flex items-start gap-2.5">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <span className="leading-snug">{formError}</span>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-[12px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider ml-1">আপনার নাম</label>
                      <div className="relative">
                        <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="আপনার পুরো নাম লিখুন"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-medium"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[12px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider ml-1">মোবাইল নম্বর</label>
                      <div className="relative">
                        <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="tel" 
                          required
                          maxLength={11}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="017XXXXXXXX"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 tracking-wider"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[12px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider ml-1">ডেলিভারি ঠিকানা</label>
                      <div className="relative">
                        <MapPin size={20} className="absolute left-4 top-4 text-slate-400" />
                        <textarea 
                          required
                          rows={2}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="বাসা নং, রাস্তা, এলাকা, জেলা"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-[15px] font-semibold resize-none text-slate-900 placeholder:text-slate-400 placeholder:font-medium"
                        ></textarea>
                      </div>
                    </div>
                    
                    {/* Bill Summary */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-6 space-y-3">
                      <div className="flex justify-between text-[14px] font-semibold text-slate-500">
                        <span>পণ্যের মূল্য</span>
                        <span className="text-slate-700">৳{toBanglaNumber(price * quantity)}</span>
                      </div>
                      <div className="flex justify-between text-[14px] font-semibold text-slate-500">
                        <span>ডেলিভারি চার্জ</span>
                        <span className="text-slate-700">৳{toBanglaNumber(deliveryCharge)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-200/60">
                        <span className="text-[16px] font-bold text-slate-800">সর্বমোট বিল</span>
                        <span className="text-[24px] font-black text-emerald-600 tracking-tight">৳{toBanglaNumber(totalPrice)}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-600 text-white py-4.5 rounded-xl font-bold text-[18px] shadow-[0_8px_20px_rgba(5,150,105,0.25)] hover:bg-emerald-700 hover:shadow-[0_12px_25px_rgba(5,150,105,0.35)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <ShoppingBag size={20} className="opacity-90" />
                            <span>কনফার্ম অর্ডার</span>
                            <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform opacity-90" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                  
                  <p className="text-center text-[12px] font-bold text-slate-400 mt-5 flex items-center justify-center gap-1.5">
                    <Lock size={14} /> ক্যাশ অন ডেলিভারিতে সম্পূর্ণ নিরাপদ কেনাকাটা
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      {!orderSuccess && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-slate-200 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] transform transition-transform animate-in slide-in-from-bottom-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
               <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">সর্বমোট বিল</span>
               <span className="text-[20px] font-black text-slate-900 leading-none">৳{toBanglaNumber(totalPrice)}</span>
            </div>
            <button 
              onClick={() => {
                const el = document.getElementById('checkout-form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => {
                    const firstInput = document.querySelector('#checkout-form input') as HTMLInputElement;
                    if(firstInput) firstInput.focus();
                  }, 500);
                }
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-[16px] shadow-[0_8px_20px_rgba(5,150,105,0.25)] flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <ShoppingBag size={18} /> অর্ডার করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PackageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
      <path d="m3.3 7 8.7 5 8.7-5"></path>
      <path d="M12 22V12"></path>
    </svg>
  );
}
"""

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)
