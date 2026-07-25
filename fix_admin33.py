import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="text-xl font-black text-slate-800">{fraudCheckResult.total_parcels || 0}\n', '<span className="text-xl font-black text-slate-800">{fraudCheckResult.total_parcels || 0}</span>\n')
content = content.replace('<span className="text-xl font-black text-emerald-700">{fraudCheckResult.total_delivered || 0}\n', '<span className="text-xl font-black text-emerald-700">{fraudCheckResult.total_delivered || 0}</span>\n')
content = content.replace('<span className="text-xl font-black text-rose-700">{fraudCheckResult.total_cancelled || 0}\n', '<span className="text-xl font-black text-rose-700">{fraudCheckResult.total_cancelled || 0}</span>\n')
content = content.replace('<span className="text-sm font-black text-slate-800">{paymentsData.payment_id}\n', '<span className="text-sm font-black text-slate-800">{paymentsData.payment_id}</span>\n')
content = content.replace('<span className="text-sm font-black text-emerald-700 uppercase">{paymentsData.status_label}\n', '<span className="text-sm font-black text-emerald-700 uppercase">{paymentsData.status_label}</span>\n')
content = content.replace('<span className="text-sm font-black text-indigo-700">&nbsp;৳{paymentsData.total}\n', '<span className="text-sm font-black text-indigo-700">&nbsp;৳{paymentsData.total}</span>\n')
content = content.replace('<span className="text-sm font-black text-slate-800">{paymentsData.method}\n', '<span className="text-sm font-black text-slate-800">{paymentsData.method}</span>\n')

content = content.replace('<span className="text-slate-400 font-normal">({cons.recipient_phone})</div>', '<span className="text-slate-400 font-normal">({cons.recipient_phone})</span></div>')

content = content.replace('                      )}', '                      )}')
content = content.replace('                        </div>\n                      )}', '                        </div>\n                      )}')
content = content.replace('                          ))}', '                          ))}')
content = content.replace('                              </div>\n                            </div>\n                          ))}\n                        </div>', '                              </div>\n                            </div>\n                          ))}\n                        </div>')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
