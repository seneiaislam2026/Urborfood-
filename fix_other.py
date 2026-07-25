import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="text-[22px] font-black text-emerald-700 leading-none tracking-tight"',
    'className="text-[22px] font-black text-emerald-700 leading-tight tracking-tight"'
)
with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)

# ProductCard
with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()
content = content.replace(
    'className="text-[11px] text-slate-400 line-through font-medium "',
    'className="text-[11px] text-rose-500 line-through font-medium "'
)
with open('src/components/ui/ProductCard.tsx', 'w') as f:
    f.write(content)

# HomePage
with open('src/pages/HomePage.tsx', 'r') as f:
    content = f.read()
content = content.replace(
    'className="text-sm font-bold text-slate-400 line-through "',
    'className="text-sm font-bold text-rose-500 line-through "'
)
with open('src/pages/HomePage.tsx', 'w') as f:
    f.write(content)

print("Done")
