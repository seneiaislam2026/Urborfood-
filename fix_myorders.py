with open('src/components/ui/MyOrdersModal.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-slate-600 font-bold">{item.name} <span className="text-slate-400 text-[10px]">x{item.quantity}</span>', '<span className="text-slate-600 font-bold">{item.name} <span className="text-slate-400 text-[10px]">x{item.quantity}</span></span>')

with open('src/components/ui/MyOrdersModal.tsx', 'w') as f:
    f.write(content)
print("Done")
