import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace("toLocaleString('bn-BD')}\n                    </div>", "toLocaleString('bn-BD')}</span>\n                    </div>")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
