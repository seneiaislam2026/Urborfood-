import re
with open('src/pages/HomePage.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'(<span className="text-\[\#0b3d18\] font-black">ক্যাটাগরি: \{getCategoryNameInBangla\(activeCategory \|\| \'\'\)\})([\s\n]*\)\})', r'\1</span>\2', content)

with open('src/pages/HomePage.tsx', 'w') as f:
    f.write(content)
print("Done")
