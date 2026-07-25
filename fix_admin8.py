import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-slate-950 font-bold">&nbsp;৳{product.discountedPrice}\n', '<span className="text-slate-950 font-bold">&nbsp;৳{product.discountedPrice}</span>\n')
content = content.replace('<span className="text-rose-500 line-through text-[11px] font-bold">&nbsp;৳{product.originalPrice}\n', '<span className="text-rose-500 line-through text-[11px] font-bold">&nbsp;৳{product.originalPrice}</span>\n')
content = content.replace('<span className="text-slate-950 font-bold">&nbsp;৳{product.originalPrice}\n', '<span className="text-slate-950 font-bold">&nbsp;৳{product.originalPrice}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
