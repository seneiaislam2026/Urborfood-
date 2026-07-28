import os

def fix_imports(filepath, depth):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Calculate relative path
    rel = '../' * depth + 'utils/storage'
    if depth == 0:
        rel = './utils/storage'
        
    content = content.replace("import { safeGetItem, safeSetItem, safeRemoveItem } from '@/src/utils/storage';", f"import {{ safeGetItem, safeSetItem, safeRemoveItem }} from '{rel}';")
    
    # fix pwa-icon.ts misplaced import
    if 'pwa-icon.ts' in filepath:
        content = content.replace("export function updatePWAIcon() {\nimport { safeGetItem, safeSetItem, safeRemoveItem } from './utils/storage';", "import { safeGetItem, safeSetItem, safeRemoveItem } from './utils/storage';\nexport function updatePWAIcon() {")
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            depth = len(root.split('/')) - 1
            if root == 'src': depth = 0
            fix_imports(os.path.join(root, file), depth)
            
print("Fixed imports")
