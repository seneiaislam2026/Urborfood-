import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    # Replace leading-none with leading-tight everywhere to prevent vertical clipping
    content = content.replace('leading-none', 'leading-tight')
    
    # Optional: replace tracking-tight in price tags if it's there
    content = re.sub(r'tracking-tight([^>]*>৳\{toBanglaNumber)', r'tracking-normal\1', content)
    content = re.sub(r'tracking-tight([^>]*>৳)', r'tracking-normal\1', content)

    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Done")
