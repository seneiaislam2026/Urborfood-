import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """                  {activeTab === 'dashboard' && 'ড্যাশবোর্ড ওভারভিউ'}
                  {activeTab === 'products' && 'পণ্য ম্যানেজমেন্ট'}
                  {activeTab === 'orders' && 'অর্ডার সমূহ'}"""

replacement = """                  {activeTab === 'dashboard' && 'ড্যাশবোর্ড ওভারভিউ'}
                  {activeTab === 'products' && 'পণ্য ম্যানেজমেন্ট'}
                  {activeTab === 'product-prices' && 'পণ্য মূল্য তালিকা'}
                  {activeTab === 'orders' && 'অর্ডার সমূহ'}"""

if target in content:
    content = content.replace(target, replacement)
    print("Updated header successfully")
else:
    print("Could not find target header")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
