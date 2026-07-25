import re

with open('src/data/mock.ts', 'r') as f:
    content = f.read()

def replacer(match):
    block = match.group(0)
    
    # Extract originalPrice and discountedPrice
    original_price = re.search(r'originalPrice:\s*(\d+)', block)
    discounted_price = re.search(r'discountedPrice:\s*(\d+)', block)
    
    if original_price:
        op = int(original_price.group(1))
        sp = int(discounted_price.group(1)) if discounted_price else op
        bp = int(sp * 0.7)
        # Ensure it doesn't already have buyingPrice
        if 'buyingPrice:' not in block:
            # Append before category
            block = re.sub(r'(category:)', f'buyingPrice: {bp},\n    \\1', block)
    
    return block

content = re.sub(r'{\s*id:\s*\'[^\']+\'.*?(?:},|}$)', replacer, content, flags=re.DOTALL)

with open('src/data/mock.ts', 'w') as f:
    f.write(content)
print("Added buyingPrice to mock.ts")
