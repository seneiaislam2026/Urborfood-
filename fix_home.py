with open('src/pages/HomePage.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-[#0b3d18] font-black">ক্যাটাগরি: {getCategoryNameInBangla(activeCategory || \'\')}\n              )}', '<span className="text-[#0b3d18] font-black">ক্যাটাগরি: {getCategoryNameInBangla(activeCategory || \'\')}</span>\n              )}')
# Check for toBanglaNumber missing
content = content.replace('<span className="text-2xl font-black text-emerald-600 ">&nbsp;৳{toBanglaNumber(product.discountedPrice || product.originalPrice)}\n', '<span className="text-2xl font-black text-emerald-600 ">&nbsp;৳{toBanglaNumber(product.discountedPrice || product.originalPrice)}</span>\n')
content = content.replace('<span className="text-sm font-bold text-rose-500 line-through ">&nbsp;৳{toBanglaNumber(product.originalPrice)}\n', '<span className="text-sm font-bold text-rose-500 line-through ">&nbsp;৳{toBanglaNumber(product.originalPrice)}</span>\n')

with open('src/pages/HomePage.tsx', 'w') as f:
    f.write(content)
print("Done")
