import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<pre className="whitespace-pre-wrap">{JSON.stringify(trackingResult, null, 2)}</pre>\n                              )}', '<pre className="whitespace-pre-wrap">{JSON.stringify(trackingResult, null, 2)}</pre>\n                                </div>\n                              )}')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
