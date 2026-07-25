import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="font-bold text-slate-900">&nbsp;৳{sell}\n', '<span className="font-bold text-slate-900">&nbsp;৳{sell}</span>\n')
content = content.replace('{profit > 0 ? \'+\' : \'\'}৳{profit}\n                              </span>', '{profit > 0 ? \'+\' : \'\'}৳{profit}\n                              </span>')
content = content.replace('<span className={`text-[10px] ${profit > 0 ? \'text-emerald-500\' : profit < 0 ? \'text-rose-500\' : \'text-slate-400\'}`}>\n                                {margin}% মার্জিন\n', '<span className={`text-[10px] ${profit > 0 ? \'text-emerald-500\' : profit < 0 ? \'text-rose-500\' : \'text-slate-400\'}`}>\n                                {margin}% মার্জিন\n                              </span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
