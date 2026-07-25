import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-sm font-medium text-slate-700">&nbsp;৳{d.amount}\n', '<span className="text-sm font-medium text-slate-700">&nbsp;৳{d.amount}</span>\n')
content = content.replace('<span className="text-sm font-medium text-emerald-600">&nbsp;৳{d.paidAmount}\n', '<span className="text-sm font-medium text-emerald-600">&nbsp;৳{d.paidAmount}</span>\n')
content = content.replace('<span className="text-sm font-medium text-rose-600">&nbsp;৳{d.amount - d.paidAmount}\n', '<span className="text-sm font-medium text-rose-600">&nbsp;৳{d.amount - d.paidAmount}</span>\n')

# Line 3648:   }) )} 
content = content.replace('                      })\n                    )}', '                      })\n                  )}')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
