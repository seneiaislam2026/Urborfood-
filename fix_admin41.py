import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-slate-900 font-bold">&nbsp;৳{item.quantity * item.price}\n', '<span className="text-slate-900 font-bold">&nbsp;৳{item.quantity * item.price}</span>\n')
content = content.replace('<span className="text-emerald-950 font-bold text-base">&nbsp;৳{selectedOrder.total}\n', '<span className="text-emerald-950 font-bold text-base">&nbsp;৳{selectedOrder.total}</span>\n')
content = content.replace('                    ))}\n                    <div', '                    ))}</div>\n                    <div')
content = content.replace('                      ))}</div>\n                    <div', '                      ))}\n                    <div')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
