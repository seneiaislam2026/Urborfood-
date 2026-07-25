with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold p-2 w-full transition-colors"',
    'className="flex items-center gap-2 text-rose-600 bg-rose-50 hover:bg-rose-100/80 font-bold p-3 rounded-xl w-full transition-all border border-rose-100"'
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Updated logout button")
