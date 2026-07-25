import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-sm font-medium text-slate-800 block truncate leading-normal">{cust.name}\n', '<span className="text-sm font-medium text-slate-800 block truncate leading-normal">{cust.name}</span>\n')
content = content.replace('<span className="text-[10px] text-slate-500  block mt-0.5">{cust.phone}\n', '<span className="text-[10px] text-slate-500  block mt-0.5">{cust.phone}</span>\n')
content = content.replace('                                  </div>\n                                ))}', '                                  </div>\n                                ))}</div>')
content = content.replace('                              </div>\n                            )}', '                            )}')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
