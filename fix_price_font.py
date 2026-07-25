with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()

content = content.replace('className="flex items-center gap-2.5 mb-5 font-hind"', 'className="flex items-center gap-2.5 mb-5 font-hind"')

with open('src/components/ui/ProductCard.tsx', 'w') as f:
    f.write(content)
print("Checked font-hind")
