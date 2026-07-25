import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<ImageLoader src={p.image} alt={p.name} className="w-full h-full object-cover" />\n                            )}', '<ImageLoader src={p.image} alt={p.name} className="w-full h-full object-cover" />\n                              </div>\n                            )}')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
