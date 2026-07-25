import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# We want to find the section under `{activeTab === 'product-prices' && (`
tab_start = content.find("{activeTab === 'product-prices' && (")
if tab_start != -1:
    mobile_view_start = content.find("              {/* Mobile View */}", tab_start)
    if mobile_view_start != -1:
        # Find the end of mobile view
        mobile_view_end = content.find("              {filteredProductsList.length === 0 && (", mobile_view_start)
        
        if mobile_view_end != -1:
            old_mobile_view = content[mobile_view_start:mobile_view_end]
            
            new_mobile_view = """              {/* Mobile View */}
              <div className="md:hidden divide-y divide-slate-100 bg-[#f8fafc]">
                {filteredProductsList.map((p) => {
                  const cost = p.buyingPrice || 0;
                  const sell = p.discountedPrice || p.originalPrice;
                  const profit = sell - cost;
                  const margin = cost > 0 ? ((profit / cost) * 100).toFixed(1) : 100;
                  
                  return (
                    <div key={p.id} className="p-4 bg-white mb-2 shadow-sm rounded-xl mx-3 mt-3 border border-slate-100 flex flex-col gap-3 relative">
                      <div className="flex items-start gap-3">
                        <div className="w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <Package size={24} className="text-slate-300" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
                          <h4 className="font-bold text-slate-800 text-[14px] leading-snug mb-1">{p.name}</h4>
                          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                            {p.category} • {p.weight}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => openEditProductModal(p)}
                        className="absolute top-4 right-4 text-cyan-600 bg-cyan-50 hover:bg-cyan-100 p-2 rounded-lg transition-colors border border-cyan-100 flex-shrink-0"
                      >
                        <Edit size={16} />
                      </button>
                      
                      <div className="flex justify-between items-center bg-[#f8fafc] rounded-xl p-3 mt-1 border border-slate-100 shadow-inner">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-medium uppercase mb-0.5">কেনার মূল্য</span>
                          <span className="text-sm font-bold text-slate-700">৳{cost}</span>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-medium uppercase mb-0.5">বিক্রির মূল্য</span>
                          <span className="text-sm font-bold text-slate-900">৳{sell}</span>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-500 font-medium uppercase mb-0.5">লাভ</span>
                          <span className={`text-sm font-black ${profit > 0 ? 'text-emerald-600' : profit < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                            {profit > 0 ? '+' : ''}৳{profit}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

"""
            
            content = content[:mobile_view_start] + new_mobile_view + content[mobile_view_end:]
            print("Successfully updated mobile view for product-prices")
            
            with open('src/pages/AdminDashboard.tsx', 'w') as f:
                f.write(content)
        else:
            print("Could not find end of mobile view")
    else:
        print("Could not find mobile view start")
else:
    print("Could not find product-prices tab")

