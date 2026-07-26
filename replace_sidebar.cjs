const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// Replace getTabStyle and getIconColor
content = content.replace(
`  const getTabStyle = (tabId: string, isActive: boolean) => {
    const baseStyle = "w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[13.5px] transition-all text-left relative overflow-hidden group";
    if (!isActive) return \`\${baseStyle} text-slate-400 hover:bg-slate-800 hover:text-white font-medium\`;
    return \`\${baseStyle} bg-emerald-600 text-white font-bold shadow-[inset_3px_0_0_0_#34d399]\`;
  };

  const getIconColor = (tabId: string, isActive: boolean) => {
    if (!isActive) return 'text-slate-400 group-hover:text-slate-300 transition-colors group-hover:scale-110 duration-300';
    return 'text-white drop-shadow-sm scale-110 transition-transform duration-300';
  };`, 
`  // Using inline styles in the map for better control`);

const oldSidebarStart = `      {/* Primary Sidebar for Large Screens */}`;
const oldSidebarEnd = `      )}`;

const startIndex = content.indexOf(oldSidebarStart);
let endIndex = content.indexOf(oldSidebarEnd, startIndex);
if (startIndex !== -1 && endIndex !== -1) {
    endIndex += oldSidebarEnd.length;
    
    const newSidebar = `      {/* Primary Sidebar for Large Screens */}
      <div className="w-[280px] bg-slate-100 hidden md:flex flex-col flex-shrink-0 z-10 border-r border-slate-200/60 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#0f4d2a] text-white p-6 relative overflow-hidden rounded-b-3xl shadow-lg shrink-0 z-20">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-48 h-48 -mt-10 -mr-10" fill="currentColor">
              <path d="M50 0 C 80 0 100 20 100 50 C 100 80 80 100 50 100 C 20 100 0 80 0 50 C 0 20 20 0 50 0 Z" />
              <path d="M20 20 Q 50 50 80 20" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white p-1 rounded-full shadow-md">
              <img src={logoUrl || '/logo.svg'} alt="Logo" className="w-12 h-12 object-contain rounded-full" />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold tracking-tight">
                <span className="text-emerald-400">Urbor</span> Food
              </div>
              <span className="text-[13px] text-emerald-100/90 font-medium">{t.adminPanel}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pt-6 pb-4 z-10 bg-slate-100">
          <nav className="space-y-2">
            {navItems().map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={\`w-full flex items-center justify-between px-3 py-3 rounded-2xl text-[15px] transition-all text-left group border \${
                    isActive 
                      ? 'bg-[#2ea351] text-white font-bold shadow-md shadow-[#2ea351]/30 border-transparent' 
                      : 'bg-white hover:bg-emerald-50/50 text-slate-700 font-semibold border-slate-100 shadow-sm shadow-slate-200/50 hover:border-emerald-100'
                  }\`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={\`w-10 h-10 rounded-xl flex items-center justify-center transition-colors \${
                      isActive 
                        ? 'bg-white text-[#2ea351] shadow-sm' 
                        : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                    }\`}>
                      <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className={\`text-[11px] px-2 py-0.5 rounded-lg font-black shadow-sm \${isActive ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'}\`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={18} className={\`transition-transform \${isActive ? 'text-emerald-100' : 'text-slate-300 group-hover:text-emerald-400 group-hover:translate-x-0.5'}\`} strokeWidth={2.5} />
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 space-y-4">
            {/* Language Selection */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-200/50">
              <div className="flex items-center gap-2 text-slate-500 font-bold mb-3">
                <Globe size={18} className="text-slate-400" />
                <span className="text-sm">{t.languageLabel}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => setLang('bn')}
                  className={\`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all border \${
                    lang === 'bn' 
                      ? 'bg-white text-emerald-600 border-emerald-500 shadow-sm shadow-emerald-500/10' 
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }\`}
                >
                  বাংলা
                </button>
                <button 
                  type="button"
                  onClick={() => setLang('en')}
                  className={\`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all border \${
                    lang === 'en' 
                      ? 'bg-white text-emerald-600 border-emerald-500 shadow-sm shadow-emerald-500/10' 
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }\`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={handleLogoutClick} 
              className="w-full flex items-center justify-between bg-rose-50 hover:bg-rose-100 border border-rose-100 hover:border-rose-200 px-4 py-3.5 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3 text-rose-500 font-bold text-[15px]">
                <LogOut size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" /> 
                {t.logout}
              </div>
              <ChevronRight size={18} className="text-rose-300 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="mt-8 text-center pb-4 opacity-60">
            <p className="text-[11px] font-bold text-slate-500 flex items-center justify-center gap-1">
               <span className="text-emerald-600">Urbor Food</span> Admin Panel
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">&copy; 2025 All rights reserved</p>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Slide-out Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col w-[320px] max-w-[85vw] bg-slate-100 text-slate-800 h-full shadow-[20px_0_40px_rgb(0,0,0,0.3)] animate-in slide-in-from-left duration-300 rounded-r-[2rem] overflow-hidden">
            
            {/* Mobile Header Section */}
            <div className="bg-[#0f4d2a] text-white p-6 pb-8 relative overflow-hidden rounded-b-[2rem] shadow-lg shrink-0 z-20">
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-48 h-48 -mt-10 -mr-10" fill="currentColor">
                  <path d="M50 0 C 80 0 100 20 100 50 C 100 80 80 100 50 100 C 20 100 0 80 0 50 C 0 20 20 0 50 0 Z" />
                  <path d="M20 20 Q 50 50 80 20" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1 rounded-full shadow-md">
                    <img src={logoUrl || '/logo.svg'} alt="Logo" className="w-10 h-10 object-contain rounded-full" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xl font-bold tracking-tight">
                      <span className="text-emerald-400">Urbor</span> Food
                    </div>
                    <span className="text-[11px] text-emerald-100/90 font-medium">{t.adminPanel}</span>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition-colors">
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pt-6 pb-4 z-10 -mt-4 bg-slate-100">
              <nav className="space-y-2">
                {navItems().map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={\`mobile-\${item.id}\`}
                      onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                      className={\`w-full flex items-center justify-between px-3 py-3 rounded-2xl text-[15px] transition-all text-left group border \${
                        isActive 
                          ? 'bg-[#2ea351] text-white font-bold shadow-md shadow-[#2ea351]/30 border-transparent' 
                          : 'bg-white hover:bg-emerald-50/50 text-slate-700 font-semibold border-slate-100 shadow-sm shadow-slate-200/50 hover:border-emerald-100'
                      }\`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={\`w-10 h-10 rounded-xl flex items-center justify-center transition-colors \${
                          isActive 
                            ? 'bg-white text-[#2ea351] shadow-sm' 
                            : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                        }\`}>
                          <Icon size={20} strokeWidth={2.5} />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className={\`text-[11px] px-2 py-0.5 rounded-lg font-black shadow-sm \${isActive ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'}\`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight size={18} className={\`transition-transform \${isActive ? 'text-emerald-100' : 'text-slate-300'}\`} strokeWidth={2.5} />
                      </div>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 space-y-4">
                {/* Mobile Language Selection option */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-200/50">
                  <div className="flex items-center gap-2 text-slate-500 font-bold mb-3">
                    <Globe size={18} className="text-slate-400" />
                    <span className="text-sm">{t.languageLabel}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => setLang('bn')}
                      className={\`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all border \${
                        lang === 'bn' 
                          ? 'bg-white text-emerald-600 border-emerald-500 shadow-sm shadow-emerald-500/10' 
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      }\`}
                    >
                      বাংলা
                    </button>
                    <button 
                      type="button"
                      onClick={() => setLang('en')}
                      className={\`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all border \${
                        lang === 'en' 
                          ? 'bg-white text-emerald-600 border-emerald-500 shadow-sm shadow-emerald-500/10' 
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      }\`}
                    >
                      English
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={() => { handleLogoutClick(); setIsMobileMenuOpen(false); }} 
                  className="w-full flex items-center justify-between bg-rose-50 hover:bg-rose-100 border border-rose-100 hover:border-rose-200 px-4 py-3.5 rounded-2xl transition-all"
                >
                  <div className="flex items-center gap-3 text-rose-500 font-bold text-[15px]">
                    <LogOut size={20} strokeWidth={2.5} /> 
                    {t.logout}
                  </div>
                  <ChevronRight size={18} className="text-rose-300" strokeWidth={2.5} />
                </button>
              </div>

              <div className="mt-8 text-center pb-4 opacity-60">
                <p className="text-[11px] font-bold text-slate-500 flex items-center justify-center gap-1">
                  <span className="text-emerald-600">Urbor Food</span> Admin Panel
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">&copy; 2025 All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      )}`;
      
    content = content.substring(0, startIndex) + newSidebar + content.substring(endIndex);
    fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
    console.log("Success");
} else {
    console.error("Could not find the sidebar sections to replace.");
}

