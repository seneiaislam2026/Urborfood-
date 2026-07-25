import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """      {/* Mobile Drawer Slide-out Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col w-72 max-w-[85vw] bg-[#f8fafc] text-slate-600 h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-5 flex items-center justify-between border-b border-slate-200/60 bg-[#f8fafc]">
              <span className="text-lg font-bold text-slate-900">স্টোর ম্যানেজমেন্ট</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500 hover:bg-slate-100 hover:text-slate-600 p-2 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
              {navItems().map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={`mobile-${item.id}`}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={getTabStyle(item.id, isActive)}
                  >
                    <div className="relative">
                      <Icon size={18} className={getIconColor(item.id, isActive)} />
                      {isActive && <div className="absolute -inset-2 bg-current opacity-10 rounded-full blur-md" />}
                    </div>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-md font-bold shadow-sm ${isActive ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-amber-100 text-amber-700'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>"""

replacement = """      {/* Mobile Drawer Slide-out Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col w-[280px] max-w-[85vw] bg-white text-slate-600 h-full shadow-[20px_0_40px_rgb(0,0,0,0.1)] animate-in slide-in-from-left duration-300">
            <div className="p-5 flex items-center justify-between border-b border-slate-100 bg-white">
              <span className="text-xl font-black text-slate-900 tracking-tight">স্টোর ম্যানেজমেন্ট</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:bg-slate-100 hover:text-slate-700 p-2 rounded-xl transition-colors">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
              {navItems().map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                // Active color mappings for mobile specifically for a cleaner look
                const getMobileActiveStyle = (id: string) => {
                  const map: Record<string, string> = {
                    'dashboard': 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20',
                    'products': 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20',
                    'product-prices': 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20',
                    'inventory': 'bg-teal-500 text-white shadow-md shadow-teal-500/20',
                    'orders': 'bg-amber-500 text-white shadow-md shadow-amber-500/20',
                    'courier': 'bg-sky-500 text-white shadow-md shadow-sky-500/20',
                    'customers': 'bg-blue-500 text-white shadow-md shadow-blue-500/20',
                    'finances': 'bg-green-500 text-white shadow-md shadow-green-500/20',
                    'dues': 'bg-rose-500 text-white shadow-md shadow-rose-500/20',
                    'marketing': 'bg-purple-500 text-white shadow-md shadow-purple-500/20',
                    'landing-page': 'bg-fuchsia-500 text-white shadow-md shadow-fuchsia-500/20',
                    'settings': 'bg-slate-800 text-white shadow-md shadow-slate-800/20',
                  };
                  return map[id] || map['dashboard'];
                };

                return (
                  <button
                    key={`mobile-${item.id}`}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[14px] transition-all text-left font-bold ${
                      isActive 
                        ? getMobileActiveStyle(item.id)
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white drop-shadow-sm' : 'text-slate-400'} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black shadow-sm ${isActive ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-700'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>"""

if target in content:
    content = content.replace(target, replacement)
    print("Successfully updated mobile drawer menu.")
else:
    print("Could not find target mobile drawer menu.")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
