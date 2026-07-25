const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// 1. Redesign Dashboard Tab
const oldDashboardStart = "{activeTab === 'dashboard' && (";
const oldDashboardEnd = "              {/* Main Split Sections: Recent orders & stats review */}";

const newDashboardBlock = `{activeTab === 'dashboard' && (
            <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
              {/* Premium Greeting Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">ড্যাশবোর্ড ওভারভিউ</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">আজকের স্ট্যাটাস এবং আপডেট একনজরে</p>
                </div>
                <div className="text-xs font-bold text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-sm inline-flex items-center gap-2 w-max">
                  <CalendarDays size={16} className="text-emerald-500" /> 
                  {new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>

              {/* Bento Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: 'মোট বিক্রি', value: \`৳\${totalSales.toLocaleString('bn-BD')}\`, countDesc: 'টাকা', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', dotColor: 'bg-emerald-500', icon: BarChart3 },
                  { label: 'নতুন অর্ডার', value: pendingOrdersCount.toLocaleString('bn-BD'), countDesc: 'টি পেন্ডিং', iconBg: 'bg-orange-50', iconColor: 'text-orange-600', dotColor: 'bg-orange-500', icon: ShoppingBag },
                  { label: 'মোট প্রোটিন পণ্য', value: products.length.toLocaleString('bn-BD'), countDesc: 'টি লাইভ', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', dotColor: 'bg-blue-500', icon: Package },
                  { label: 'মোট কাস্টমার', value: totalCustomersCount.toLocaleString('bn-BD'), countDesc: 'জন নিবন্ধিত', iconBg: 'bg-purple-50', iconColor: 'text-purple-600', dotColor: 'bg-purple-500', icon: Users },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col justify-between relative overflow-hidden group transition-all duration-300">
                    <div className={\`absolute -right-6 -top-6 w-24 h-24 rounded-full \${stat.iconBg} opacity-50 blur-2xl group-hover:scale-150 transition-transform duration-700\`}></div>
                    
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className={\`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 \${stat.iconBg} \${stat.iconColor} shadow-inner\`}>
                        <stat.icon size={22} strokeWidth={2.5} />
                      </div>
                      <span className={\`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold \${stat.iconBg} \${stat.iconColor}\`}>
                        <span className={\`w-1.5 h-1.5 rounded-full \${stat.dotColor}\`}></span> {stat.countDesc}
                      </span>
                    </div>
                    <div className="relative z-10">
                      <p className="text-xs font-bold text-slate-500 mb-1">{stat.label}</p>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none">{stat.value}</h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Mobile search */}
              <div className="block sm:hidden relative">
                <input 
                  type="text" 
                  placeholder="পণ্য ক্যাটাগরি বা নাম খুঁজুন..." 
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200/80 rounded-2xl text-xs focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium placeholder-slate-400 shadow-sm" 
                />
                <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
              </div>

              {/* Main Split Sections: Recent orders & stats review */}`;

const startIndex = content.indexOf(oldDashboardStart);
const endIndex = content.indexOf(oldDashboardEnd);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newDashboardBlock + content.substring(endIndex + oldDashboardEnd.length);
} else {
  console.log("Could not find dashboard block bounds.");
}

// Write file
fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done redesigning top part.");
