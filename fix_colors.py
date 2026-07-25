import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    
    # regex to find className="..." containing line-through
    # and replace text-gray-XXX, text-slate-XXX, text-zinc-XXX with text-rose-500
    # and decoration-XXX with decoration-rose-400
    
    def replace_line_through(match):
        cls = match.group(0)
        cls = re.sub(r'text-(gray|slate|zinc|neutral)-[0-9]{3}', 'text-rose-500', cls)
        cls = re.sub(r'decoration-(gray|slate|zinc|neutral)-[0-9]{3}', 'decoration-rose-400', cls)
        return cls

    content = re.sub(r'className="[^"]*line-through[^"]*"', replace_line_through, content)
    content = re.sub(r"className=\{`[^`]*line-through[^`]*`\}", replace_line_through, content)

    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Done")
