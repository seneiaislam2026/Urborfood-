import re
with open('src/pages/HomePage.tsx', 'r') as f:
    content = f.read()

# Make sure the title has the right style
content = content.replace(
    'className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">জনপ্রিয় পণ্য',
    'className="text-[22px] font-black text-[#1e293b] tracking-tight">জনপ্রিয় পণ্য'
)

with open('src/pages/HomePage.tsx', 'w') as f:
    f.write(content)
print("Updated HomePage title")
