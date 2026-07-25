with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()

content = content.replace('transform hover:-translate-y-1"', 'transform hover:-translate-y-1 p-3"')
content = content.replace('className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50 mb-4"', 'className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-slate-50 mb-4"')
content = content.replace('className="px-4 pb-4 pt-1 flex flex-col flex-1"', 'className="px-1 flex flex-col flex-1"')

with open('src/components/ui/ProductCard.tsx', 'w') as f:
    f.write(content)
print("Reverted ProductCard padding")
