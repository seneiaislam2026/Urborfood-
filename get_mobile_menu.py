with open('src/pages/AdminDashboard.tsx', 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if 'Mobile Sidebar Menu' in line or 'isMobileMenuOpen &&' in line:
            print(''.join(lines[max(0, i-5):i+50]))
            break
