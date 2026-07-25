import re
import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# Add getTabStyle inside the component, near the top of AdminDashboard function.
# Look for: export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
# and then add the helpers.

nav_items_def = """
  const getTabStyle = (tabId: string, isActive: boolean) => {
    const baseStyle = "w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[13.5px] transition-all text-left relative overflow-hidden group";
    if (!isActive) return `${baseStyle} text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium`;

    const colorMap: Record<string, string> = {
      'dashboard': 'bg-indigo-50/80 text-indigo-700 shadow-sm border border-indigo-100 font-bold',
      'products': 'bg-emerald-50/80 text-emerald-700 shadow-sm border border-emerald-100 font-bold',
      'inventory': 'bg-teal-50/80 text-teal-700 shadow-sm border border-teal-100 font-bold',
      'orders': 'bg-amber-50/80 text-amber-700 shadow-sm border border-amber-100 font-bold',
      'courier': 'bg-sky-50/80 text-sky-700 shadow-sm border border-sky-100 font-bold',
      'customers': 'bg-blue-50/80 text-blue-700 shadow-sm border border-blue-100 font-bold',
      'finances': 'bg-green-50/80 text-green-700 shadow-sm border border-green-100 font-bold',
      'dues': 'bg-rose-50/80 text-rose-700 shadow-sm border border-rose-100 font-bold',
      'marketing': 'bg-purple-50/80 text-purple-700 shadow-sm border border-purple-100 font-bold',
      'landing-page': 'bg-fuchsia-50/80 text-fuchsia-700 shadow-sm border border-fuchsia-100 font-bold',
      'settings': 'bg-slate-100/80 text-slate-800 shadow-sm border border-slate-200 font-bold',
    };
    return `${baseStyle} ${colorMap[tabId] || colorMap['dashboard']}`;
  };

  const getIconColor = (tabId: string, isActive: boolean) => {
    if (!isActive) return 'text-slate-400 group-hover:text-slate-500 transition-colors group-hover:scale-110 duration-300';
    const iconColorMap: Record<string, string> = {
      'dashboard': 'text-indigo-600',
      'products': 'text-emerald-600',
      'inventory': 'text-teal-600',
      'orders': 'text-amber-600',
      'courier': 'text-sky-600',
      'customers': 'text-blue-600',
      'finances': 'text-green-600',
      'dues': 'text-rose-600',
      'marketing': 'text-purple-600',
      'landing-page': 'text-fuchsia-600',
      'settings': 'text-slate-600',
    };
    return `${iconColorMap[tabId]} drop-shadow-sm scale-110 transition-transform duration-300`;
  };

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: BarChart3 },
    { id: 'products', label: t.productManagement, icon: Package },
    { id: 'inventory', label: t.inventoryControl, icon: Package },
    { id: 'orders', label: t.orders, icon: ShoppingBag, badge: pendingOrdersCount > 0 ? pendingOrdersCount : null },
    { id: 'courier', label: t.courierDashboard, icon: Truck },
    { id: 'customers', label: t.customerList, icon: Users },
    { id: 'finances', label: t.finances, icon: Wallet },
    { id: 'dues', label: t.dues, icon: BookOpen },
    { id: 'marketing', label: t.marketing, icon: Megaphone },
    { id: 'landing-page', label: t.landingPage, icon: MonitorSmartphone },
    { id: 'settings', label: t.settings, icon: Settings },
  ];
"""

# Insert helpers
if 'getTabStyle = (tabId: string, isActive: boolean)' not in content:
    content = content.replace(
        "export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {",
        "export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {\n" + nav_items_def
    )

desktop_nav_pattern = r'<nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">(.*?)</nav>\n\s*\{\/\* Language Selection option'
desktop_replacement = """<nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={getTabStyle(item.id, isActive)}
              >
                <div className="relative">
                  <Icon size={18} className={getIconColor(item.id, isActive)} />
                  {isActive && <div className="absolute -inset-2 bg-current opacity-10 rounded-full blur-md" />}
                </div>
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-md font-bold shadow-sm ${isActive ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        {/* Language Selection option"""

content = re.sub(desktop_nav_pattern, desktop_replacement, content, flags=re.DOTALL)

mobile_nav_pattern = r'<nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">\s*<button.*?onClick=\{\(\) => \{ setActiveTab\(' + r"'" + r'dashboard\'.*?</nav>'
mobile_replacement = """<nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
              {navItems.map((item) => {
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
                      <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-md font-bold shadow-sm ${isActive ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>"""

content = re.sub(mobile_nav_pattern, mobile_replacement, content, flags=re.DOTALL)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)

print("Nav refactored.")
