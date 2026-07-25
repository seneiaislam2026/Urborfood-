import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] px-2 py-1 rounded-md font-bold shadow-sm">{product.category}\n', '<span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] px-2 py-1 rounded-md font-bold shadow-sm">{product.category}</span>\n')
content = content.replace('<span className="font-bold text-emerald-600">&nbsp;৳{product.discountedPrice || product.originalPrice}\n', '<span className="font-bold text-emerald-600">&nbsp;৳{product.discountedPrice || product.originalPrice}</span>\n')
content = content.replace('{product.discountedPrice && <span className="text-xs text-rose-500 line-through">&nbsp;৳{product.originalPrice}}\n', '{product.discountedPrice && <span className="text-xs text-rose-500 line-through">&nbsp;৳{product.originalPrice}</span>}\n')
content = content.replace('<span className="text-xs text-slate-500 font-medium">/ {product.weight}\n', '<span className="text-xs text-slate-500 font-medium">/ {product.weight}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
