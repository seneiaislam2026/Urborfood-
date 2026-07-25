import re
with open('src/context/CartContext.tsx', 'r') as f:
    content = f.read()

# Replace localStorage writes with Firestore writes
content = content.replace("localStorage.setItem('mega_products_v3', JSON.stringify(updated));", "setDoc(doc(db, 'appData', 'products'), { data: updated });")
content = content.replace("localStorage.setItem('mega_orders', JSON.stringify(updated));", "setDoc(doc(db, 'appData', 'orders'), { data: updated });")
content = content.replace("localStorage.setItem('mega_notifications', JSON.stringify(updated));", "setDoc(doc(db, 'appData', 'notifications'), { data: updated });")
content = content.replace("localStorage.setItem('mega_notifications', JSON.stringify(notifications));", "setDoc(doc(db, 'appData', 'notifications'), { data: notifications });")
# Wait, some places use `JSON.stringify(notifications)` inside an effect, I'll remove the effects.

content = re.sub(r'useEffect\(\(\) => \{\n    if \(isClient\) \{\n      localStorage\.setItem\(\'mega_notifications\'.*?\}, \[notifications\]\);', '', content, flags=re.DOTALL)
content = re.sub(r'useEffect\(\(\) => \{\n    if \(isClient\) \{\n      localStorage\.setItem\(\'mega_products_v3\'.*?\}, \[products\]\);', '', content, flags=re.DOTALL)
content = re.sub(r'useEffect\(\(\) => \{\n    if \(isClient\) \{\n      localStorage\.setItem\(\'mega_orders\'.*?\}, \[orders\]\);', '', content, flags=re.DOTALL)

with open('src/context/CartContext.tsx', 'w') as f:
    f.write(content)
print("Done")
