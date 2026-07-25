with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "const navItems = [",
    "const navItems = () => ["
)

content = content.replace(
    "  ];",
    "  ];"
)

content = content.replace(
    "navItems.map((item)",
    "navItems().map((item)"
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Fixed navItems to be a function.")
