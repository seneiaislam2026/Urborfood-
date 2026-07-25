with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

start_wrong = content.find("              {activeTab === 'product-prices' && (\n            <div className=\"bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0\">")
if start_wrong != -1:
    end_wrong = content.find("            </div>\n          )}\n          {activeTab === 'orders' && (", start_wrong)
    if end_wrong != -1:
        end_wrong_block = end_wrong + len("            </div>\n          )}")
        content = content[:start_wrong] + content[end_wrong_block:]
        print("Deleted wrong block.")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
