import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span>{c.name}\n', '<span>{c.name}</span>\n')
content = content.replace('<span className="text-[10px] text-slate-500">{c.phone}\n', '<span className="text-[10px] text-slate-500">{c.phone}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
