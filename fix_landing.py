with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="font-noto"><span className="font-noto">{product.weight}</span></span> × <span className="font-noto">{toBanglaNumber(quantity)}</span>', '<span className="font-noto">{product.weight}</span> × <span className="font-noto">{toBanglaNumber(quantity)}</span>')

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)
print("Done")
