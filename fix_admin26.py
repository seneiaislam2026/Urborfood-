import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="inline-block mt-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{camp.platform}\n', '<span className="inline-block mt-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{camp.platform}</span>\n')
content = content.replace('<span className="font-semibold text-emerald-900 text-xs">&nbsp;৳{camp.budget}\n', '<span className="font-semibold text-emerald-900 text-xs">&nbsp;৳{camp.budget}</span>\n')
content = content.replace('<span className="font-semibold text-slate-600 block truncate" title={camp.targetAudience}>{camp.targetAudience}\n', '<span className="font-semibold text-slate-600 block truncate" title={camp.targetAudience}>{camp.targetAudience}</span>\n')
content = content.replace('<span className="font-semibold text-slate-800">{camp.actualConversion}\n', '<span className="font-semibold text-slate-800">{camp.actualConversion}</span>\n')

# Line 3414
content = content.replace('<span className="text-slate-800 block font-bold">{camp.name}\n', '<span className="text-slate-800 block font-bold">{camp.name}</span>\n')
content = content.replace('<span className="text-[10px] text-slate-500">{camp.platform}\n', '<span className="text-[10px] text-slate-500">{camp.platform}</span>\n')

# Line 3470 (table)
# I should also fix the bracket issue around 3393 `)) )}`
content = content.replace('                            ))\n                    }\n                        </div>', '                            ))\n                  )}\n                        </div>')
content = content.replace('                            ))\n                  }\n                        </div>', '                            ))\n                  )}\n                        </div>')
content = content.replace('                              ))}', '                              ))}</div>')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
