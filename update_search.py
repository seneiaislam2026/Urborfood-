import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """            <div className="flex items-center gap-2 sm:gap-4 shrink-0 font-bold">
              {activeTab === 'products' && ("""

replacement = """            <div className="flex items-center gap-2 sm:gap-4 shrink-0 font-bold">
              {(activeTab === 'products' || activeTab === 'product-prices') && ("""

if target in content:
    content = content.replace(target, replacement)
    print("Updated search bar visibility successfully")
else:
    print("Could not find target search bar visibility")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
