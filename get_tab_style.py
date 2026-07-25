with open('src/pages/AdminDashboard.tsx', 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if 'const getTabStyle =' in line:
            print(''.join(lines[i:i+30]))
            break
