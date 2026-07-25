import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-xs font-bold text-slate-900">&nbsp;৳{order.total.toLocaleString(\'bn-BD\')}\n', '<span className="text-xs font-bold text-slate-900">&nbsp;৳{order.total.toLocaleString(\'bn-BD\')}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
