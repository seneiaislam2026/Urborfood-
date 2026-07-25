import os
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    if "CartDrawer" in filepath:
        new_content = new_content.replace('<span>&nbsp;৳{toBanglaNumber(cartTotal)}\n                </div>', '<span>&nbsp;৳{toBanglaNumber(cartTotal)}</span>\n                </div>')
    
    new_content = re.sub(r'(<span[^>]*>(?:&nbsp;)?৳\{toBanglaNumber\([^}]+\)\})([\s\n]*<)', r'\1</span>\2', new_content)

    # Some of them might get double spans now, let's clean it up
    new_content = new_content.replace('</span></span>', '</span>')
    
    # Check for `<span ...>{toBanglaNumber(...)}` missing closing
    new_content = re.sub(r'(<span[^>]*>\{toBanglaNumber\([^}]+\)\})([\s\n]*<)', r'\1</span>\2', new_content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed final {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            fix_file(os.path.join(root, file))

print("Done")
