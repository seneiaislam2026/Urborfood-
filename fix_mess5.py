import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

start_wrong = content.find("              {activeTab === 'product-prices' && (")
if start_wrong != -1:
    end_wrong = content.find("          {activeTab === 'orders' && (", start_wrong)
    if end_wrong != -1:
        content = content[:start_wrong] + content[end_wrong:]
        print("Deleted wrong block.")
        with open('src/pages/AdminDashboard.tsx', 'w') as f:
            f.write(content)
