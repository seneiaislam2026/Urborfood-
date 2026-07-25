with open('src/pages/AdminDashboard.tsx', 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if 'if (!isAuthenticated) {' in line:
            print(''.join(lines[i:i+100]))
            break
