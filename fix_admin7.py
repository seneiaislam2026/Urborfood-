import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-1.5 rounded whitespace-nowrap shrink-0">#{order.id}\n', '<span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-1.5 rounded whitespace-nowrap shrink-0">#{order.id}</span>\n')
content = content.replace('<span className="text-slate-900 font-black text-sm">&nbsp;৳{Number(order.total).toLocaleString(\'bn-BD\')}\n', '<span className="text-slate-900 font-black text-sm">&nbsp;৳{Number(order.total).toLocaleString(\'bn-BD\')}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
