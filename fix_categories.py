import re

with open('src/components/home/CategoriesGrid.tsx', 'r') as f:
    content = f.read()

# Make the category cards more beautiful and less wide
content = content.replace(
    'className="flex-shrink-0 flex items-center gap-3 p-2.5 sm:p-3 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all duration-300 group w-[220px] sm:w-[260px] text-left"',
    'className="flex-shrink-0 flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all duration-300 group w-[180px] sm:w-[220px] text-left"'
)

with open('src/components/home/CategoriesGrid.tsx', 'w') as f:
    f.write(content)

