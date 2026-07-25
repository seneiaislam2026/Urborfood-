import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    
    # We want to find JSX tags containing toBanglaNumber, {product.weight}, ৳ and add bn-safe to their className.
    # A simple regex for <span className="...">...৳...</span> or similar.
    # It's better to just do this for any tag that has className and contains these markers.
    
    # 1. toBanglaNumber
    # Find all elements like <span className="something">...toBanglaNumber...</span>
    # We can use regex to find `className="([^"]+)"` in the same line or before the marker.
    # Actually, a simpler way is just to add `bn-safe` to the classes where we know they exist.
    
    # We'll just replace commonly used classes for these spans:
    # We can use a regex to match className="[^"]*" that precedes a `>` and then contains our target string up to `</`
    # This is a bit complex in pure regex. Let's do targeted replacements instead.

    # We will search for all lines containing `toBanglaNumber`, `product.weight`, or `৳`
    # and if they have a `className="`, we append ` bn-safe` to it, IF it doesn't already have it.
    
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if ('toBanglaNumber' in line or 'product.weight' in line or '৳' in line) and 'className="' in line:
            if 'bn-safe' not in line:
                # Find the last className=" in the line (assuming one per line for simplicity)
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
