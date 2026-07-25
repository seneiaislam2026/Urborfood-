import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="font-medium">{item.label}\n                {item.badge && (', '<span className="font-medium">{item.label}</span>\n                {item.badge && (')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
