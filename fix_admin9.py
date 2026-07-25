import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-sm font-bold text-slate-950">&nbsp;৳{product.discountedPrice}\n', '<span className="text-sm font-bold text-slate-950">&nbsp;৳{product.discountedPrice}</span>\n')
content = content.replace('<span className="text-rose-500 line-through text-[10px] font-bold">&nbsp;৳{product.originalPrice}\n', '<span className="text-rose-500 line-through text-[10px] font-bold">&nbsp;৳{product.originalPrice}</span>\n')
content = content.replace('<span className="text-sm font-bold text-slate-950 mt-0.5">&nbsp;৳{product.originalPrice}\n', '<span className="text-sm font-bold text-slate-950 mt-0.5">&nbsp;৳{product.originalPrice}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
