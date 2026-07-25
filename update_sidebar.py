import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# 1. Update getTabStyle and getIconColor
pattern_tab_style = re.compile(r'const getTabStyle = \(tabId: string, isActive: boolean\) => \{.*?\};', re.DOTALL)
new_tab_style = '''const getTabStyle = (tabId: string, isActive: boolean) => {
    const baseStyle = "w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[13.5px] transition-all text-left relative overflow-hidden group";
    if (!isActive) return `${baseStyle} text-slate-400 hover:bg-slate-800 hover:text-white font-medium`;
    return `${baseStyle} bg-emerald-600 text-white font-bold shadow-[inset_3px_0_0_0_#34d399]`;
  };'''

content = pattern_tab_style.sub(new_tab_style, content)

pattern_icon_color = re.compile(r'const getIconColor = \(tabId: string, isActive: boolean\) => \{.*?\};', re.DOTALL)
new_icon_color = '''const getIconColor = (tabId: string, isActive: boolean) => {
    if (!isActive) return 'text-slate-400 group-hover:text-slate-300 transition-colors group-hover:scale-110 duration-300';
    return 'text-white drop-shadow-sm scale-110 transition-transform duration-300';
  };'''

content = pattern_icon_color.sub(new_icon_color, content)

# 2. Update Desktop Sidebar
# {isActive ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-100 text-amber-700'}`}>
content = content.replace(
    "{isActive ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-100 text-amber-700'}",
    "{isActive ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'}"
)

# `<div className="w-64 bg-[#f8fafc] border-r border-slate-200/60 hidden md:flex flex-col flex-shrink-0 z-10">`
content = content.replace(
    '<div className="w-64 bg-[#f8fafc] border-r border-slate-200/60 hidden md:flex flex-col flex-shrink-0 z-10">',
    '<div className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col flex-shrink-0 z-10 text-slate-300">'
)

# `<div className="p-5 flex items-center justify-between border-b border-slate-200/60 bg-[#f8fafc]">`
content = content.replace(
    '<div className="p-5 flex items-center justify-between border-b border-slate-200/60 bg-[#f8fafc]">',
    '<div className="p-5 flex items-center justify-between border-b border-slate-800 bg-slate-900 text-white">'
)

content = content.replace(
    '<span className="text-lg font-bold text-slate-900 tracking-tight leading-normal">স্টোর ম্যানেজমেন্ট</span>',
    '<span className="text-lg font-bold tracking-tight leading-normal">স্টোর ম্যানেজমেন্ট</span>'
)

content = content.replace(
    '<span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-md font-semibold border border-slate-200">LIVE</span>',
    '<span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-md font-semibold border border-emerald-500/30">LIVE</span>'
)

# `<div className="p-4 border-t border-slate-200/60 bg-[#f8fafc]">`
content = content.replace(
    '<div className="p-4 border-t border-slate-200/60 bg-[#f8fafc]">',
    '<div className="p-4 border-t border-slate-800 bg-slate-900">'
)

content = content.replace(
    'className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-bold text-slate-500 hover:bg-slate-100 hover:text-rose-600 transition-colors"',
    'className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-bold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"'
)

# 3. Update Mobile Sidebar
# `<div className="relative flex flex-col w-[280px] max-w-[85vw] bg-white text-slate-600 h-full shadow-[20px_0_40px_rgb(0,0,0,0.1)] animate-in slide-in-from-left duration-300">`
content = content.replace(
    '<div className="relative flex flex-col w-[280px] max-w-[85vw] bg-white text-slate-600 h-full shadow-[20px_0_40px_rgb(0,0,0,0.1)] animate-in slide-in-from-left duration-300">',
    '<div className="relative flex flex-col w-[280px] max-w-[85vw] bg-slate-900 text-slate-300 h-full shadow-[20px_0_40px_rgb(0,0,0,0.3)] animate-in slide-in-from-left duration-300">'
)

# `<div className="p-5 flex items-center justify-between border-b border-slate-200/50 bg-[#f8fafc]">`
content = content.replace(
    '<div className="p-5 flex items-center justify-between border-b border-slate-200/50 bg-[#f8fafc]">',
    '<div className="p-5 flex items-center justify-between border-b border-slate-800 bg-slate-900 text-white">'
)

content = content.replace(
    '<span className="text-xl font-black text-slate-900 tracking-tight">স্টোর ম্যানেজমেন্ট</span>',
    '<span className="text-xl font-black tracking-tight">স্টোর ম্যানেজমেন্ট</span>'
)

content = content.replace(
    'className="text-slate-400 hover:bg-slate-100 hover:text-slate-700 p-2 rounded-xl transition-colors"',
    'className="text-slate-400 hover:bg-slate-800 hover:text-white p-2 rounded-xl transition-colors"'
)

content = content.replace(
    "? 'bg-emerald-50 text-emerald-800 shadow-[inset_3px_0_0_0_#059669]'",
    "? 'bg-emerald-600 text-white shadow-[inset_3px_0_0_0_#34d399]'"
)

content = content.replace(
    ": 'text-slate-500 hover:bg-slate-100/70 hover:text-slate-800'",
    ": 'text-slate-400 hover:bg-slate-800 hover:text-white'"
)

content = content.replace(
    "className={isActive ? 'text-emerald-600 drop-shadow-sm' : 'text-slate-400'}",
    "className={isActive ? 'text-white drop-shadow-sm' : 'text-slate-400'}"
)

# `<div className="p-4 border-t border-slate-100 bg-[#f8fafc]/50">`
content = content.replace(
    '<div className="p-4 border-t border-slate-100 bg-[#f8fafc]/50">',
    '<div className="p-4 border-t border-slate-800 bg-slate-900">'
)

content = content.replace(
    'className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[14px] font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"',
    'className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[14px] font-bold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"'
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)

print("Theme changed successfully!")
