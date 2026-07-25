import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

old_fab = """      {/* Mobile Floating Action Button */}
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
      )}"""

new_fab = """      {/* Mobile Floating Action Button */}
      {!orderSuccess && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 pb-safe bg-white/90 backdrop-blur-2xl border-t border-slate-200/80 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] transform transition-transform animate-in slide-in-from-bottom-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
               <span className="text-[10.5px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">সর্বমোট বিল</span>
               <span className="text-[22px] font-black text-emerald-700 leading-none tracking-tight">৳{toBanglaNumber(totalPrice)}</span>
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
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 rounded-2xl font-black text-[16px] shadow-[0_8px_20px_rgba(5,150,105,0.25)] flex items-center justify-center gap-2 active:scale-[0.97] transition-all border border-emerald-500/20"
            >
              <ShoppingBag size={18} /> এখনই অর্ডার করুন
            </button>
          </div>
        </div>
      )}"""

content = content.replace(old_fab, new_fab)

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)
