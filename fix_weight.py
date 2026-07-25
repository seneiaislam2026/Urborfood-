import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    
    # Add pl-1 and inline-block to spans containing product.weight if not already there
    content = content.replace('{product.weight} এর প্যাকেজ', '&nbsp;{product.weight} এর প্যাকেজ')
    content = content.replace('{product.weight || \'১ কেজি\'}', '&nbsp;{product.weight || \'১ কেজি\'}')
    
    # In ProductLandingPage.tsx
    content = content.replace('<span className="text-[13px] text-slate-500 font-medium">', '<span className="text-[13px] text-slate-500 font-medium pl-0.5 inline-block">')
    
    # ProductCard.tsx
    content = content.replace('<span className="text-[11px] font-medium text-slate-500  leading-relaxed">', '<span className="text-[11px] font-medium text-slate-500 leading-relaxed pl-0.5 inline-block">')
    
    # Also in ProductLandingPage.tsx
    content = content.replace('<span className="text-emerald-700">{product.weight}</span>', '<span className="text-emerald-700 pl-0.5 inline-block">&nbsp;{product.weight}</span>')

    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Done")
