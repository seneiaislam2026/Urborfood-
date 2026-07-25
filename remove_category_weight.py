with open('src/components/ui/ProductCard.tsx', 'r') as f:
    content = f.read()

target = '''        <div className="flex items-center mb-3">
          <div className="bg-slate-100/70 px-2.5 py-1 rounded-md flex items-center gap-1.5 text-[12px]">
            <span className="font-semibold text-slate-500">{product.category}</span>
            <span className="text-slate-400 font-black text-[10px]">•</span>
            <span className="font-medium text-slate-500  bn-safe">{product.weight || '১ কেজি'}</span>
          </div>
        </div>'''

if target in content:
    content = content.replace(target, '')
    with open('src/components/ui/ProductCard.tsx', 'w') as f:
        f.write(content)
    print("Removed")
else:
    print("Target not found. Let's see the context.")
