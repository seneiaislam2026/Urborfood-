with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = "          )}\n            const automatedIncome = orders"
replacement = """          )}
          {/* TAB 6: FINANCES / INCOME & EXPENSE TRACKER */}
          {activeTab === 'finances' && (() => {
            const automatedIncome = orders"""
content = content.replace(target, replacement)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
