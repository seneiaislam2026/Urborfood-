import re
with open('src/components/ui/ProductDetailsModal.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'(<span className="text-lg font-medium text-rose-500 line-through decoration-rose-400">&nbsp;৳\{toBanglaNumber\(selectedProduct\.originalPrice\)\})([\s\n]*)\)', r'\1</span>\2)', content)

with open('src/components/ui/ProductDetailsModal.tsx', 'w') as f:
    f.write(content)
print("Done")
