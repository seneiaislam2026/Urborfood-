import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'localStorage' not in content:
        return
        
    if 'safeGetItem' in content:
        return # already patched

    # Replace localStorage.getItem
    content = re.sub(r'localStorage\.getItem\(([^)]+)\)', r'safeGetItem(\1)', content)
    # Replace localStorage.setItem
    content = re.sub(r'localStorage\.setItem\(([^,]+),\s*([^)]+)\)', r'safeSetItem(\1, \2)', content)
    # Replace localStorage.removeItem
    content = re.sub(r'localStorage\.removeItem\(([^)]+)\)', r'safeRemoveItem(\1)', content)
    
    # Add import at top
    import_stmt = "import { safeGetItem, safeSetItem, safeRemoveItem } from '@/utils/storage';\n"
    # Adjust path if needed, but since we are replacing blindly, let's use a relative path logic or alias.
    # We have '@' alias in vite.config.ts! `@/src/...` or `@/utils/...` ?
    # Let's check alias in vite: `alias: { '@': path.resolve(__dirname, '.') }` => `@/src/utils/storage`
    import_stmt = "import { safeGetItem, safeSetItem, safeRemoveItem } from '@/src/utils/storage';\n"
    
    # insert after the last import, or at top
    lines = content.split('\n')
    last_import_idx = 0
    for i, line in enumerate(lines):
        if line.startswith('import '):
            last_import_idx = i
            
    lines.insert(last_import_idx + 1, import_stmt)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))

print("Done patching.")
