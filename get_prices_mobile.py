with open('src/pages/AdminDashboard.tsx', 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if "{/* Mobile View */}" in line:
            print(''.join(lines[i-2:i+70]))
            # we will search for the second instance which belongs to product-prices
