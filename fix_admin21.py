import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{customer.name}\n', '<span className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{customer.name}</span>\n')
content = content.replace('                          ))\n                    }\n                      </tbody>', '                          ))\n                  )}\n                      </tbody>')
content = content.replace('                          ))\n                  }\n                      </tbody>', '                          ))\n                  )}\n                      </tbody>')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
