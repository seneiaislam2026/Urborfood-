import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-sm font-bold text-slate-700">&nbsp;৳{cost}\n', '<span className="text-sm font-bold text-slate-700">&nbsp;৳{cost}</span>\n')
content = content.replace('<span className="text-sm font-bold text-slate-900">&nbsp;৳{sell}\n', '<span className="text-sm font-bold text-slate-900">&nbsp;৳{sell}</span>\n')

# Check line 2108 for missing span on profit
content = content.replace('<span className={`text-sm font-black ${profit > 0 ? \'text-emerald-600\' : profit < 0 ? \'text-rose-600\' : \'text-slate-500\'}`}>\n                              {profit > 0 ? \'+\' : \'\'}৳{profit}\n', '<span className={`text-sm font-black ${profit > 0 ? \'text-emerald-600\' : profit < 0 ? \'text-rose-600\' : \'text-slate-500\'}`}>\n                              {profit > 0 ? \'+\' : \'\'}৳{profit}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
