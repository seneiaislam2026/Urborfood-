with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace('{product.weight}</span>', '{product.weight}')
content = content.replace('{toBanglaNumber(quantity)}</span>', '{toBanglaNumber(quantity)}')

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()
content = content.replace('</span></div>', '</div>')
content = content.replace('}</span>', '}')
with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
