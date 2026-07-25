import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# Enhance mobile header
content = content.replace(
    '<div className="p-5 flex items-center justify-between border-b border-slate-100 bg-white">',
    '<div className="p-5 flex items-center justify-between border-b border-slate-200/50 bg-[#f8fafc]">'
)

content = content.replace(
    '<span className="text-xl font-black text-slate-900 tracking-tight">স্টোর ম্যানেজমেন্ট</span>',
    """<div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 tracking-tight">স্টোর ম্যানেজমেন্ট</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{t.adminPanel}</span>
              </div>"""
)

# Improve Language UI
content = content.replace(
    """<div className="flex gap-1.5 p-1 bg-slate-100/80 rounded-lg border border-slate-200/60">""",
    """<div className="flex gap-1 p-1 bg-slate-100/70 rounded-lg border border-slate-200/50">"""
)

content = content.replace(
    """text-[10px] font-bold rounded-lg transition-all""",
    """text-[11px] font-bold rounded-md transition-all"""
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)

