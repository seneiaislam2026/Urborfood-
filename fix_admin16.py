import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('                          ))\n                    }\n                        </div>', '                          ))\n                  )}\n                        </div>')
content = content.replace('                    ))\n                  }\n                </div>', '                    ))\n                  )}\n                </div>')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
