with open('src/pages/ProductLandingPage.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-emerald-700">&nbsp;{product.weight}\n              </div>', '<span className="text-emerald-700">&nbsp;{product.weight}</span>\n              </div>')
content = content.replace('<span className="text-[13px] text-slate-500 font-medium">&nbsp;{product.weight} এর প্যাকেজ\n                  </div>', '<span className="text-[13px] text-slate-500 font-medium">&nbsp;{product.weight} এর প্যাকেজ</span>\n                  </div>')

with open('src/pages/ProductLandingPage.tsx', 'w') as f:
    f.write(content)
print("Done")
