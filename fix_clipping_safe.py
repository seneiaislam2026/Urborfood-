with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-[11px] font-medium text-slate-500 leading-relaxed pl-0.5 inline-block">', '<span className="text-[11px] font-medium text-slate-500 leading-relaxed pl-0.5 inline-block pt-[0.2em]">')

with open('src/components/ui/ProductCard.tsx', 'w') as f:
    f.write(content)

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace('<p className="text-slate-500 text-[13px] font-medium mt-0.5">', '<p className="text-slate-500 text-[13px] font-medium mt-0.5 pt-[0.2em]">')
content = content.replace('<span className="text-[13px] text-slate-500 font-medium">', '<span className="text-[13px] text-slate-500 font-medium pt-[0.2em]">')

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)

print("Done")
