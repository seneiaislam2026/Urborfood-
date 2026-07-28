with open('src/main.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("if ('serviceWorker' in navigator) {", "if (false && 'serviceWorker' in navigator) {")

with open('src/main.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Disabled SW")
