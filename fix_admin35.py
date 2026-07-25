import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('                                  Steadfast\n                                </span>', '                                  Steadfast\n                                </span>') # Wait, 4831 already has </span>!
content = content.replace('<span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md inline-block border border-indigo-100">{trackingId}\n', '<span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md inline-block border border-indigo-100">{trackingId}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
