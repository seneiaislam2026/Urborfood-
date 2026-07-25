import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'(<span className="flex-1">\{item\.label\})([\s\n]*\{item\.badge && \()', r'\1</span>\2', content)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
