import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
                <div className="p-4 md:p-5 border-b border-gray-100 bg-white select-none">
                  <h3 className="font-semibold text-base text-slate-800">গ্রাহক প্রোফাইল ডাটাবেজ সেন্টার ({totalCustomersCount} জন)</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">উর্বর ফুড স্টোরে কেনাকাটা করা গ্রাহকের ঠিকানা ও মোট বেচা-বিক্রির রেকর্ড</p>
                </div>
                {/* Desktop view: wide table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm font-medium min-w-[650px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-500 uppercase text-[11px] text-left select-none">
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">গ্রাহক নাম</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">মোবাইল</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">ঠিকানা</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">অর্ডার সংখ্যা</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">মোট ক্রয় মূল্য (৳)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 text-slate-700">
                      {customersList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-12 text-center text-slate-500 font-medium">কোন কাস্টমার প্রোফাইল পাওয়া যায়নি।</td>
                        </tr>
                      ) : (
                        customersList.map((customer, idx) => (
                          <tr key={idx} className="hover:bg-[#f8fafc]/50 transition-colors cursor-pointer" onClick={() => setSelectedCustomerHistory({ phone: customer.phone, name: customer.name })}>
                            <td className="p-4 font-semibold text-slate-900">{customer.name}</td>
                            <td className="p-4">{customer.phone}</td>
                            <td className="p-4 text-slate-500 font-normal">{customer.address}</td>
                            <td className="p-4 text-center">{customer.ordersCount} টি</td>
                            <td className="p-4 text-slate-900 font-medium">৳ {customer.totalSpent > 0 ? customer.totalSpent.toLocaleString('bn-BD') : '০'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                </table>
                </div>

                {/* Mobile responsive view: stacked cards for customers list */}
                <div className="block md:hidden divide-y divide-slate-200/60">
                  {customersList.length === 0 ? (
                    <div className="p-12 text-center text-zinc-400 font-bold">কোন কাস্টমার প্রোফাইল পাওয়া যায়নি।</div>
                  ) : (
                    customersList.map((customer, idx) => (
                      <div key={idx} onClick={() => setSelectedCustomerHistory({ phone: customer.phone, name: customer.name })} className="p-4 flex flex-col gap-1.5 hover:bg-[#f8fafc]/50 transition-colors text-xs font-semibold cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#115e5a] text-sm leading-normal">{customer.name}</span>
                          <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0">
                            {customer.ordersCount} টি অর্ডার
                          </span>
                        </div>
                        
                        <div className="text-slate-500 font-medium tracking-wide">{customer.phone}</div>
                        
                        <div className="text-slate-600 font-medium mt-1">
                          <span className="text-[10px] text-slate-500 font-medium block mb-0.5 uppercase tracking-wider">ডেলিভারি ঠিকানা:</span>
                          {customer.address}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200">
                          <span className="text-[10px] text-slate-500 font-medium uppercase">মোট কেনাকাটার পরিমাণ</span>
                          <span className="text-sm font-bold text-emerald-900">৳{customer.totalSpent.toLocaleString('bn-BD')}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>"""

replacement = """              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
                <div className="p-4 md:p-5 border-b border-gray-100 bg-white sm:flex sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-base text-slate-800">গ্রাহক প্রোফাইল ডাটাবেজ সেন্টার</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">মোট {filteredCustomersList.length} জন গ্রাহক পাওয়া গেছে</p>
                  </div>
                  <div className="mt-4 sm:mt-0 relative w-full sm:max-w-xs shrink-0">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..." 
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Desktop view: wide table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm font-medium min-w-[650px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-500 uppercase text-[11px] text-left select-none">
                        <th className="p-4 pl-6 text-xs font-semibold uppercase tracking-wider text-slate-500">গ্রাহক</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">মোবাইল</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">ঠিকানা</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">অর্ডার সংখ্যা</th>
                        <th className="p-4 pr-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">মোট ক্রয় (৳)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                      {filteredCustomersList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-12 text-center text-slate-500 font-medium">কোন কাস্টমার প্রোফাইল পাওয়া যায়নি।</td>
                        </tr>
                      ) : (
                        filteredCustomersList.map((customer, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => setSelectedCustomerHistory({ phone: customer.phone, name: customer.name })}>
                            <td className="p-4 pl-6">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 uppercase">
                                  {customer.name ? customer.name.charAt(0) : '?'}
                                </div>
                                <span className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{customer.name}</span>
                              </div>
                            </td>
                            <td className="p-4 tracking-wide text-slate-600">{customer.phone}</td>
                            <td className="p-4 text-slate-500 font-normal">
                               <div className="max-w-[200px] truncate" title={customer.address}>{customer.address}</div>
                            </td>
                            <td className="p-4 text-center">
                              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold inline-block min-w-[3rem]">
                                {customer.ordersCount}
                              </span>
                            </td>
                            <td className="p-4 pr-6 text-right">
                              <div className="text-slate-900 font-bold text-[15px]">৳{customer.totalSpent > 0 ? customer.totalSpent.toLocaleString('bn-BD') : '০'}</div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                </table>
                </div>

                {/* Mobile responsive view: stacked cards for customers list */}
                <div className="block md:hidden bg-slate-50/50 p-3 sm:p-4">
                  <div className="flex flex-col gap-3">
                    {filteredCustomersList.length === 0 ? (
                      <div className="p-10 bg-white rounded-xl border border-slate-200 text-center text-slate-400 font-bold shadow-sm">কোন কাস্টমার পাওয়া যায়নি।</div>
                    ) : (
                      filteredCustomersList.map((customer, idx) => (
                        <div key={idx} onClick={() => setSelectedCustomerHistory({ phone: customer.phone, name: customer.name })} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3 active:scale-[0.98] transition-all cursor-pointer">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                               <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base shrink-0 uppercase">
                                  {customer.name ? customer.name.charAt(0) : '?'}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-slate-900 text-[15px] truncate">{customer.name}</h4>
                                  <div className="text-slate-500 text-xs font-medium tracking-wide mt-0.5">{customer.phone}</div>
                                </div>
                            </div>
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded-md text-[10px] font-bold shrink-0 whitespace-nowrap shadow-sm">
                              {customer.ordersCount} টি অর্ডার
                            </span>
                          </div>
                          
                          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-start gap-2">
                             <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                             <p className="text-xs text-slate-600 font-medium leading-relaxed">{customer.address}</p>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">মোট ক্রয় মূল্য</span>
                            <span className="text-base font-black text-slate-900 tracking-tight">৳{customer.totalSpent.toLocaleString('bn-BD')}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/pages/AdminDashboard.tsx', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Target not found")
