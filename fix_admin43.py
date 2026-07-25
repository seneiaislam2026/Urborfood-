import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-slate-800">{currentDue.customerName}</p>', '<span className="text-slate-800">{currentDue.customerName}</span></p>')
content = content.replace('<span className="text-rose-600 font-bold">&nbsp;৳{currentDue.amount - currentDue.paidAmount}</p>', '<span className="text-rose-600 font-bold">&nbsp;৳{currentDue.amount - currentDue.paidAmount}</span></p>')
content = content.replace('<span className="text-sm font-medium text-slate-800">{new Date(order.date).toLocaleDateString(\'bn-BD\', { year: \'numeric\', month: \'long\', day: \'numeric\', hour: \'2-digit\', minute: \'2-digit\' })}\n', '<span className="text-sm font-medium text-slate-800">{new Date(order.date).toLocaleDateString(\'bn-BD\', { year: \'numeric\', month: \'long\', day: \'numeric\', hour: \'2-digit\', minute: \'2-digit\' })}</span>\n')
content = content.replace('<span className="font-bold text-slate-600">{item.name} <span className="text-slate-500 font-normal">x {item.quantity}\n', '<span className="font-bold text-slate-600">{item.name} <span className="text-slate-500 font-normal">x {item.quantity}</span></span>\n')
content = content.replace('<span className="font-bold text-slate-800">&nbsp;৳{item.price * item.quantity}\n', '<span className="font-bold text-slate-800">&nbsp;৳{item.price * item.quantity}</span>\n')
content = content.replace('<span className="text-sm font-bold text-emerald-900">&nbsp;৳{order.total.toLocaleString(\'bn-BD\')}\n', '<span className="text-sm font-bold text-emerald-900">&nbsp;৳{order.total.toLocaleString(\'bn-BD\')}</span>\n')

# Line 5868 has `</span></span>` which is weird:
# {order.status === 'Completed' ... }</span></span>
content = content.replace('}</span>\n                            </span>', '}\n                            </span>')

content = content.replace('                          ))}\n                        </div>', '                          ))}</div>\n                        </div>') # Wait, I will just undo it if it's wrong

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
