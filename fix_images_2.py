import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = re.sub(
    r'<img\s+src=\{product\.image\}\s+alt=\{product\.name\}\s+className="([^"]+)"\s+/>',
    r'<ImageLoader src={product.image} alt={product.name} className="\1" />',
    content
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
