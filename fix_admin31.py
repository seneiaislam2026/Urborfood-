import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-[10px] text-slate-500">ID: #{p.id}\n', '<span className="text-[10px] text-slate-500">ID: #{p.id}</span>\n')
content = content.replace('                          })}\n                        </tbody>', '                          })}\n                        </tbody>')
# Let's fix line 4385
content = content.replace('                          })}\n                        </tbody>', '                          })}\n                        </tbody>')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
