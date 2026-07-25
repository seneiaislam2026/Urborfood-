import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-base font-black text-slate-900 tracking-normal">&nbsp;৳{customer.totalSpent.toLocaleString(\'bn-BD\')}\n', '<span className="text-base font-black text-slate-900 tracking-normal">&nbsp;৳{customer.totalSpent.toLocaleString(\'bn-BD\')}</span>\n')
content = content.replace('                        ))\n                    }\n                    </div>', '                        ))\n                  )}\n                    </div>')
content = content.replace('                        ))\n                  }\n                    </div>', '                        ))\n                  )}\n                    </div>')


with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
