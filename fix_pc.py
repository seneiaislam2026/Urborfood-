with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()

content = content.replace('{product.discountedPrice}', '{toBanglaNumber(product.discountedPrice || 0)}')
content = content.replace('{product.originalPrice}', '{toBanglaNumber(product.originalPrice)}')

with open('src/components/ui/ProductCard.tsx', 'w') as f:
    f.write(content)
print("Done")
