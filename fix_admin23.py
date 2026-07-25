import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('{item.category}\n                                      </span>\n', '{item.category}\n                                      </span>\n')
# Wait, let's look at 2777
content = content.replace('<span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isIncome ? \'bg-emerald-100 text-emerald-700\' : \'bg-rose-100 text-rose-700\'}`}>\n                                        {item.category}\n', '<span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isIncome ? \'bg-emerald-100 text-emerald-700\' : \'bg-rose-100 text-rose-700\'}`}>\n                                        {item.category}</span>\n')
content = content.replace('<span>{new Date(item.date).toLocaleDateString(\'bn-BD\', { day: \'numeric\', month: \'long\', year: \'numeric\', hour: \'2-digit\', minute: \'2-digit\' })}\n', '<span>{new Date(item.date).toLocaleDateString(\'bn-BD\', { day: \'numeric\', month: \'long\', year: \'numeric\', hour: \'2-digit\', minute: \'2-digit\' })}</span>\n')

content = content.replace('                          })\n                        }\n                      </div>', '                          })\n                  )}\n                      </div>')
content = content.replace('                          })\n                  }\n                      </div>', '                          })\n                  )}\n                      </div>')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
