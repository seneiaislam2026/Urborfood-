import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

old_block = """  if (orderSuccess) {
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
              if (onBack) onBack();
              else setSelectedProduct(null);
            }}
            className="w-full bg-slate-900 text-white px-8 py-4.5 rounded-xl font-bold text-[17px] hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} /> হোমে ফিরে যান
          </button>
        </div>
      </div>
    );
  }"""

new_block = """  if (orderSuccess) {
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
                      <p className="text-slate-500 text-[13px] font-medium mt-0.5">{product.weight} × {toBanglaNumber(quantity)}</p>
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
  }"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open('src/pages/ProductLandingPage.tsx', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Could not find the block to replace")
