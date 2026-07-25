import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-[#115e5a]  font-bold select-all">{bookingId}\n', '<span className="text-[#115e5a]  font-bold select-all">{bookingId}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
