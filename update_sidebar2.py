import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# Let's fix the badge for mobile layout
content = content.replace(
    "{item.badge && (\n                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold shadow-sm ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'}`}>\n                        {item.badge}\n                      </span>\n                    )}",
    "{item.badge && (\n                      <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-md font-bold shadow-sm ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'}`}>\n                        {item.badge}\n                      </span>\n                    )}"
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
