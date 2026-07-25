import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# Replace <img src={p.image} alt={p.name} className="..." referrerPolicy="no-referrer" />
# with <ImageLoader src={p.image} alt={p.name} className="..." />
# 
# Wait, let's just do a regex substitution for common cases
content = re.sub(
    r'<img\s+src=\{p\.image\}\s+alt=\{p\.name\}\s+className="([^"]+)"(?:\s+referrerPolicy="no-referrer")?\s*/>',
    r'<ImageLoader src={p.image} alt={p.name} className="\1" />',
    content
)

content = re.sub(
    r'<img\s+loading="lazy"\s+src=\{product\.image\}\s+alt=\{product\.name\}\s+className="([^"]+)"(?:\s+referrerPolicy="no-referrer")?\s*/>',
    r'<ImageLoader src={product.image} alt={product.name} className="\1" />',
    content
)

content = re.sub(
    r'<img\s+src=\{product\.image\}\s+alt=\{product\.name\}\s+className="([^"]+)"(?:\s+referrerPolicy="no-referrer")?\s*/>',
    r'<ImageLoader src={product.image} alt={product.name} className="\1" />',
    content
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
