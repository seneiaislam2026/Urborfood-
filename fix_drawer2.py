with open('src/components/ui/CartDrawer.tsx', 'r') as f:
    content = f.read()

content = content.replace('&nbsp;৳{toBanglaNumber(price)}</span></div>', '&nbsp;৳{toBanglaNumber(price)}</div>')

with open('src/components/ui/CartDrawer.tsx', 'w') as f:
    f.write(content)
print("Done")
