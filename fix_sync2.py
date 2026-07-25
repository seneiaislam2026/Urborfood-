import re
with open('src/context/CartContext.tsx', 'r') as f:
    content = f.read()

# I will find the leftover `        }        return p;      });` logic and remove it
content = re.sub(r'        \}\n        return p;\n      \}\);\n      // Merge new mock products.*?const initialProducts = mockProducts\.map\(p => \(\{\n.*?\n  \}\)\);\n  localStorage\.setItem\(\'mega_products_v3\', JSON\.stringify\(initialProducts\)\);\n  return initialProducts;\n\};', '', content, flags=re.DOTALL)

with open('src/context/CartContext.tsx', 'w') as f:
    f.write(content)
print("Done")
