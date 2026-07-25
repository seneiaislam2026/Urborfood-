import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-medium min-w-[600px]">
                      <thead>
                        <tr className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
                          <th className="p-4 pl-6">পণ্যের নাম</th>
                          <th className="p-4">ক্যাটাগরি & ওজন</th>
                          <th className="p-4 text-center">বর্তমান মজুত (Stock)</th>
                          <th className="p-4 text-center">স্ট্যাটাস</th>
                          <th className="p-4">স্টক সংশোধন</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 text-slate-700">
                        {filteredProducts.map((p) => {
                          const stockLevel = p.stock || 0;
                          const alertLimit = p.lowStockAlert || 5;
                          const isOutOfStock = stockLevel === 0;
                          const isLowStock = stockLevel <= alertLimit && !isOutOfStock;

                          return (
                            <tr key={p.id} className="hover:bg-[#f8fafc]/40 transition-colors">
                              <td className="p-4 pl-6">
                                <div className="flex items-center gap-3">
                                  {p.image && (
                                    <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover border" referrerPolicy="no-referrer" />
                                  )}
                                  <div>
                                    <span className="block text-slate-900 font-bold text-[13px]">{p.name}</span>
                                    <span className="text-[10px] text-slate-500">ID: #{p.id}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-slate-500">
                                <div>{p.category}</div>
                                <div className="text-[10px] text-slate-500">{p.weight}</div>
                              </td>
                              <td className="p-4 text-center text-sm font-medium">
                                <span className={isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-500' : 'text-emerald-600'}>
                                  {stockLevel} টি
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  isOutOfStock ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                  isLowStock ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                  'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                }`}>
                                  {isOutOfStock ? 'স্টক নেই' : isLowStock ? 'সীমিত স্টক' : 'মজুত পর্যাপ্ত'}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    defaultValue={stockLevel}
                                    onBlur={(e) => {
                                      const val = Number(e.target.value);
                                      if (val >= 0) {
                                        updateProduct({ ...p, stock: val });
                                        addNotification('স্টক আপডেট করা হয়েছে 📦', `${p.name} এর স্টক সংখ্যা বাড়িয়ে ${val} টি করা হয়েছে।`);
                                      }
                                    }}
                                    className="w-16 px-1.5 py-1 text-center border border-slate-200 rounded-lg text-sm font-medium"
                                  />
                                  <span className="text-[10px] text-slate-400">টি</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>"""

replacement = """                  {/* Desktop View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-medium min-w-[600px]">
                      <thead>
                        <tr className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
                          <th className="p-4 pl-6">পণ্যের নাম</th>
                          <th className="p-4">ক্যাটাগরি & ওজন</th>
                          <th className="p-4 text-center">বর্তমান মজুত (Stock)</th>
                          <th className="p-4 text-center">স্ট্যাটাস</th>
                          <th className="p-4">স্টক সংশোধন</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 text-slate-700">
                        {filteredProducts.map((p) => {
                          const stockLevel = p.stock || 0;
                          const alertLimit = p.lowStockAlert || 5;
                          const isOutOfStock = stockLevel === 0;
                          const isLowStock = stockLevel <= alertLimit && !isOutOfStock;

                          return (
                            <tr key={p.id} className="hover:bg-[#f8fafc]/40 transition-colors">
                              <td className="p-4 pl-6">
                                <div className="flex items-center gap-3">
                                  {p.image && (
                                    <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover border" referrerPolicy="no-referrer" />
                                  )}
                                  <div>
                                    <span className="block text-slate-900 font-bold text-[13px]">{p.name}</span>
                                    <span className="text-[10px] text-slate-500">ID: #{p.id}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-slate-500">
                                <div>{p.category}</div>
                                <div className="text-[10px] text-slate-500">{p.weight}</div>
                              </td>
                              <td className="p-4 text-center text-sm font-medium">
                                <span className={isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-500' : 'text-emerald-600'}>
                                  {stockLevel} টি
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  isOutOfStock ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                  isLowStock ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                  'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                }`}>
                                  {isOutOfStock ? 'স্টক নেই' : isLowStock ? 'সীমিত স্টক' : 'মজুত পর্যাপ্ত'}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    defaultValue={stockLevel}
                                    onBlur={(e) => {
                                      const val = Number(e.target.value);
                                      if (val >= 0) {
                                        updateProduct({ ...p, stock: val });
                                        addNotification('স্টক আপডেট করা হয়েছে 📦', `${p.name} এর স্টক সংখ্যা বাড়িয়ে ${val} টি করা হয়েছে।`);
                                      }
                                    }}
                                    className="w-16 px-1.5 py-1 text-center border border-slate-200 rounded-lg text-sm font-medium"
                                  />
                                  <span className="text-[10px] text-slate-400">টি</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden divide-y divide-slate-100">
                    {filteredProducts.map((p) => {
                      const stockLevel = p.stock || 0;
                      const alertLimit = p.lowStockAlert || 5;
                      const isOutOfStock = stockLevel === 0;
                      const isLowStock = stockLevel <= alertLimit && !isOutOfStock;

                      return (
                        <div key={p.id} className="p-4 hover:bg-slate-50/50 transition-colors flex flex-col gap-3">
                          <div className="flex items-start gap-3">
                            {p.image && (
                              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover border border-slate-200" referrerPolicy="no-referrer" />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-800 text-[13px] leading-tight truncate">{p.name}</h4>
                              <div className="text-[10px] text-slate-500 mt-0.5">{p.category} • {p.weight}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">ID: #{p.id}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            <div>
                              <div className="text-[10px] text-slate-500 font-semibold mb-1">বর্তমান মজুত</div>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-black ${isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-500' : 'text-emerald-600'}`}>
                                  {stockLevel} টি
                                </span>
                                <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                                  isOutOfStock ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                  isLowStock ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                  'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                }`}>
                                  {isOutOfStock ? 'স্টক নেই' : isLowStock ? 'সীমিত' : 'পর্যাপ্ত'}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] text-slate-500 font-semibold mb-1">স্টক সংশোধন</div>
                              <div className="flex items-center justify-end gap-1.5">
                                <input
                                  type="number"
                                  defaultValue={stockLevel}
                                  onBlur={(e) => {
                                    const val = Number(e.target.value);
                                    if (val >= 0) {
                                      updateProduct({ ...p, stock: val });
                                      addNotification('স্টক আপডেট করা হয়েছে 📦', `${p.name} এর স্টক সংখ্যা বাড়িয়ে ${val} টি করা হয়েছে।`);
                                    }
                                  }}
                                  className="w-16 px-1.5 py-1 text-center border border-slate-200 rounded-lg text-sm font-medium bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                                />
                                <span className="text-[10px] text-slate-400">টি</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/pages/AdminDashboard.tsx', 'w') as f:
        f.write(content)
    print("Table patched for mobile.")
else:
    print("Target string not found in AdminDashboard.tsx.")
