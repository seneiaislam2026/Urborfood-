import os
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find `toBanglaNumber(something)}</span>` and replace with `toBanglaNumber(something)}`
    # Also find `toBanglaNumber(something))}` if it exists, etc.
    # regex: toBanglaNumber(.*?\)\}</span> -> toBanglaNumber\(\1\)\}
    new_content = re.sub(r'(toBanglaNumber\([^)]+\)\})</span>', r'\1', content)
    
    # Also in case there are nested parenthesis
    new_content = re.sub(r'toBanglaNumber\(([^)]+\([^)]+\)[^)]*)\)\}</span>', r'toBanglaNumber(\1)}', new_content)
    
    # And toBanglaNumber without extra closing:
    new_content = re.sub(r'toBanglaNumber\((.*?)\)\}</span>', r'toBanglaNumber(\1)}', new_content)
    
    # Check if there are any remaining `}</span>` after `toBanglaNumber`
    
    # Let's just do a simpler search and replace:
    new_content = new_content.replace(')}</span>', ')}')

    # Just in case we broke legitimate `)}</span>` where `)}` was from some logic, 
    # let's be careful. The ONLY places `toBanglaNumber` is used is `৳{toBanglaNumber(price)}`.
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed tags in {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            fix_file(os.path.join(root, file))

print("Done")
