import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# First, extract the fancy mobile view from the wrong location
start_wrong = content.find("              {activeTab === 'product-prices' && (\n            <div className=\"bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0\">")
if start_wrong != -1:
    end_wrong = content.find("            </div>\n          )}\n          {activeTab === 'orders' && (", start_wrong)
    if end_wrong != -1:
        end_wrong_block = end_wrong + len("            </div>\n          )}")
        wrong_block = content[start_wrong:end_wrong_block]
        
        # Now delete this wrong block from the file
        content = content[:start_wrong] + content[end_wrong_block:]
        print("Deleted wrong block.")
        
        # Now find the real product-prices tab
        real_tab = content.find("          {/* TAB 3: ORDERS TRACKING */}\n          {activeTab === 'product-prices' && (")
        if real_tab != -1:
            mobile_view_start = content.find("              {/* Mobile View */}", real_tab)
            if mobile_view_start != -1:
                mobile_view_end = content.find("              {filteredProductsList.length === 0 && (", mobile_view_start)
                if mobile_view_end != -1:
                    # Extract the fancy mobile view from the wrong block we saved
                    fancy_mobile_start = wrong_block.find("              {/* Mobile View */}")
                    fancy_mobile_end = wrong_block.find("              {filteredProductsList.length === 0 && (", fancy_mobile_start)
                    fancy_mobile = wrong_block[fancy_mobile_start:fancy_mobile_end]
                    
                    # Replace the old mobile view with the fancy one
                    content = content[:mobile_view_start] + fancy_mobile + content[mobile_view_end:]
                    print("Updated real mobile view.")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
