import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="block text-slate-900 font-bold text-[13px]">{p.name}\n', '<span className="block text-slate-900 font-bold text-[13px]">{p.name}</span>\n')
content = content.replace('<span className="text-[10px] text-slate-500">{p.category} • {p.weight}\n', '<span className="text-[10px] text-slate-500">{p.category} • {p.weight}</span>\n')
content = content.replace('<span className="font-semibold text-slate-700">&nbsp;৳{cost}\n', '<span className="font-semibold text-slate-700">&nbsp;৳{cost}</span>\n')
content = content.replace('<span className="font-bold text-slate-900">&nbsp;৳{p.discountedPrice || p.originalPrice}\n', '<span className="font-bold text-slate-900">&nbsp;৳{p.discountedPrice || p.originalPrice}</span>\n')
content = content.replace('<span className="text-[10px] text-rose-500 line-through">&nbsp;৳{p.originalPrice}\n', '<span className="text-[10px] text-rose-500 line-through">&nbsp;৳{p.originalPrice}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
