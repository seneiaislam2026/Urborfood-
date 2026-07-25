import re

with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

# 1. Update Product Details Section
# Find the specific block and replace it
details_pattern = re.compile(r'<h3 className="text-\[20px\] font-black text-slate-900 mb-6 flex items-center gap-2\.5">.*?</p>', re.DOTALL)

def replace_details(match):
    return """<h3 className="text-[20px] font-black text-slate-900 mb-6 flex items-center gap-2.5">
                <Info size={24} className="text-emerald-600" /> বিস্তারিত বিবরণ
              </h3>
              <p className="text-[16px] leading-[1.8] text-slate-600 font-medium mb-6 whitespace-pre-line">
                {product.description || 'আমাদের প্রতিটি পণ্য শতভাগ বিশুদ্ধ ও স্বাস্থ্যসম্মত উপায়ে প্রস্তুত করা হয়। ভেজালমুক্ত ও গুণগত মান সম্পন্ন এই পণ্যটি আপনার পরিবারের জন্য একটি স্বাস্থ্যকর পছন্দ।'}
              </p>"""

content = details_pattern.sub(replace_details, content)

# 2. Update image overlays and add them to title/price section
# Remove discount overlay from image
overlay_discount = """{hasDiscount && (
                <div className="absolute top-5 left-5 bg-slate-900 text-white px-4 py-2 rounded-full text-[13px] font-black shadow-xl z-10 flex items-center gap-1.5 backdrop-blur-md bg-opacity-90">
                  <span>সাশ্রয়</span>
                  <span className="bg-white/20 px-1.5 py-0.5 rounded text-[11px]">৳{toBanglaNumber((product.originalPrice || 0) - price)}</span>
                </div>
              )}"""
content = content.replace(overlay_discount, "")

# Remove weight overlay from image
overlay_weight = """<div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/50 text-[14px] font-bold text-slate-800 flex items-center gap-2">
                <PackageIcon /> ওজন: <span className="text-emerald-700">{product.weight}</span>
              </div>"""
content = content.replace(overlay_weight, "")

# Update title and price section
title_price_section_old = """<h1 className="text-[24px] sm:text-[36px] font-black text-slate-900 leading-[1.2] tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mt-2">
                <span className="text-[32px] sm:text-[40px] font-black text-emerald-600 tracking-tight leading-tight">
                  ৳{toBanglaNumber(price)}
                </span>
                {hasDiscount && (
                  <span className="text-[20px] sm:text-[24px] text-rose-500 line-through font-bold decoration-rose-400">
                    ৳{toBanglaNumber(product.originalPrice)}
                  </span>
                )}
              </div>"""

title_price_section_new = """<h1 className="text-[24px] sm:text-[36px] font-black text-slate-900 leading-[1.2] tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 text-[16px] font-bold text-slate-600 mt-[-8px]">
                 পরিমাণ: <span className="text-emerald-700">{product.weight}</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 mt-2">
                <span className="text-[32px] sm:text-[40px] font-black text-emerald-600 tracking-tight leading-tight">
                  ৳{toBanglaNumber(price)}
                </span>
                {hasDiscount && (
                  <span className="text-[20px] sm:text-[24px] text-rose-500 line-through font-bold decoration-rose-400">
                    ৳{toBanglaNumber(product.originalPrice)}
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg text-[14px] font-black ml-2 border border-emerald-200">
                    সাশ্রয় ৳{toBanglaNumber((product.originalPrice || 0) - price)}
                  </span>
                )}
              </div>"""

content = content.replace(title_price_section_old, title_price_section_new)

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)

print("Done")
