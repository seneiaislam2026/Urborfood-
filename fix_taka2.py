import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    
    # Replace newlines followed by spaces then ৳ with &nbsp;৳
    content = re.sub(r'(\n\s*)৳', r'\1&nbsp;৳', content)
    # Also replace > ৳ with >&nbsp;৳
    content = content.replace('> ৳', '>&nbsp;৳')
    
    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Done")
