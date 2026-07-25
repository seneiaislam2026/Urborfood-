import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """                  {/* Operational Status overview indicator */}
                  <div className="bg-gradient-to-br from-[#022c22] via-[#047857] to-[#0d9488] text-white rounded-xl p-6 shadow-[0_15px_35px_-5px_rgba(4,120,87,0.35)] border-t border-white/20 border-l border-white/10 relative overflow-hidden flex-1 flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_25px_50px_rgba(4,120,87,0.45)] hover:-translate-y-0.5">
                    {/* Glowing background circles for visual depth */}
                    <div className="absolute -top-12 -right-12 w-44 h-44 bg-teal-400/30 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-300/40 transition-all duration-500 animate-pulse" />
                    <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-500/25 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

                    <div>
                      <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-inner px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-95"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300 shadow-[0_0_10px_#10b981]"></span>
                          </span>
                          <span className="text-emerald-100 font-sans tracking-wide">অপারেশন স্ট্যাটাস</span>
                        </div>
                        <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-emerald-200 shadow-sm transition-transform duration-300 group-hover:scale-110">
                          <ShieldCheck size={18} className="text-emerald-300" />
                        </div>
                      </div>
                      
                      <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-1.5 font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                        উর্বর ফুড অনলাইন
                      </h4>
                      <p className="text-[11.5px] text-emerald-100/90 font-medium leading-relaxed mt-2.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                        সমস্ত সিস্টেম সচল এবং রিয়েল-টাইমে অর্ডার গ্রহণ করছে। কাস্টমার অ্যাপে ক্যাশ অন ডেলিভারি মোড সচল করা আছে।
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3.5 mt-6 pt-5 border-t border-white/15 text-center shrink-0">
                      {/* Pending Card */}
                      <div className="bg-white/10 backdrop-blur-md border border-white/15 hover:border-amber-400/50 hover:bg-white/15 transition-all duration-300 rounded-xl p-3 flex flex-col justify-between items-center group/card relative shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:scale-[1.03]">
                        <div className="absolute top-1.5 right-1.5 text-amber-300 group-hover/card:scale-110 transition-transform drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]">
                          <Clock size={12} />
                        </div>
                        <p className="text-[10px] text-emerald-100/85 font-bold tracking-wide">পেন্ডিং</p>
                        <p className="text-xl md:text-2xl  font-bold text-amber-300 mt-1 drop-shadow-[0_2px_10px_rgba(251,191,36,0.4)]">{pendingOrdersCount}</p>
                      </div>

                      {/* Delivered Card */}
                      <div className="bg-white/10 backdrop-blur-md border border-white/15 hover:border-emerald-300/50 hover:bg-white/15 transition-all duration-300 rounded-xl p-3 flex flex-col justify-between items-center group/card relative shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:scale-[1.03]">
                        <div className="absolute top-1.5 right-1.5 text-emerald-300 group-hover/card:scale-110 transition-transform drop-shadow-[0_0_4px_rgba(52,211,153,0.3)]">
                          <CheckCircle size={12} />
                        </div>
                        <p className="text-[10px] text-emerald-100/85 font-bold tracking-wide">ডেলিভারড</p>
                        <p className="text-xl md:text-2xl  font-bold text-emerald-300 mt-1 drop-shadow-[0_2px_10px_rgba(52,211,153,0.4)]">{completedOrdersCount}</p>
                      </div>

                      {/* Cancelled Card */}
                      <div className="bg-white/10 backdrop-blur-md border border-white/15 hover:border-rose-400/50 hover:bg-white/15 transition-all duration-300 rounded-xl p-3 flex flex-col justify-between items-center group/card relative shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:scale-[1.03]">
                        <div className="absolute top-1.5 right-1.5 text-rose-300 group-hover/card:scale-110 transition-transform drop-shadow-[0_0_4px_rgba(244,63,94,0.3)]">
                          <AlertTriangle size={12} />
                        </div>
                        <p className="text-[10px] text-emerald-100/85 font-bold tracking-wide">বাতিল</p>
                        <p className="text-xl md:text-2xl  font-bold text-rose-300 mt-1 drop-shadow-[0_2px_10px_rgba(244,63,94,0.4)]">{cancelledOrdersCount}</p>
                      </div>
                    </div>
                  </div>"""

replacement = """                  {/* Operational Status overview indicator */}
                  <div className="bg-gradient-to-br from-[#0c5940] to-[#128f65] text-white rounded-[20px] p-6 md:p-8 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between">
                    {/* Subtle background glow */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      <div className="flex justify-between items-center mb-6 relative z-10">
                        <div className="flex items-center gap-2.5 bg-[#ffffff10] border border-white/10 px-4 py-2 rounded-full text-[13px] font-bold text-white tracking-wide">
                          <span className="relative flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#34d399]"></span>
                          </span>
                          অপারেশন স্ট্যাটাস
                        </div>
                        <div className="p-3 bg-[#ffffff10] rounded-2xl border border-white/10 text-emerald-100">
                          <ShieldCheck size={22} />
                        </div>
                      </div>
                      
                      <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-1.5 font-sans relative z-10 mb-3">
                        উর্বর ফুড অনলাইন
                      </h4>
                      <p className="text-[13px] text-emerald-50/90 font-medium leading-relaxed relative z-10 max-w-[95%]">
                        সমস্ত সিস্টেম সচল এবং রিয়েল-টাইমে অর্ডার গ্রহণ করছে। কাস্টমার অ্যাপে ক্যাশ অন ডেলিভারি মোড সচল করা আছে।
                      </p>
                    </div>

                    <div className="border-t border-white/10 mt-8 pt-6 relative z-10">
                      <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
                        {/* Pending Card */}
                        <div className="bg-[#ffffff15] border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center relative transition-all hover:bg-[#ffffff20]">
                          <div className="absolute top-2.5 right-2.5 text-amber-300">
                            <Clock size={15} strokeWidth={2.5} />
                          </div>
                          <p className="text-[12px] md:text-[13px] text-emerald-50/90 font-bold mb-1.5">পেন্ডিং</p>
                          <p className="text-2xl md:text-3xl font-black text-amber-300 drop-shadow-sm">{pendingOrdersCount}</p>
                        </div>

                        {/* Delivered Card */}
                        <div className="bg-[#ffffff15] border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center relative transition-all hover:bg-[#ffffff20]">
                          <div className="absolute top-2.5 right-2.5 text-emerald-300">
                            <CheckCircle size={15} strokeWidth={2.5} />
                          </div>
                          <p className="text-[12px] md:text-[13px] text-emerald-50/90 font-bold mb-1.5">ডেলিভারড</p>
                          <p className="text-2xl md:text-3xl font-black text-emerald-300 drop-shadow-sm">{completedOrdersCount}</p>
                        </div>

                        {/* Cancelled Card */}
                        <div className="bg-[#ffffff15] border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center relative transition-all hover:bg-[#ffffff20]">
                          <div className="absolute top-2.5 right-2.5 text-rose-300">
                            <AlertTriangle size={15} strokeWidth={2.5} />
                          </div>
                          <p className="text-[12px] md:text-[13px] text-emerald-50/90 font-bold mb-1.5">বাতিল</p>
                          <p className="text-2xl md:text-3xl font-black text-rose-300 drop-shadow-sm">{cancelledOrdersCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/pages/AdminDashboard.tsx', 'w') as f:
        f.write(content)
    print("Replaced status card.")
else:
    print("Target not found.")

