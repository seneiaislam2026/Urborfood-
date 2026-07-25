import re
import glob

for filename in ['src/components/ui/ProductCard.tsx', 'src/pages/ProductLandingPage.tsx', 'src/components/home/FlashSale.tsx', 'src/components/home/BestSellers.tsx', 'src/pages/HomePage.tsx', 'src/pages/AdminDashboard.tsx', 'src/components/ui/PriceListModal.tsx']:
    try:
        with open(filename, 'r') as f:
            content = f.read()

        # ProductCard
        content = content.replace('<span className="text-[11px] font-medium text-slate-500">\n            • &nbsp;{product.weight || \'১ কেজি\'}\n          </span>', '<span className="text-[11px] font-medium text-slate-500 bn-safe">\n            • &nbsp;{product.weight || \'১ কেজি\'}\n          </span>')
        
        # ProductLandingPage
        content = content.replace('<p className="text-slate-500 text-[13px] font-medium mt-0.5 pt-[0.2em]">{product.weight}', '<p className="text-slate-500 text-[13px] font-medium mt-0.5 bn-safe">{product.weight}')
        content = content.replace('<span className="text-[13px] text-slate-500 font-medium pt-[0.2em]">&nbsp;{product.weight} এর প্যাকেজ</span>', '<span className="text-[13px] text-slate-500 font-medium bn-safe">&nbsp;{product.weight} এর প্যাকেজ</span>')

        # AdminDashboard (lots of places)
        content = content.replace('<div className="text-[10px] text-slate-500">{p.weight}</div>', '<div className="text-[10px] text-slate-500 bn-safe">{p.weight}</div>')
        content = content.replace('<div className="text-[10px] text-slate-500 mt-0.5">{p.category} • {p.weight}</div>', '<div className="text-[10px] text-slate-500 mt-0.5 bn-safe">{p.category} • {p.weight}</div>')
        content = content.replace('<span className="text-[10px] text-slate-500">{p.category} • {p.weight}</span>', '<span className="text-[10px] text-slate-500 bn-safe">{p.category} • {p.weight}</span>')
        content = content.replace('{p.category} • {p.weight}\n                          </span>', '{p.category} • {p.weight}\n                          </span>') # This one is split, let's target the wrapper.
        
        content = content.replace('<span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">\n                            {p.category} • {p.weight}\n                          </span>', '<span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 bn-safe">\n                            {p.category} • {p.weight}\n                          </span>')

        # FlashSale
        content = content.replace('<p className="text-[11px] text-zinc-500 font-bold mt-0.5 mb-2">{product.weight}</span></p>', '<p className="text-[11px] text-zinc-500 font-bold mt-0.5 mb-2 bn-safe">{product.weight}</p>')

        # HomePage
        content = content.replace('<div className="text-[11px] text-slate-400 font-bold mb-1  leading-relaxed">{product.weight || \'কেজি\'}</div>', '<div className="text-[11px] text-slate-400 font-bold mb-1 bn-safe">{product.weight || \'কেজি\'}</div>')
        
        with open(filename, 'w') as f:
            f.write(content)
    except FileNotFoundError:
        pass

print("Done")
