import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'(<span className={`font-semibold \$\{n\.read \? \'text-slate-600\' : \'text-emerald-600\'\}`\}>\{n\.title\})([\s\n]*<span className="text-\[9px\] text-slate-500)', r'\1</span>\2', content)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
