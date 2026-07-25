import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

# Fix Bengali '1' clipping by changing leading-none to leading-tight
content = content.replace(
    'className="text-[32px] sm:text-[40px] font-black text-emerald-600 tracking-tight leading-none"',
    'className="text-[32px] sm:text-[40px] font-black text-emerald-600 tracking-tight leading-tight"'
)

# Fix discount original price color to red
content = content.replace(
    'className="text-[20px] sm:text-[24px] text-slate-400 line-through font-bold decoration-slate-300"',
    'className="text-[20px] sm:text-[24px] text-rose-500 line-through font-bold decoration-rose-400"'
)

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)

print("Done")
