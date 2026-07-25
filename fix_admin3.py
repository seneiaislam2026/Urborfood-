with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{t.adminPanel}\n            </div>', '<span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{t.adminPanel}</span>\n            </div>')
content = content.replace('<span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{t.adminPanel}\n                </div>', '<span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{t.adminPanel}</span>\n                </div>')

# Fix line 1246 missing closing span:
# <span className="font-medium">{item.label}
content = content.replace('<span className="font-medium">{item.label}\n                    {item.badge && (', '<span className="font-medium">{item.label}</span>\n                    {item.badge && (')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
