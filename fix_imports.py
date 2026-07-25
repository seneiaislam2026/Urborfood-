with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace("Send, Package,", "Send, Package, Leaf, CheckCircle2, AlertTriangle,")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
