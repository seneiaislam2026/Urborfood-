import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """              {/* Bento Stats Grid */}
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

replacement = """              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                {[
                  { label: 'মোট বিক্রি', value: `৳${totalSales.toLocaleString('bn-BD')}`, countDesc: 'টাকা', colorBase: 'emerald', icon: BarChart3 },
                  { label: 'নতুন অর্ডার', value: pendingOrdersCount.toLocaleString('bn-BD'), countDesc: 'টি পেন্ডিং', colorBase: 'orange', icon: ShoppingBag },
                  { label: 'মোট পণ্য', value: products.length.toLocaleString('bn-BD'), countDesc: 'টি লাইভ', colorBase: 'blue', icon: Package },
                  { label: 'মোট কাস্টমার', value: totalCustomersCount.toLocaleString('bn-BD'), countDesc: 'জন নিবন্ধিত', colorBase: 'purple', icon: Users },
                ].map((stat, i) => {
                  const colors = {
                    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', lightBg: 'bg-emerald-50', border: 'border-emerald-100' },
                    orange: { bg: 'bg-orange-500', text: 'text-orange-600', lightBg: 'bg-orange-50', border: 'border-orange-100' },
                    blue: { bg: 'bg-blue-500', text: 'text-blue-600', lightBg: 'bg-blue-50', border: 'border-blue-100' },
                    purple: { bg: 'bg-purple-500', text: 'text-purple-600', lightBg: 'bg-purple-50', border: 'border-purple-100' },
                  }[stat.colorBase as 'emerald'|'orange'|'blue'|'purple'];

                  return (
                    <div key={i} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 group relative overflow-hidden flex flex-col justify-center gap-3">
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bg} opacity-60 group-hover:opacity-100 transition-opacity`} />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colors.lightBg} ${colors.text} group-hover:scale-110 transition-transform duration-300 border ${colors.border} shadow-sm`}>
                          <stat.icon size={20} strokeWidth={2.5} />
                        </div>
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold w-max ${colors.lightBg} ${colors.text} border ${colors.border}`}>
                          {stat.countDesc}
                        </span>
                      </div>
                      
                      <div className="mt-1">
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-0.5">{stat.value}</h3>
                        <p className="text-[11px] sm:text-xs font-semibold text-slate-500">{stat.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>"""

if target in content:
    content = content.replace(target, replacement)
    print("Replaced stats grid")
else:
    print("Could not find stats grid to replace")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
