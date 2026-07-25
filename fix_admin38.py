import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="truncate pr-2">{p.name}\n', '<span className="truncate pr-2">{p.name}</span>\n')
content = content.replace('<span className="shrink-0 text-emerald-600">&nbsp;৳{price}\n', '<span className="shrink-0 text-emerald-600">&nbsp;৳{price}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
