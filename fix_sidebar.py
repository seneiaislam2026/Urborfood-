import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# Replace Desktop styles
content = content.replace("""  const getTabStyle = (tabId: string, isActive: boolean) => {
    const baseStyle = "w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[13.5px] transition-all text-left relative overflow-hidden group";
    if (!isActive) return `${baseStyle} text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium`;

    const colorMap: Record<string, string> = {
      'dashboard': 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20 font-bold',
      'products': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/20 font-bold',
      'product-prices': 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-md shadow-cyan-500/20 font-bold',
      'inventory': 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/20 font-bold',
      'orders': 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20 font-bold',
      'courier': 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/20 font-bold',
      'customers': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20 font-bold',
      'finances': 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-500/20 font-bold',
      'dues': 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/20 font-bold',
      'marketing': 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/20 font-bold',
      'landing-page': 'bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white shadow-md shadow-fuchsia-500/20 font-bold',
      'settings': 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md shadow-slate-500/20 font-bold',
    };
    return `${baseStyle} ${colorMap[tabId] || colorMap['dashboard']}`;
  };

  const getIconColor = (tabId: string, isActive: boolean) => {
    if (!isActive) return 'text-slate-400 group-hover:text-slate-500 transition-colors group-hover:scale-110 duration-300';
    return 'text-white drop-shadow-sm scale-110 transition-transform duration-300';
  };""", """  const getTabStyle = (tabId: string, isActive: boolean) => {
    const baseStyle = "w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[13.5px] transition-all text-left relative overflow-hidden group";
    if (!isActive) return `${baseStyle} text-slate-500 hover:bg-slate-100/70 hover:text-slate-800 font-medium`;
    return `${baseStyle} bg-emerald-50 text-emerald-800 font-bold shadow-[inset_2px_0_0_0_#059669]`;
  };

  const getIconColor = (tabId: string, isActive: boolean) => {
    if (!isActive) return 'text-slate-400 group-hover:text-slate-500 transition-colors group-hover:scale-110 duration-300';
    return 'text-emerald-600 drop-shadow-sm scale-110 transition-transform duration-300';
  };""")

# Check if desktop styles replaced
print("Desktop styles replaced:", "shadow-[inset_2px_0_0_0_#059669]" in content)

# Replace Mobile Styles
mobile_pattern = r"""                // Active color mappings for mobile specifically for a cleaner look
                const getMobileActiveStyle = \(id: string\) => \{
                  const map: Record<string, string> = \{
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
                  \};
                  return map\[id\] \|\| map\['dashboard'\];
                \};

                return \(
                  <button
                    key=\{\`mobile-\$\{item\.id\}\`\}
                    onClick=\{\(\) => \{ setActiveTab\(item\.id\); setIsMobileMenuOpen\(false\); \}\}
                    className=\{\`w-full flex items-center gap-3\.5 px-4 py-3\.5 rounded-2xl text-\[14px\] transition-all text-left font-bold \$\{
                      isActive 
                        \? getMobileActiveStyle\(item\.id\)
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    \}\`\}
                  >
                    <Icon size=\{20\} strokeWidth=\{isActive \? 2\.5 : 2\} className=\{isActive \? 'text-white drop-shadow-sm' : 'text-slate-400'\} />"""

mobile_replacement = r"""                return (
                  <button
                    key={`mobile-${item.id}`}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[14px] transition-all text-left font-bold ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-800 shadow-[inset_3px_0_0_0_#059669]'
                        : 'text-slate-500 hover:bg-slate-100/70 hover:text-slate-800'
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-emerald-600 drop-shadow-sm' : 'text-slate-400'} />"""

content = re.sub(mobile_pattern, mobile_replacement, content)
print("Mobile styles replaced:", "inset_3px_0_0_0_#059669" in content)

# Also fix badges for active items on mobile
content = re.sub(
    r'<span className=\{\`text-\[10px\] px-2 py-0\.5 rounded-lg font-black shadow-sm \$\{isActive \? \'bg-white/25 text-white\' : \'bg-amber-100 text-amber-700\'\}\`\}>',
    r'<span className={`text-[10px] px-2 py-0.5 rounded-lg font-black shadow-sm ${isActive ? \'bg-emerald-200 text-emerald-800\' : \'bg-amber-100 text-amber-700\'}`}>',
    content
)

# And for desktop
content = re.sub(
    r'<span className=\{\`ml-auto text-\[10px\] px-2 py-0\.5 rounded-md font-bold shadow-sm \$\{isActive \? \'bg-white/20 text-white backdrop-blur-sm\' : \'bg-amber-100 text-amber-700\'\}\`\}>',
    r'<span className={`ml-auto text-[10px] px-2 py-0.5 rounded-md font-bold shadow-sm ${isActive ? \'bg-emerald-200 text-emerald-800\' : \'bg-amber-100 text-amber-700\'}`}>',
    content
)


with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)

