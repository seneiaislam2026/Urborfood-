with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="w-8 text-center font-bold text-slate-900 text-[16px]">{toBanglaNumber(quantity)}\n                      <button ', '<span className="w-8 text-center font-bold text-slate-900 text-[16px]">{toBanglaNumber(quantity)}</span>\n                      <button ')

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)
print("Done")
