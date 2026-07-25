import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """              {/* Bento Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: 'মোট বিক্রি', value: `৳${totalSales.toLocaleString('bn-BD')}`, countDesc: 'টাকা', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', dotColor: 'bg-emerald-500', glowColor: 'bg-emerald-400', icon: BarChart3 },
                  { label: 'নতুন অর্ডার', value: pendingOrdersCount.toLocaleString('bn-BD'), countDesc: 'টি পেন্ডিং', iconBg: 'bg-orange-50', iconColor: 'text-orange-600', dotColor: 'bg-orange-500', glowColor: 'bg-orange-400', icon: ShoppingBag },
                  { label: 'মোট প্রোটিন পণ্য', value: products.length.toLocaleString('bn-BD'), countDesc: 'টি লাইভ', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', dotColor: 'bg-blue-500', glowColor: 'bg-blue-400', icon: Package },
                  { label: 'মোট কাস্টমার', value: totalCustomersCount.toLocaleString('bn-BD'), countDesc: 'জন নিবন্ধিত', iconBg: 'bg-purple-50', iconColor: 'text-purple-600', dotColor: 'bg-purple-500', glowColor: 'bg-purple-400', icon: Users },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col justify-between relative overflow-hidden group transition-all duration-300">
                    <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${stat.glowColor} opacity-[0.15] blur-2xl group-hover:scale-150 group-hover:opacity-[0.25] transition-all duration-700`}></div>
                    
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.iconBg} ${stat.iconColor} shadow-inner`}>
                        <stat.icon size={22} strokeWidth={2.5} />
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${stat.iconBg} ${stat.iconColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stat.dotColor}`}></span> {stat.countDesc}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <p className="text-xs font-bold text-slate-500 mb-1">{stat.label}</p>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none">{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>"""

replacement = """              {/* Bento Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: 'মোট বিক্রি', value: `৳${totalSales.toLocaleString('bn-BD')}`, countDesc: 'টাকা', colorBase: 'emerald', icon: BarChart3 },
                  { label: 'নতুন অর্ডার', value: pendingOrdersCount.toLocaleString('bn-BD'), countDesc: 'টি পেন্ডিং', colorBase: 'orange', icon: ShoppingBag },
                  { label: 'মোট পণ্য', value: products.length.toLocaleString('bn-BD'), countDesc: 'টি লাইভ', colorBase: 'blue', icon: Package },
                  { label: 'মোট কাস্টমার', value: totalCustomersCount.toLocaleString('bn-BD'), countDesc: 'জন নিবন্ধিত', colorBase: 'purple', icon: Users },
                ].map((stat, i) => {
                  const colors = {
                    emerald: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/10', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', iconShadow: 'shadow-emerald-500/20', dotColor: 'bg-emerald-500', glow: 'from-emerald-500/20', line: 'bg-emerald-500' },
                    orange: { bg: 'bg-orange-500/5', border: 'border-orange-500/10', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', iconShadow: 'shadow-orange-500/20', dotColor: 'bg-orange-500', glow: 'from-orange-500/20', line: 'bg-orange-500' },
                    blue: { bg: 'bg-blue-500/5', border: 'border-blue-500/10', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', iconShadow: 'shadow-blue-500/20', dotColor: 'bg-blue-500', glow: 'from-blue-500/20', line: 'bg-blue-500' },
                    purple: { bg: 'bg-purple-500/5', border: 'border-purple-500/10', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', iconShadow: 'shadow-purple-500/20', dotColor: 'bg-purple-500', glow: 'from-purple-500/20', line: 'bg-purple-500' },
                  }[stat.colorBase as 'emerald'|'orange'|'blue'|'purple'];

                  return (
                    <div key={i} className={`bg-white rounded-[24px] p-5 md:p-6 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden group transition-all duration-300`}>
                      {/* Gradient glow effect on hover */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.glow} to-transparent opacity-[0.15] group-hover:opacity-[0.35] blur-2xl rounded-bl-full transition-opacity duration-500`} />
                      
                      <div className="flex items-center justify-between mb-8 relative z-10">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${colors.iconBg} ${colors.iconColor} shadow-sm border border-white/50 backdrop-blur-sm group-hover:scale-110 group-hover:${colors.iconShadow} transition-all duration-300`}>
                          <stat.icon size={22} strokeWidth={2.5} />
                        </div>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${colors.iconBg} ${colors.iconColor}`}>
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.dotColor} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${colors.dotColor}`}></span>
                          </span>
                          {stat.countDesc}
                        </div>
                      </div>
                      <div className="relative z-10">
                        <p className="text-xs font-bold text-slate-500 mb-1.5">{stat.label}</p>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none">{stat.value}</h3>
                      </div>
                      {/* Bottom line accent */}
                      <div className={`absolute bottom-0 left-0 h-1 w-full ${colors.line} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    </div>
                  )
                })}
              </div>"""

if target in content:
    content = content.replace(target, replacement)
    print("Updated bento grid successfully")
else:
    print("Could not find target bento grid")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
