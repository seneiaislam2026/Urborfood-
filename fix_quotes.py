import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace(r"\'bg-emerald-200 text-emerald-800\'", "'bg-emerald-200 text-emerald-800'")
content = content.replace(r"\'bg-amber-100 text-amber-700\'", "'bg-amber-100 text-amber-700'")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
