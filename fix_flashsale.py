with open('src/components/home/FlashSale.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '৳{toBanglaNumber(product.discountedPrice || 0)}                        </div>',
    '৳{toBanglaNumber(product.discountedPrice || 0)}</span>                        </div>'
)

with open('src/components/home/FlashSale.tsx', 'w') as f:
    f.write(content)
