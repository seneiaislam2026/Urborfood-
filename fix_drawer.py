with open('src/components/ui/CartDrawer.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span>&nbsp;৳{toBanglaNumber(cartTotal)}</span></span>\n                </div>', '<span>&nbsp;৳{toBanglaNumber(cartTotal)}</span>\n                </div>')

with open('src/components/ui/CartDrawer.tsx', 'w') as f:
    f.write(content)
print("Done")
