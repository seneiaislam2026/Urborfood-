import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = re.sub(
    r'\s*\)\}\s*const automatedIncome = orders',
    r'''
          )}
          {/* TAB 6: FINANCES / INCOME & EXPENSE TRACKER */}
          {activeTab === 'finances' && (() => {
            const automatedIncome = orders''',
    content
)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
