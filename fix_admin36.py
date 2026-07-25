import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="font-bold text-slate-800 text-[15px]">#{o.id}\n', '<span className="font-bold text-slate-800 text-[15px]">#{o.id}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
