import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """      'products': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/20 font-bold',
      'inventory': 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/20 font-bold',"""

replacement = """      'products': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/20 font-bold',
      'product-prices': 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-md shadow-cyan-500/20 font-bold',
      'inventory': 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/20 font-bold',"""

if target in content:
    content = content.replace(target, replacement)
    print("Updated color map successfully")
else:
    print("Could not find target color map")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
