with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "? 'bg-emerald-500/20 text-emerald-400 shadow-sm' \n                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'",
    "? 'bg-white text-emerald-600 shadow-sm border border-slate-200/60' \n                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'"
)

content = content.replace(
    "? 'bg-emerald-500/20 text-emerald-400 shadow-sm' \n                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'",
    "? 'bg-white text-emerald-600 shadow-sm border border-slate-200/60' \n                      : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'"
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Fixed lang toggle")
