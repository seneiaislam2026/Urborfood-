import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """          {activeTab === 'orders' && ("""

replacement = """          {activeTab === 'product-prices' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
              {/* Header */}
              <div className="p-4 md:p-5 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap select-none bg-gradient-to-r from-cyan-50/50 to-white">
                <div>
                  <h3 className="font-semibold text-base text-slate-800 flex items-center gap-2">
                    <DollarSign className="text-cyan-600" size={18} /> 
                    মূল্য তালিকা ও লাভ-ক্ষতি হিসাব
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">কেনার মূল্য (Cost Price) এবং বিক্রির মূল্য (Selling Price) আপডেট করুন</p>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm font-medium min-w-[700px]">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-500 uppercase text-[11px] select-none text-left">
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">পণ্য</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">কেনার মূল্য (Buying Price)</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">বিক্রির মূল্য (Selling Price)</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">লাভ / মার্জিন</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredProductsList.map((p) => {
                      const cost = p.buyingPrice || 0;
                      const sell = p.discountedPrice || p.originalPrice;
                      const profit = sell - cost;
                      const margin = cost > 0 ? ((profit / cost) * 100).toFixed(1) : 100;
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {p.image && (
                                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" referrerPolicy="no-referrer" />
                              )}
                              <div>
                                <span className="block text-slate-900 font-bold text-[13px]">{p.name}</span>
                                <span className="text-[10px] text-slate-500">{p.category} • {p.weight}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-700">৳{cost}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900">৳{sell}</span>
                              {p.discountedPrice && (
                                <span className="text-[10px] text-slate-400 line-through">৳{p.originalPrice}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className={`font-bold ${profit > 0 ? 'text-emerald-600' : profit < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                                {profit > 0 ? '+' : ''}৳{profit}
                              </span>
                              <span className={`text-[10px] ${profit > 0 ? 'text-emerald-500' : profit < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                                {profit > 0 ? '+' : ''}{margin}% মার্জিন
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                setProductFormData({
                                  id: p.id,
                                  name: p.name,
                                  category: p.category,
                                  originalPrice: p.originalPrice.toString(),
                                  discountedPrice: p.discountedPrice ? p.discountedPrice.toString() : '',
                                  buyingPrice: p.buyingPrice ? p.buyingPrice.toString() : '',
                                  weight: p.weight,
                                  image: p.image,
                                  description: p.description || '',
                                  stock: p.stock?.toString() || '',
                                  lowStockAlert: p.lowStockAlert?.toString() || '5'
                                });
                                setIsProductModalOpen(true);
                              }}
                              className="text-cyan-600 bg-cyan-50 hover:bg-cyan-100 p-2 rounded-lg transition-colors border border-cyan-100 font-medium text-xs inline-flex items-center gap-1.5"
                            >
                              <Edit size={14} /> আপডেট
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden divide-y divide-slate-100">
                {filteredProductsList.map((p) => {
                  const cost = p.buyingPrice || 0;
                  const sell = p.discountedPrice || p.originalPrice;
                  const profit = sell - cost;
                  const margin = cost > 0 ? ((profit / cost) * 100).toFixed(1) : 100;
                  
                  return (
                    <div key={p.id} className="p-4 hover:bg-slate-50/50 transition-colors flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        {p.image && (
                          <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover border border-slate-200" referrerPolicy="no-referrer" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 text-[13px] leading-tight">{p.name}</h4>
                          <div className="text-[10px] text-slate-500 mt-0.5">{p.category} • {p.weight}</div>
                        </div>
                        <button
                          onClick={() => {
                            setProductFormData({
                              id: p.id,
                              name: p.name,
                              category: p.category,
                              originalPrice: p.originalPrice.toString(),
                              discountedPrice: p.discountedPrice ? p.discountedPrice.toString() : '',
                              buyingPrice: p.buyingPrice ? p.buyingPrice.toString() : '',
                              weight: p.weight,
                              image: p.image,
                              description: p.description || '',
                              stock: p.stock?.toString() || '',
                              lowStockAlert: p.lowStockAlert?.toString() || '5'
                            });
                            setIsProductModalOpen(true);
                          }}
                          className="text-cyan-600 bg-cyan-50 hover:bg-cyan-100 p-1.5 rounded-lg transition-colors border border-cyan-100 flex-shrink-0"
                        >
                          <Edit size={14} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <div>
                          <div className="text-[10px] text-slate-500 mb-0.5">কেনার মূল্য</div>
                          <div className="font-bold text-slate-700 text-xs">৳{cost}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 mb-0.5">বিক্রির মূল্য</div>
                          <div className="font-bold text-slate-900 text-xs">৳{sell}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 mb-0.5">লাভ</div>
                          <div className={`font-bold text-xs ${profit > 0 ? 'text-emerald-600' : profit < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                            {profit > 0 ? '+' : ''}৳{profit}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredProductsList.length === 0 && (
                <div className="p-10 flex flex-col items-center justify-center text-slate-400">
                  <Search size={40} className="mb-3 text-slate-300" strokeWidth={1} />
                  <p className="font-medium text-sm">কোনো পণ্য পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && ("""

if target in content:
    content = content.replace(target, replacement)
    print("Added product-prices tab successfully")
else:
    print("Could not find target to add product-prices tab")

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
