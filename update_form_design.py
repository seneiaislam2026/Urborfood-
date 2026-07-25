import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

old_form = """                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    {formError && (
                      <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-[14px] font-bold flex items-start gap-2.5">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <span className="leading-snug">{formError}</span>
                      </div>
                    )}
                    
                    <div className="relative">
                      <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-emerald-500 transition-colors z-10" />
                      <input 
                        type="text" 
                        id="customerName"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder=" "
                        className="peer w-full pl-12 pr-4 pt-6 pb-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-[15px] font-bold text-slate-900"
                      />
                      <label htmlFor="customerName" className="absolute left-12 top-2 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-emerald-600 peer-focus:-translate-y-0 pointer-events-none cursor-text">
                        আপনার নাম
                      </label>
                    </div>
                    
                    <div className="relative">
                      <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 peer-focus:text-emerald-500 transition-colors z-10" />
                      <input 
                        type="tel" 
                        id="phone"
                        required
                        maxLength={11}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder=" "
                        className="peer w-full pl-12 pr-4 pt-6 pb-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-[15px] font-bold text-slate-900 tracking-wider"
                      />
                      <label htmlFor="phone" className="absolute left-12 top-2 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-emerald-600 peer-focus:-translate-y-0 pointer-events-none cursor-text">
                        মোবাইল নম্বর
                      </label>
                    </div>
                    
                    <div className="relative">
                      <MapPin size={20} className="absolute left-4 top-4 text-slate-400 peer-focus:text-emerald-500 transition-colors z-10" />
                      <textarea 
                        id="address"
                        required
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder=" "
                        className="peer w-full pl-12 pr-4 pt-7 pb-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-[15px] font-bold resize-none text-slate-900 leading-relaxed"
                      ></textarea>
                      <label htmlFor="address" className="absolute left-12 top-2 text-[11px] font-bold text-slate-500 transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-emerald-600 pointer-events-none cursor-text">
                        সম্পূর্ণ ডেলিভারি ঠিকানা
                      </label>
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
                  </form>"""

new_form = """                  <form onSubmit={handleCheckoutSubmit} className="space-y-4.5">
                    {formError && (
                      <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-[14px] font-bold flex items-start gap-3 border border-rose-100 shadow-sm">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <span className="leading-snug">{formError}</span>
                      </div>
                    )}
                    
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={20} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        id="customerName"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder=" "
                        className="peer w-full pl-12 pr-4 pt-6 pb-2.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 outline-none transition-all duration-300 text-[15px] font-bold text-slate-900 shadow-sm"
                      />
                      <label htmlFor="customerName" className="absolute left-12 top-2 text-[11px] font-bold text-slate-500 transition-all duration-300 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-emerald-600 peer-focus:-translate-y-0 pointer-events-none cursor-text">
                        আপনার পুরো নাম লিখুন
                      </label>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone size={20} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <input 
                        type="tel" 
                        id="phone"
                        required
                        maxLength={11}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder=" "
                        className="peer w-full pl-12 pr-4 pt-6 pb-2.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 outline-none transition-all duration-300 text-[15px] font-bold text-slate-900 tracking-wider shadow-sm"
                      />
                      <label htmlFor="phone" className="absolute left-12 top-2 text-[11px] font-bold text-slate-500 transition-all duration-300 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-emerald-600 peer-focus:-translate-y-0 pointer-events-none cursor-text">
                        মোবাইল নম্বর (017XXXXXXX)
                      </label>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                        <MapPin size={20} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <textarea 
                        id="address"
                        required
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder=" "
                        className="peer w-full pl-12 pr-4 pt-7 pb-2.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 outline-none transition-all duration-300 text-[15px] font-bold resize-none text-slate-900 leading-relaxed shadow-sm"
                      ></textarea>
                      <label htmlFor="address" className="absolute left-12 top-2 text-[11px] font-bold text-slate-500 transition-all duration-300 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-bold peer-focus:text-emerald-600 pointer-events-none cursor-text">
                        সম্পূর্ণ ডেলিভারি ঠিকানা
                      </label>
                    </div>
                    
                    {/* Bill Summary */}
                    <div className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-200/80 mt-6 shadow-inner">
                      <div className="space-y-2.5 mb-3">
                        <div className="flex justify-between text-[14px] font-semibold text-slate-500">
                          <span>পণ্যের মূল্য</span>
                          <span className="text-slate-700">৳{toBanglaNumber(price * quantity)}</span>
                        </div>
                        <div className="flex justify-between text-[14px] font-semibold text-slate-500">
                          <span>ডেলিভারি চার্জ</span>
                          <span className="text-slate-700">৳{toBanglaNumber(deliveryCharge)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-200 border-dashed">
                        <span className="text-[16px] font-bold text-slate-800">সর্বমোট বিল</span>
                        <span className="text-[26px] font-black text-emerald-600 tracking-tight">৳{toBanglaNumber(totalPrice)}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4.5 rounded-2xl font-black text-[18px] shadow-[0_8px_20px_rgba(5,150,105,0.25)] hover:shadow-[0_12px_25px_rgba(5,150,105,0.35)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none border border-emerald-500/20"
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <ShoppingBag size={20} className="opacity-90" />
                            <span>কনফার্ম অর্ডার করুন</span>
                            <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform opacity-90" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>"""

content = content.replace(old_form, new_form)

# And enhance the checkout header too
old_checkout_header = """                <div className="bg-slate-900 p-7 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                  <h3 className="text-[22px] font-black mb-1.5 relative z-10">অর্ডার নিশ্চিত করুন</h3>
                  <p className="text-slate-400 text-[14px] font-medium relative z-10">নিচের ফর্মটি পূরণ করুন, আমরাই আপনার সাথে যোগাযোগ করব</p>
                </div>"""

new_checkout_header = """                <div className="bg-slate-900 p-7 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                  <h3 className="text-[24px] font-black mb-1.5 relative z-10 tracking-tight">অর্ডার নিশ্চিত করুন</h3>
                  <p className="text-slate-300 text-[14.5px] font-medium relative z-10">নিচের ফর্মটি পূরণ করুন, আমরাই আপনার সাথে যোগাযোগ করব</p>
                </div>"""

content = content.replace(old_checkout_header, new_checkout_header)

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)
