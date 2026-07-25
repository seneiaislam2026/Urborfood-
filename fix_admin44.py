import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('                          ))}</div>\n                        </div>\n                      )}', '                          ))}\n                        </div>\n                      )}')

# Re-check 5879 as well!
content = content.replace('                          ))}</div>\n                        </div>\n                        <div className="mt-3', '                          ))}\n                        </div>\n                        <div className="mt-3')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
