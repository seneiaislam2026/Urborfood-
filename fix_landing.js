import fs from 'fs';

const code = `import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Star, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Share2, 
  Check, 
  AlertCircle,
  Copy,
  User,
  Phone,
  MapPin,
  Heart,
  ChevronRight,
  Info,
  Lock,
  ThumbsUp,
  Minus,
  Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import ImageLoader from '../components/ui/ImageLoader';

interface ProductLandingPageProps {
  productId: string;
  onBack: () => void;
}

export default function ProductLandingPage({ productId, onBack }: ProductLandingPageProps) {
  const { products, placeDirectOrder } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Checkout form state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [formError, setFormError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState<any>(null);
  const [trackingCopied, setTrackingCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time remaining simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  const handleCopyTrackingId = () => {
    if (placedOrderDetails?.trackingId) {
      navigator.clipboard.writeText(placedOrderDetails.trackingId);
      setTrackingCopied(true);
      setTimeout(() => setTrackingCopied(false), 2000);
    }
  };

  const product = products.find(p => p.id === productId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [productId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-sans">
        <Helmet>
          <title>পণ্যটি খুঁজে পাওয়া যায়নি | উর্বর ফুড</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="w-20 h-20 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] flex items-center justify-center mb-6">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#111827] mb-3">পণ্যটি খুঁজে পাওয়া যায়নি</h1>
        <p className="text-[#6B7280] text-center mb-8 max-w-sm leading-relaxed">
          লিঙ্কটি ভুল হতে পারে অথবা পণ্যটি মুছে ফেলা হয়েছে। অনুগ্রহ করে স্টোরে ফিরে যান।
        </p>
        <button 
          onClick={onBack}
          className="bg-[#14532D] text-white px-8 py-3.5 rounded-[20px] font-bold shadow-[0_4px_14px_rgba(20,83,45,0.2)] hover:shadow-[0_6px_20px_rgba(20,83,45,0.3)] transition-all flex items-center gap-2"
        >
          <ArrowLeft size={18} /> স্টোরে ফিরে যান
        </button>
      </div>
    );
  }

  const price = product.discountedPrice || product.originalPrice;
  const originalPrice = product.originalPrice;
  const hasDiscount = !!product.discountedPrice;
  const discountAmount = hasDiscount ? originalPrice - price : 0;
  const discountPercent = hasDiscount ? Math.round((discountAmount / originalPrice) * 100) : 0;
  const deliveryCharge = 0; // Free delivery logic here if needed
  const totalPrice = (price * quantity) + deliveryCharge;

  const handleCopyLink = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const link = \`\${origin}/#product=\${product.id}\`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  const toBanglaNumber = (num: number | string) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\\d/g, (digit) => banglaDigits[parseInt(digit)]);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim() || !phone.trim() || phone.trim().length < 11 || !address.trim()) {
      setFormError('অনুগ্রহ করে সব তথ্য সঠিকভাবে দিন।');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const trackingId = placeDirectOrder(customerName.trim(), phone.trim(), address.trim(), product, quantity);
      setPlacedOrderDetails({
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        productName: product.name,
        quantity,
        price,
        total: totalPrice,
        trackingId
      });
      setOrderSuccess(true);
      setCustomerName('');
      setPhone('');
      setAddress('');
      setQuantity(1);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const metaTitle = \`\${product.name} | উর্বর ফুড\`;
  const productUrl = typeof window !== 'undefined' ? \`\${window.location.origin}/#product=\${product.id}\` : \`https://www.urborfood.com/#product=\${product.id}\`;

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 font-sans text-[#111827]">
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>
      
      {/* Sticky Header */}
      <div className={\`sticky top-0 z-50 transition-all duration-300 \${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)]' : 'bg-transparent'}\`}>
        <div className="container mx-auto max-w-[1000px] flex items-center justify-between px-4 py-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center bg-white border border-[#E5E7EB] text-[#111827] rounded-full shadow-sm hover:bg-[#F8FAFC] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className={\`font-bold text-lg transition-opacity duration-300 \${isScrolled ? 'opacity-100' : 'opacity-0'}\`}>
            <span className="text-[#16A34A]">Urbor</span> Food
          </div>

          <button 
            onClick={handleCopyLink}
            className="w-10 h-10 flex items-center justify-center bg-white border border-[#E5E7EB] text-[#111827] rounded-full shadow-sm hover:bg-[#F8FAFC] transition-colors"
          >
            {copied ? <Check size={18} className="text-[#16A34A]" /> : <Share2 size={18} />}
          </button>
        </div>
      </div>

      {orderSuccess ? (
        <div className="container mx-auto px-4 py-12 max-w-xl animate-in fade-in zoom-in duration-500">
          <div className="bg-white rounded-[24px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 text-center">
            <div className="w-20 h-20 bg-[#16A34A]/10 text-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold mb-2">অর্ডার সফল হয়েছে!</h1>
            <p className="text-[#6B7280] text-sm mb-8">আমাদের প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
            
            <div className="bg-[#F8FAFC] rounded-[20px] p-5 text-left text-sm text-[#111827] mb-8 space-y-4">
              <div className="flex justify-between pb-4 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280]">ট্র্যাকিং আইডি</span>
                <span className="font-['Noto_Sans_Bengali'] font-bold text-[#14532D] text-lg tracking-wider">{placedOrderDetails?.trackingId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">মোট মূল্য</span>
                <span className="font-bold font-['Noto_Sans_Bengali'] text-xl">৳ {toBanglaNumber(placedOrderDetails?.total || 0)}</span>
              </div>
            </div>

            <button 
              onClick={onBack}
              className="w-full bg-[#14532D] text-white py-4 rounded-[16px] font-bold shadow-[0_4px_14px_rgba(20,83,45,0.2)] hover:shadow-[0_6px_20px_rgba(20,83,45,0.3)] transition-all"
            >
              আরও কেনাকাটা করুন
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 max-w-[1000px] mt-2 sm:mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column - Product Details */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Product Image Gallery */}
              <div className="bg-white rounded-[24px] p-3 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E7EB] relative group">
                <div className="relative aspect-square rounded-[20px] overflow-hidden bg-[#F8FAFC]">
                  {hasDiscount && (
                    <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-[#E5E7EB]">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                      <span className="text-xs font-bold text-[#14532D]">
                        <span className="font-['Noto_Sans_Bengali']">-{toBanglaNumber(discountPercent)}%</span> ছাড়
                      </span>
                    </div>
                  )}
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/95 backdrop-blur-md flex items-center justify-center rounded-full shadow-sm border border-[#E5E7EB] transition-colors"
                  >
                    <Heart size={20} className={isFavorite ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#6B7280]'} />
                  </button>
                  <ImageLoader 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="px-1 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#14532D] bg-[#16A34A]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full text-xs font-bold">
                    <Star size={12} className="fill-current" />
                    <span className="font-['Noto_Sans_Bengali']">{toBanglaNumber(product.rating || 5.0)}</span>
                  </div>
                </div>
                
                <h1 className="text-[28px] sm:text-[34px] font-bold text-[#111827] leading-[1.2] tracking-tight">
                  {product.name}
                </h1>
                
                <p className="text-[#6B7280] text-sm font-medium">
                  প্যাকেজ সাইজ: <span className="text-[#111827] font-bold font-['Noto_Sans_Bengali']">{product.weight}</span>
                </p>

                {/* Urgency Section - Premium Countdown */}
                <div className="bg-gradient-to-br from-[#14532D] to-[#16A34A] rounded-[24px] p-6 sm:p-8 text-white shadow-[0_12px_40px_rgba(20,83,45,0.2)] relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#16A34A]/30 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />
                  
                  <div className="flex items-start justify-between relative z-10 gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">অফার চলছে</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="text-[40px] sm:text-[48px] font-black tracking-tight font-['Noto_Sans_Bengali'] leading-none">
                          ৳{toBanglaNumber(price)}
                        </span>
                        {hasDiscount && (
                          <span className="text-emerald-200 line-through text-lg sm:text-xl font-['Noto_Sans_Bengali'] opacity-80">
                            ৳{toBanglaNumber(originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-[16px] p-3 border border-white/20 self-end">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Clock size={14} className="text-emerald-200" />
                        <span className="text-[10px] font-bold text-emerald-50 uppercase tracking-widest">অফার শেষ হতে বাকি</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-black font-['Noto_Sans_Bengali'] tracking-widest text-white flex items-center justify-center">
                        <div className="w-9 text-center bg-black/20 rounded-md p-1">{toBanglaNumber(timeLeft.hours).padStart(2, '০')}</div>
                        <span className="px-1 text-emerald-200 opacity-60">:</span>
                        <div className="w-9 text-center bg-black/20 rounded-md p-1">{toBanglaNumber(timeLeft.minutes).padStart(2, '০')}</div>
                        <span className="px-1 text-emerald-200 opacity-60">:</span>
                        <div className="w-9 text-center bg-black/20 rounded-md p-1 text-emerald-300">{toBanglaNumber(timeLeft.seconds).padStart(2, '০')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Cards (Why Choose Us) */}
              <div className="grid grid-cols-2 gap-4 px-1">
                {[
                  { icon: ShieldCheck, title: '১০০% হালাল', sub: 'ও নিরাপদ', bg: 'bg-blue-50', text: 'text-blue-600' },
                  { icon: Truck, title: 'ফাস্ট ডেলিভারি', sub: 'হোম সার্ভিস', bg: 'bg-[#16A34A]/10', text: 'text-[#16A34A]' },
                  { icon: ShoppingBag, title: 'ক্যাশ অন', sub: 'ডেলিভারি', bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]' },
                  { icon: RefreshCw, title: '৭ দিন', sub: 'সহজ রিটার্ন', bg: 'bg-rose-50', text: 'text-rose-600' }
                ].map((feature, i) => (
                  <div key={i} className="bg-white p-5 rounded-[22px] border border-[#E5E7EB] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.06)] transition-all hover:-translate-y-1 group flex gap-4 items-center">
                    <div className={\`w-12 h-12 shrink-0 rounded-full \${feature.bg} \${feature.text} flex items-center justify-center transition-transform group-hover:scale-110\`}>
                      <feature.icon size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111827] text-[15px] mb-0.5">{feature.title}</h4>
                      <span className="text-xs text-[#6B7280] font-medium">{feature.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description Cards */}
              <div className="bg-white rounded-[24px] border border-[#E5E7EB] shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                <div className="border-b border-[#E5E7EB] p-6 md:p-8 bg-gradient-to-b from-[#F8FAFC] to-white">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center">
                      <Info size={18} />
                    </div>
                    <h3 className="font-bold text-[#111827] text-xl">বিস্তারিত বিবরণ</h3>
                  </div>
                  <p className="text-[16px] leading-[1.8] text-[#4B5563]">
                    আমাদের প্রতিটি খাদ্যপণ্য <strong className="text-[#111827] font-bold">১০০% নিরাপদ এবং বিশুদ্ধতার</strong> নিশ্চয়তা দেয়। সরাসরি গ্রামীণ খামার থেকে কঠোর স্বাস্থ্যবিধি মেনে, ভেজালহীন ও স্বাস্থ্যসম্মত উপায়ে এটি সংগ্রহ ও প্রক্রিয়াজাত করা হয়।
                  </p>
                </div>
                <div className="p-6 md:p-8 bg-white">
                  <ul className="space-y-4">
                    {[
                      'কোনো প্রকার ক্ষতিকর প্রিজারভেটিভ ব্যবহার করা হয় না',
                      'স্বাদ ও পুষ্টিগুণ ১০০% অটুট থাকে',
                      'পরিবারের সবার জন্য সম্পূর্ণ নিরাপদ ও স্বাস্থ্যসম্মত'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1">
                          <CheckCircle2 size={20} className="text-[#16A34A]" />
                        </div>
                        <span className="text-[#4B5563] text-[15px] leading-relaxed font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Right Column - Premium Checkout Form */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-[24px] border border-[#E5E7EB] shadow-[0_12px_40px_rgb(0,0,0,0.06)] overflow-hidden lg:sticky lg:top-24">
                
                {/* Form Header */}
                <div className="bg-gradient-to-r from-[#14532D] to-[#16A34A] p-6 text-white text-center">
                  <h3 className="font-black text-xl mb-1 tracking-tight">১-ক্লিকে অর্ডার করুন</h3>
                  <p className="text-emerald-100 text-sm font-medium opacity-90">আপনার তথ্য দিন, আমরাই যোগাযোগ করবো</p>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Order Summary Card */}
                  <div className="bg-[#F8FAFC] rounded-[20px] p-5 border border-[#E5E7EB] mb-8">
                    
                    {/* Product Row */}
                    <div className="flex items-center gap-4 mb-5">
                      <img src={product.image} alt="" className="w-16 h-16 rounded-[16px] object-cover bg-white shadow-sm border border-[#E5E7EB]" />
                      <div className="flex-1">
                        <h4 className="font-bold text-[#111827] text-base line-clamp-1 mb-1">{product.name}</h4>
                        <span className="inline-block px-2.5 py-1 bg-white border border-[#E5E7EB] rounded-full text-xs font-bold text-[#6B7280] font-['Noto_Sans_Bengali'] shadow-sm">
                          {product.weight}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between py-4 border-t border-[#E5E7EB]">
                      <span className="text-sm font-bold text-[#4B5563]">পরিমাণ</span>
                      <div className="flex items-center gap-4 bg-white border border-[#E5E7EB] rounded-full p-1.5 shadow-sm">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 rounded-full bg-[#F8FAFC] hover:bg-[#E5E7EB] flex items-center justify-center text-[#111827] transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center font-bold text-base font-['Noto_Sans_Bengali']">{toBanglaNumber(quantity)}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 rounded-full bg-[#111827] text-white hover:bg-[#374151] flex items-center justify-center transition-colors shadow-sm"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="pt-4 space-y-3 text-[15px] border-t border-[#E5E7EB]">
                      <div className="flex justify-between text-[#6B7280] font-medium">
                        <span>একক মূল্য</span>
                        <span className="font-['Noto_Sans_Bengali']">৳{toBanglaNumber(price)}</span>
                      </div>
                      <div className="flex justify-between text-[#6B7280] font-medium">
                        <span>ডেলিভারি চার্জ</span>
                        <span className="text-[#16A34A] font-bold">ফ্রি</span>
                      </div>
                      <div className="flex justify-between font-black text-[#111827] pt-3 mt-1 border-t border-[#E5E7EB] items-center">
                        <span className="text-base">সর্বমোট বিল</span>
                        <span className="text-[24px] text-[#14532D] font-['Noto_Sans_Bengali'] tracking-tight">৳{toBanglaNumber(totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Form */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                    {formError && (
                      <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-[16px] text-sm font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
                        <AlertCircle size={18} />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#4B5563] ml-1 uppercase tracking-wider">আপনার নাম</label>
                      <div className="relative group">
                        <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#16A34A] transition-colors" />
                        <input 
                          type="text" 
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="পুরো নাম লিখুন"
                          className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[16px] focus:bg-white focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/10 outline-none transition-all text-[15px] font-medium text-[#111827]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#4B5563] ml-1 uppercase tracking-wider">মোবাইল নম্বর</label>
                      <div className="relative group">
                        <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#16A34A] transition-colors" />
                        <input 
                          type="tel" 
                          required
                          maxLength={11}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\\D/g, ''))}
                          placeholder="017XXXXXXXX"
                          className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[16px] focus:bg-white focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/10 outline-none transition-all text-[15px] font-medium font-['Noto_Sans_Bengali'] text-[#111827] tracking-wider"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#4B5563] ml-1 uppercase tracking-wider">সম্পূর্ণ ঠিকানা</label>
                      <div className="relative group">
                        <MapPin size={20} className="absolute left-4 top-4 text-[#9CA3AF] group-focus-within:text-[#16A34A] transition-colors" />
                        <textarea 
                          required
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="বাসা নং, রাস্তা, এলাকা..."
                          className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[16px] focus:bg-white focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/10 outline-none transition-all text-[15px] font-medium resize-none text-[#111827]"
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#14532D] to-[#16A34A] text-white py-4 sm:py-5 rounded-[16px] font-bold text-[17px] shadow-[0_8px_20px_rgba(20,83,45,0.25)] hover:shadow-[0_12px_30px_rgba(20,83,45,0.35)] hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-full -translate-x-full skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Lock size={18} className="opacity-80" />
                            <span>এখনই অর্ডার করুন</span>
                            <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform opacity-80" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Trust Indicators */}
                  <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-wrap justify-center gap-y-4 gap-x-6 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Lock size={14} className="text-[#16A34A]" /> নিরাপদ চেকআউট</span>
                    <span className="flex items-center gap-1.5"><Truck size={14} className="text-[#16A34A]" /> দ্রুত ডেলিভারি</span>
                    <span className="flex items-center gap-1.5"><ThumbsUp size={14} className="text-[#16A34A]" /> বিশ্বস্ত শপ</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
`

fs.writeFileSync('src/pages/ProductLandingPage.tsx', code);
