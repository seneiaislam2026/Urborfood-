with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()

# Remove p-3 from the main card container
content = content.replace('transform hover:-translate-y-1 p-3"', 'transform hover:-translate-y-1"')

# Change the image container to not have rounded corners at the bottom, and no top margin
content = content.replace('className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-slate-50 mb-4"', 'className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50 mb-4"')

# Add padding to the content area
content = content.replace('className="px-1 flex flex-col flex-1"', 'className="px-4 pb-4 pt-1 flex flex-col flex-1"')

with open('src/components/ui/ProductCard.tsx', 'w') as f:
    f.write(content)
print("ProductCard updated for edge-to-edge image")
