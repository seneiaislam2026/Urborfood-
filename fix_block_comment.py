import re
with open('src/context/CartContext.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'const \[notifications, setNotifications\] = useState<AppNotification\[\]>\(\[\]\); /\* .*?  \}\);\n\n  // Sound and Desktop Push Settings', 'const [notifications, setNotifications] = useState<AppNotification[]>([]);\n\n  // Sound and Desktop Push Settings', content, flags=re.DOTALL)

with open('src/context/CartContext.tsx', 'w') as f:
    f.write(content)
print("Done")
