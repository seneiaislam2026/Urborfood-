import React, { useState, useEffect } from 'react';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShieldCheck, Truck, RefreshCw, CheckCircle2, ChevronRight, MapPin, Phone, User, AlertCircle, ShoppingBag, Star, Info, Lock, ThumbsUp, Copy, Check, ChevronLeft, Plus, Minus } from 'lucide-react';
import { toBanglaNumber } from '../utils/banglaHelpers';
import ImageLoader from '../components/ui/ImageLoader';

interface ProductLandingPageProps {
  productId?: string;
  onBack?: () => void;
}

export default function ProductLandingPage({ productId, onBack }: ProductLandingPageProps) {
  const { selectedProduct, setSelectedProduct } = useUI();
  const { products, addToCart, placeOrder, clearCart, orders } = useCart();
  
  const product = productId 
    ? products.find(p => p.id === productId) 
    : selectedProduct;
  
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [successTrackingId, setSuccessTrackingId] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);


  // Auto-fill existing customer details if phone matches
  useEffect(() => {
    if (phone.length >= 11) {
      const existingOrder = orders.find(o => o.phone === phone);
      if (existingOrder) {
        if (!customerName) setCustomerName(existingOrder.customerName);
        if (!address) setAddress(existingOrder.address);
      }
    }
  }, [phone, orders]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProduct]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    const formEl = document.getElementById('checkout-form');
    if (formEl) {
      observer.observe(formEl);
    }
    return () => observer.disconnect();
  }, []);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">পণ্যটি পাওয়া যায়নি</h2>
        <button 
          onClick={onBack || (() => setSelectedProduct(null))}
          className="text-emerald-600 font-semibold flex items-center gap-2 justify-center mx-auto hover:text-emerald-700"
        >
          <ChevronLeft size={20} /> ফিরে যান
        </button>
      </div>
    </div>
  );
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
      <div className="bg-[#fcfdfd] min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-400/10 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>

        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 max-w-md w-full relative z-10 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Header Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-8 text-center relative border-b border-emerald-100/50">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_8px_16px_-6px_rgba(16,185,129,0.2)] relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
              <CheckCircle2 size={40} className="text-emerald-500 relative z-10" strokeWidth={2.5} />
            </div>
            <h2 className="text-[28px] font-black text-slate-800 tracking-tight mb-2">অর্ডার সফল হয়েছে!</h2>
            <p className="text-slate-500 text-[15px] leading-relaxed font-medium">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। প্রতিনিধি দ্রুত যোগাযোগ করবেন।</p>
          </div>

          {/* Body Section */}
          <div className="p-8">
            
            {/* Tracking ID */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6 flex items-center justify-between group hover:border-emerald-200 transition-colors">
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold mb-1">ট্র্যাকিং আইডি</p>
                <p className="font-mono font-black text-slate-700 text-xl tracking-wider">{successTrackingId}</p>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(successTrackingId);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center ${copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white text-slate-400 hover:text-emerald-600 border border-slate-200 hover:border-emerald-200 shadow-sm'}`}
              >
                {copied ? <Check size={20} strokeWidth={3} /> : <Copy size={20} />}
              </button>
            </div>

            {/* Order Summary (Receipt Style) */}
            <div className="mb-8">
               <h4 className="text-[14px] font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <ShoppingBag size={18} className="text-emerald-600" /> অর্ডারের সারাংশ
               </h4>
               <div className="border border-slate-100 rounded-2xl p-4 bg-white shadow-sm space-y-4 relative overflow-hidden">
                  <div className="flex gap-4 items-center relative z-10">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                       <ImageLoader src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-bold text-slate-800 text-[15px] line-clamp-1">{product.name}</h5>
                      <p className="text-slate-500 text-[13px] font-medium mt-0.5 ">{product.weight} × {toBanglaNumber(quantity)}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-dashed border-slate-200 pt-4 flex justify-between items-center relative z-10">
                     <span className="text-slate-500 font-medium text-[15px]">সর্বমোট</span>
                     <span className="text-xl font-black text-emerald-600">&nbsp;৳{toBanglaNumber(totalPrice)}</span>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => {
                setOrderSuccess(false);
                if (onBack) onBack();
                else setSelectedProduct(null);
              }}
              className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold text-[16px] hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> কেনাকাটা চালিয়ে যান
            </button>
          </div>
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
            onClick={onBack || (() => setSelectedProduct(null))}
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

      <div className="max-w-[1100px] mx-auto px-4 sm:px-5 py-6 sm:py-10">
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
                  <span className="text-slate-400 font-medium ml-1 bn-safe">(৪২০+)</span>
                </div>
              </div>

              <h1 className="text-[24px] sm:text-[36px] font-black text-slate-900 leading-[1.2] tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 text-[16px] font-bold text-slate-600 mt-[-8px]">
                 পরিমাণ: <span className="text-emerald-700 bn-safe ">&nbsp;{product.weight}</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 mt-2">
                <span className="text-[32px] sm:text-[40px] font-black text-emerald-600 tracking-tight leading-tight">
                  &nbsp;৳{toBanglaNumber(price)}
                </span>
                {hasDiscount && (
                  <span className="text-[20px] sm:text-[24px] text-rose-500 line-through font-bold decoration-rose-400">
                    &nbsp;৳{toBanglaNumber(product.originalPrice)}
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg text-[14px] font-black ml-2 border border-emerald-200">
                    সাশ্রয় ৳{toBanglaNumber((product.originalPrice || 0) - price)}
                  </span>
                )}
              </div>
            </div>

            {/* Immersive Image Display */}
            <div className="relative rounded-[32px] overflow-hidden bg-slate-50 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] group aspect-[4/3]">
              
              <div className="w-full h-full relative">
                <ImageLoader 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                />
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
              <p className="text-[16px] leading-[1.8] text-slate-600 font-medium mb-6 whitespace-pre-line">
                {product.description || 'আমাদের প্রতিটি পণ্য শতভাগ বিশুদ্ধ ও স্বাস্থ্যসম্মত উপায়ে প্রস্তুত করা হয়। ভেজালমুক্ত ও গুণগত মান সম্পন্ন এই পণ্যটি আপনার পরিবারের জন্য একটি স্বাস্থ্যকর পছন্দ।'}
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
              <div className="bg-white rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-200/60 overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-3">
                   <h3 className="text-[20px] font-bold text-slate-800 tracking-tight">অর্ডার কনফার্ম করুন</h3>
                </div>

                <div className="p-5 sm:p-6">
                  {/* Total Bill Box */}
                  <div className="bg-orange-50/50 border border-orange-100/50 px-5 py-4 rounded-xl flex justify-between items-center mb-6">
                    <span className="font-bold text-slate-800 text-[16px]">মোট বিল:</span>
                    <span className="font-black text-slate-900 text-[18px]">&nbsp;৳{toBanglaNumber(totalPrice)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <span className="block text-[15px] font-bold text-slate-800 mb-1">পরিমাণ নির্ধারণ করুন</span>
                      <span className="text-[13px] text-slate-500 font-medium bn-safe ">&nbsp;{product.weight} এর প্যাকেজ</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                      <button 
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded transition-colors"
                      >
                        <Minus size={18} strokeWidth={2.5} />
                      </button>
                      <span className="w-8 text-center font-bold text-slate-900 text-[16px]">{toBanglaNumber(quantity)}</span>
                      <button 
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                      >
                        <Plus size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                    {formError && (
                      <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-[14px] font-bold flex items-start gap-3 border border-rose-100 animate-in slide-in-from-top-2">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <span className="leading-snug">{formError}</span>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label className="block text-[15px] font-bold text-slate-800">
                        আপনার নাম <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="আপনার পুরো নাম লিখুন"
                        className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-[15px] font-medium text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-[15px] font-bold text-slate-800">
                        মোবাইল নাম্বার <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="tel" 
                        required
                        maxLength={11}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-[15px] font-medium text-slate-900 tracking-wider placeholder:text-slate-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-[15px] font-bold text-slate-800">
                        ডেলিভারি ঠিকানা <span className="text-rose-500">*</span>
                      </label>
                      <textarea 
                        required
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="আপনার সম্পূর্ণ ঠিকানা বিস্তারিত লিখুন (বাড়ি নং, রাস্তা, এলাকা)"
                        className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-[15px] font-medium resize-none text-slate-900 placeholder:text-slate-400 leading-relaxed"
                      ></textarea>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                      <span className="text-amber-500 font-bold mt-0.5 select-none text-[16px]">i</span>
                      <p className="text-[14px] font-medium text-slate-600 leading-snug">
                        ক্যাশ অন ডেলিভারি - পণ্য হাতে পেয়ে মূল্য পরিশোধ করবেন।
                      </p>
                    </div>
                    
                    {/* Bill Summary */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mt-4">
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center text-[15px] font-medium text-slate-600">
                          <span>পণ্যের মূল্য</span>
                          <span className="text-slate-800 font-bold">&nbsp;৳{toBanglaNumber(price * quantity)}</span>
                        </div>
                        <div className="flex justify-between items-center text-[15px] font-medium text-slate-600">
                          <span>ডেলিভারি চার্জ</span>
                          <span className="text-slate-800 font-bold">&nbsp;৳{toBanglaNumber(deliveryCharge)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                        <span className="text-[16px] font-bold text-slate-800">সর্বমোট বিল</span>
                        <span className="text-[20px] font-black text-slate-900 tracking-normal">&nbsp;৳{toBanglaNumber(totalPrice)}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white py-4 rounded-full font-bold text-[17px] shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <span>অর্ডার কনফার্ম করুন</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      {!orderSuccess && !isFormVisible && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 pb-safe bg-white/90 backdrop-blur-2xl border-t border-slate-200/80 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] transform transition-transform animate-in slide-in-from-bottom-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
               <span className="text-[10.5px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">সর্বমোট বিল</span>
               <span className="text-[22px] font-black text-emerald-700 leading-tight tracking-normal">&nbsp;৳{toBanglaNumber(totalPrice)}</span>
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
              className="flex-1 bg-[#f97316] text-white py-3.5 rounded-full font-bold text-[16px] shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              অর্ডার কনফার্ম করুন
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
