with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()

# Add missing ৳ logic if it got doubled, let's check
import re
print(re.findall(r'<span class[^>]*>৳</span>{toBanglaNumber', content))

