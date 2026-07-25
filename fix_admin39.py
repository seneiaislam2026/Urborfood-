import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-slate-800 font-bold">\n                              &nbsp;৳{(item.price * item.quantity).toLocaleString(\'bn-BD\')}\n', '<span className="text-slate-800 font-bold">\n                              &nbsp;৳{(item.price * item.quantity).toLocaleString(\'bn-BD\')}</span>\n')

content = content.replace('<span>&nbsp;৳{manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString(\'bn-BD\')}\n', '<span>&nbsp;৳{manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString(\'bn-BD\')}</span>\n')
content = content.replace('<span>&nbsp;৳{(manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 60).toLocaleString(\'bn-BD\')}\n', '<span>&nbsp;৳{(manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 60).toLocaleString(\'bn-BD\')}</span>\n')

content = content.replace('                          </div>\n                        </div>\n                      ))}', '                          </div>\n                        </div>\n                      ))}</div>')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
