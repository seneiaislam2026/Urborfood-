import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-slate-800 font-bold block truncate">{item.name}\n', '<span className="text-slate-800 font-bold block truncate">{item.name}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
