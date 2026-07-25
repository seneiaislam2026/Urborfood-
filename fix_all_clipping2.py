import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if ('toBanglaNumber' in line or 'product.weight' in line or '৳' in line or '১' in line or '২' in line or '০' in line) and 'className="' in line:
            if 'bn-safe' not in line:
                # Add bn-safe to the first className="[^"]*" we find
                lines[i] = re.sub(r'className="([^"]+)"', r'className="\1 bn-safe"', line)
                
    new_content = '\n'.join(lines)
    if new_content != original_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Done")
