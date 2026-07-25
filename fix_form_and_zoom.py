import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

# Fix heading sizes
content = content.replace(
    'className="text-[32px] sm:text-[44px] font-black text-slate-900 leading-[1.15] tracking-tight"',
    'className="text-[24px] sm:text-[36px] font-black text-slate-900 leading-[1.2] tracking-tight"'
)

content = content.replace(
    'className="text-[40px] sm:text-[48px] font-black text-emerald-600 tracking-tight leading-none"',
    'className="text-[32px] sm:text-[40px] font-black text-emerald-600 tracking-tight leading-none"'
)

content = content.replace(
    'className="max-w-[1100px] mx-auto px-5 py-8 sm:py-12"',
    'className="max-w-[1100px] mx-auto px-4 sm:px-5 py-6 sm:py-10"'
)

# Fix Form
old_form = """                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
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
                    </div>"""

new_form = """                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
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
                    </div>"""

content = content.replace(old_form, new_form)

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)

