import re

with open('src/components/layout/Header.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Desktop Navigation
old_desktop_class = r'link\.name === \'শপ\' \? \'bg-emerald-50 text-emerald-700\' : \'text-slate-600 hover:text-\[#0B6B3A\] hover:bg-emerald-50/50\''
new_desktop_class = r"link.name === 'শপ' ? 'bg-[#0b6132]/10 text-[#0b6132]' : 'text-[#0b6132] hover:text-[#f58321] hover:bg-[#f58321]/10'"
content = re.sub(old_desktop_class, new_desktop_class, content)

# Also update the Logo text colors
content = content.replace('text-[#0B6B3A]', 'text-[#0b6132]')

# Mobile Navigation Links
# There are multiple instances of text-slate-700 hover:text-[#0B6B3A] hover:bg-emerald-50/70
# Let's replace them specifically in the mobile menu block
old_mobile_class = r'text-slate-700 hover:text-\[#0B6B3A\] hover:bg-emerald-50/70'
new_mobile_class = r'text-[#0b6132] hover:text-[#f58321] hover:bg-[#f58321]/10'
content = re.sub(old_mobile_class, new_mobile_class, content)

# And categories in mobile menu
old_cat_class = r'text-slate-600 hover:text-\[#0B6B3A\] hover:bg-emerald-50'
new_cat_class = r'text-[#0b6132] hover:text-[#f58321] hover:bg-[#f58321]/10'
content = re.sub(old_cat_class, new_cat_class, content)

# And the order now button in header
old_order_btn = r'bg-\[#0B6B3A\] text-white'
new_order_btn = r'bg-[#f58321] text-white hover:bg-[#d86a10]'
content = re.sub(old_order_btn, new_order_btn, content)

# Order now mobile bottom
old_order_btn2 = r'bg-\[#0B6B3A\] text-white px-7 py-2\.5'
new_order_btn2 = r'bg-[#f58321] text-white px-7 py-2.5'
content = re.sub(old_order_btn2, new_order_btn2, content)

with open('src/components/layout/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
