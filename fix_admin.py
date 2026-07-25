import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{t.adminPanel}\n            </div>', '<span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{t.adminPanel}</span>\n            </div>')

content = content.replace('{isActive && (\n                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse">\n                    \n                  )}\n                </button>', '{isActive && (\n                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>\n                  )}\n                </button>')

# Wait, let's look at the actual error in AdminDashboard.tsx around line 1165.
