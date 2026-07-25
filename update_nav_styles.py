with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# Replace getTabStyle colors
style_replacements = {
    "'dashboard': 'bg-indigo-50/80 text-indigo-700 shadow-sm border border-indigo-100 font-bold',": "'dashboard': 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20 font-bold',",
    "'products': 'bg-emerald-50/80 text-emerald-700 shadow-sm border border-emerald-100 font-bold',": "'products': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/20 font-bold',",
    "'inventory': 'bg-teal-50/80 text-teal-700 shadow-sm border border-teal-100 font-bold',": "'inventory': 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/20 font-bold',",
    "'orders': 'bg-amber-50/80 text-amber-700 shadow-sm border border-amber-100 font-bold',": "'orders': 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20 font-bold',",
    "'courier': 'bg-sky-50/80 text-sky-700 shadow-sm border border-sky-100 font-bold',": "'courier': 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/20 font-bold',",
    "'customers': 'bg-blue-50/80 text-blue-700 shadow-sm border border-blue-100 font-bold',": "'customers': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20 font-bold',",
    "'finances': 'bg-green-50/80 text-green-700 shadow-sm border border-green-100 font-bold',": "'finances': 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-500/20 font-bold',",
    "'dues': 'bg-rose-50/80 text-rose-700 shadow-sm border border-rose-100 font-bold',": "'dues': 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/20 font-bold',",
    "'marketing': 'bg-purple-50/80 text-purple-700 shadow-sm border border-purple-100 font-bold',": "'marketing': 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/20 font-bold',",
    "'landing-page': 'bg-fuchsia-50/80 text-fuchsia-700 shadow-sm border border-fuchsia-100 font-bold',": "'landing-page': 'bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white shadow-md shadow-fuchsia-500/20 font-bold',",
    "'settings': 'bg-slate-100/80 text-slate-800 shadow-sm border border-slate-200 font-bold',": "'settings': 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md shadow-slate-500/20 font-bold',"
}

for old, new in style_replacements.items():
    content = content.replace(old, new)

# Change getIconColor
old_icon_color = """  const getIconColor = (tabId: string, isActive: boolean) => {
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
  };"""

new_icon_color = """  const getIconColor = (tabId: string, isActive: boolean) => {
    if (!isActive) return 'text-slate-400 group-hover:text-slate-500 transition-colors group-hover:scale-110 duration-300';
    return 'text-white drop-shadow-sm scale-110 transition-transform duration-300';
  };"""

content = content.replace(old_icon_color, new_icon_color)

# Replace the active text and bg colors for the orders badge
content = content.replace(
    "`ml-auto text-[10px] px-2 py-0.5 rounded-md font-bold shadow-sm ${isActive ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'}`",
    "`ml-auto text-[10px] px-2 py-0.5 rounded-md font-bold shadow-sm ${isActive ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-amber-100 text-amber-700'}`"
)

# And make the sidebar itself have a nicer background instead of just bg-white
content = content.replace(
    'className="w-64 bg-white border-r border-slate-200/60 hidden md:flex flex-col flex-shrink-0 z-10"',
    'className="w-64 bg-[#f8fafc] border-r border-slate-200/60 hidden md:flex flex-col flex-shrink-0 z-10"'
)

content = content.replace(
    'className="relative flex flex-col w-72 max-w-[85vw] bg-white text-slate-600 h-full shadow-2xl',
    'className="relative flex flex-col w-72 max-w-[85vw] bg-[#f8fafc] text-slate-600 h-full shadow-2xl'
)

# Update sidebar header to match the new background
content = content.replace(
    'className="p-5 flex items-center justify-between border-b border-slate-200/60 bg-white"',
    'className="p-5 flex items-center justify-between border-b border-slate-200/60 bg-[#f8fafc]"'
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Updated nav styles.")
