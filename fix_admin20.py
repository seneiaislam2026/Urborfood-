import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-[11px] md:text-sm font-medium text-slate-500 uppercase tracking-wider truncate mr-1">{stat.label}\n', '<span className="text-[11px] md:text-sm font-medium text-slate-500 uppercase tracking-wider truncate mr-1">{stat.label}</span>\n')
with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
