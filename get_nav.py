with open('src/pages/AdminDashboard.tsx', 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if 'const navItems = [' in line:
            print(''.join(lines[i:i+40]))
            break
