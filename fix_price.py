with open('src/components/ui/PriceListModal.tsx', 'r') as f:
    content = f.read()

content = content.replace('{product.weight}</span></td>', '{product.weight}</td>')
content = content.replace('{product.weight}</span>', '{product.weight}') # just in case

with open('src/components/ui/PriceListModal.tsx', 'w') as f:
    f.write(content)

# And let's check ProductDetailsModal just in case
with open('src/components/ui/ProductDetailsModal.tsx', 'r') as f:
    content = f.read()
content = content.replace('{product.weight}</span>', '{product.weight}')
with open('src/components/ui/ProductDetailsModal.tsx', 'w') as f:
    f.write(content)
print("Done")
