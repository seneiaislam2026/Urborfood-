import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """    { id: 'products', label: t.productManagement, icon: Package },
    { id: 'inventory', label: t.inventoryControl, icon: Package },"""

replacement = """    { id: 'products', label: t.productManagement, icon: Package },
    { id: 'product-prices', label: 'পণ্য মূল্য তালিকা', icon: DollarSign },
    { id: 'inventory', label: t.inventoryControl, icon: Package },"""

if target in content:
    content = content.replace(target, replacement)
    print("Updated nav items successfully")
else:
    print("Could not find target nav items")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
