import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    lines = content.split('\n')
    modified = False
    for i, line in enumerate(lines):
        if '৳' in line or 'toBanglaNumber' in line or 'Price' in line or 'price' in line or 'discount' in line:
            if 'bn-safe' in line:
                # Remove bn-safe class
                lines[i] = re.sub(r'\s*bn-safe\s*', ' ', line)
                lines[i] = lines[i].replace('className=" ', 'className="')
                lines[i] = lines[i].replace(' "', '"')
                modified = True

    if modified:
        new_content = '\n'.join(lines)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Done")
