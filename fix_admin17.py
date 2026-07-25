import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('                          ))\n                    }\n', '                          ))\n                  )}\n')
content = content.replace('                    ))\n                  }\n', '                    ))\n                  )}\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
