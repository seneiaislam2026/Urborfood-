import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

match = re.search(r'  if \(!isAuthenticated\) \{(.*?)\s*\}\n\n  return \(', content, flags=re.DOTALL)
if match:
    with open('current_login.txt', 'w') as f2:
        f2.write(match.group(1))
