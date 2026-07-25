import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# Just remove the ones we added in line 4
content = content.replace("Send, Package, Leaf, CheckCircle2, AlertTriangle,", "Send, Package, Leaf,")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
