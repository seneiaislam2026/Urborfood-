import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-sm font-medium text-slate-800 truncate">{item.note}\n', '<span className="text-sm font-medium text-slate-800 truncate">{item.note}</span>\n')
content = content.replace('                          })\n                        )}', '                          })\n                  )}')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
