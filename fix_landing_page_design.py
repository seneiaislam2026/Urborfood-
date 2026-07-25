import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

start_marker = "{/* Right Column - Checkout Panel */}"
end_marker = "{/* Mobile Floating Action Button */}"

if start_marker in content and end_marker in content:
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)

    new_right_column = """{/* Right Column - Checkout Panel */}
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
                    <span className="font-black text-slate-900 text-[18px]">৳{toBanglaNumber(totalPrice)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <span className="block text-[15px] font-bold text-slate-800 mb-1">পরিমাণ নির্ধারণ করুন</span>
                      <span className="text-[13px] text-slate-500 font-medium">{product.weight} এর প্যাকেজ</span>
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

      """

    new_content = content[:start_idx] + new_right_column + content[end_idx:]

    old_fab = """            <button 
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
              className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold text-[16px] shadow-lg shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} /> অর্ডার করুন
            </button>"""
            
    new_fab = """            <button 
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
            </button>"""
            
    if old_fab in new_content:
        new_content = new_content.replace(old_fab, new_fab)

    with open('src/pages/ProductLandingPage.tsx', 'w') as f2:
        f2.write(new_content)
