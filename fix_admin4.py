import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'(<span className="text-\[10px\] text-slate-500 font-medium uppercase tracking-wider">\{t\.adminPanel\})([\s\n]*</div>)', r'\1</span>\2', content)

content = re.sub(r'(<span className="font-medium">\{item\.label\})([\s\n]*\{item\.badge && \()', r'\1</span>\2', content)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
