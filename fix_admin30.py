import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-[10px] text-slate-500 font-medium">{item.quantity} x ৳{item.price}\n', '<span className="text-[10px] text-slate-500 font-medium">{item.quantity} x ৳{item.price}</span>\n')
content = content.replace('<span className="text-slate-800 shrink-0 text-[11px]">&nbsp;৳{item.price * item.quantity}\n', '<span className="text-slate-800 shrink-0 text-[11px]">&nbsp;৳{item.price * item.quantity}</span>\n')
content = content.replace('<span className="text-slate-900">&nbsp;৳{manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}\n', '<span className="text-slate-900">&nbsp;৳{manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>\n')
# Check line 4160-4170 if there are more
content = content.replace('                          ))}</div>\n                          </div>', '                          ))}\n                          </div>')
content = content.replace('                            ))}</div>\n                          </div>', '                            ))}\n                          </div>')
content = content.replace('                              ))}</div>\n                          </div>', '                              ))}\n                          </div>')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
