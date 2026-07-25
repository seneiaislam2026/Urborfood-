import re

with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()

# Revert my previous messy span insertions
content = content.replace('<span className="pt-[0.1em] pb-[0.05em] inline-block">{product.weight || \'১ কেজি\'}</span>', "{product.weight || '১ কেজি'}")

# Fix the weight span
content = content.replace('<span className="text-[11px] font-medium text-slate-500 leading-relaxed pl-0.5 inline-block">', '<span className="text-[11px] font-medium text-slate-500 leading-[normal] pt-[3px] inline-block">')

with open('src/components/ui/ProductCard.tsx', 'w') as f:
    f.write(content)

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

# Revert my previous messy span insertions
content = content.replace('<span className="pt-[0.1em] pb-[0.05em] inline-block">{product.weight}</span>', '{product.weight}')
content = content.replace('<span className="pt-[0.1em] pb-[0.05em] inline-block">{toBanglaNumber(quantity)}</span>', '{toBanglaNumber(quantity)}')

# Apply leading-normal and pt-[3px] to the specific spans
content = content.replace('<p className="text-slate-500 text-[13px] font-medium mt-0.5">{product.weight} × {toBanglaNumber(quantity)}</p>', '<p className="text-slate-500 text-[13px] font-medium mt-0.5 leading-[normal] pt-[3px]">{product.weight} × {toBanglaNumber(quantity)}</p>')
content = content.replace('পরিমাণ: <span className="text-emerald-700 pl-0.5 inline-block">&nbsp;{product.weight}</span>', 'পরিমাণ: <span className="text-emerald-700 leading-[normal] pt-[3px] inline-block">&nbsp;{product.weight}</span>')
content = content.replace('<span className="text-[13px] text-slate-500 font-medium pl-0.5 inline-block">&nbsp;{product.weight} এর প্যাকেজ</span>', '<span className="text-[13px] text-slate-500 font-medium leading-[normal] pt-[3px] inline-block">&nbsp;{product.weight} এর প্যাকেজ</span>')

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)

print("Done")
