import os
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # We need to remove the wrapper `<span className="bn-safe whitespace-nowrap">...</span>`
    # OR we can just add `</span>` where it's missing.
    # It's safer to strip `<span className="bn-safe whitespace-nowrap">` and `<span className="bn-safe">` and just do CSS globally.
    
    # Strip bn-safe wrappers:
    # <span className="bn-safe whitespace-nowrap">STUFF</span> -> STUFF
    # But since `</span></span>` was replaced with `</span>`, we have missing `</span>`!
    
    # If we have `<span className="bn-safe whitespace-nowrap">&nbsp;৳{toBanglaNumber(price)}`, we should replace it with `&nbsp;৳{toBanglaNumber(price)}`
    # and we don't need to remove `</span>` because it's ALREADY MISSING!
    
    # Let's just remove `<span className="bn-safe whitespace-nowrap">` and `<span className="bn-safe">` entirely!
    # And then we might have extra `</span>` ? No, we removed `</span></span>` -> `</span>`.
    # So if we remove `<span ...>`, the single `</span>` will balance the outer `<span ...>`!
    # Perfect.
    
    new_content = content.replace('<span className="bn-safe whitespace-nowrap">', '')
    new_content = new_content.replace('<span className="bn-safe">', '')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            fix_file(os.path.join(root, file))

print("Done")
