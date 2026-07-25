with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()

content = content.replace('className="text-[22px] font-black text-slate-900"', 'className="text-[22px] font-black text-slate-900 font-hind"')
content = content.replace('className="text-[15px] font-bold text-slate-400 line-through"', 'className="text-[15px] font-bold text-slate-400 line-through font-hind"')

with open('src/components/ui/ProductCard.tsx', 'w') as f:
    f.write(content)
print("Done")
