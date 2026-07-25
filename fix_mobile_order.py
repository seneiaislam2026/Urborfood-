import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[10px]  text-slate-400 font-bold bg-slate-50 px-1.5 rounded">#{order.id}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                  <span className="text-[10px] text-slate-500 font-medium truncate max-w-[130px]">
                                    {order.items.map(it => it.name).join(', ')}
                                  </span>
                                </div>"""

replacement = """                                <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                                  <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-1.5 rounded whitespace-nowrap shrink-0">#{order.id}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                                  <span className="text-[10px] text-slate-500 font-medium truncate">
                                    {order.items.map(it => it.name).join(', ')}
                                  </span>
                                </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/pages/AdminDashboard.tsx', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Target not found")
