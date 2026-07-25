with open('src/components/ui/ProductDetailsModal.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-4xl font-extrabold text-primary leading-tight">&nbsp;৳{toBanglaNumber(price)}\n', '<span className="text-4xl font-extrabold text-primary leading-tight">&nbsp;৳{toBanglaNumber(price)}</span>\n')

with open('src/components/ui/ProductDetailsModal.tsx', 'w') as f:
    f.write(content)
print("Done")
