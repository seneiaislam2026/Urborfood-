const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// The mobile list is marked by:
const mobileOrdersStart = "{/* Mobile responsive view: beautiful stacked bento-list - NO horizontal scroll */}";
const mobileOrdersEnd = "</div>\n                </div>";

const newMobileOrders = `{/* Mobile responsive view: Sleek Modern Transaction Feed */}
                  <div className="block md:hidden p-4 space-y-3 bg-[#f8fafc]/40">
                    {orders.length === 0 ? (
                      <div className="p-10 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200/80">কোন অর্ডার রেকর্ড নেই।</div>
                    ) : (
                      orders.slice(0, 4).map((order) => {
                        const isCompleted = order.status === 'Completed';
                        const isCancelled = order.status === 'Cancelled';
                        const initials = order.customerName ? order.customerName.substring(0, 2) : 'গ্র';
                        
                        return (
                          <div 
                            key={order.id} 
                            onClick={() => setSelectedOrder(order)}
                            className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-3 relative cursor-pointer group active:scale-[0.98]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={\`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-inner \${
                                isCompleted ? 'bg-emerald-50 text-emerald-600' : 
                                isCancelled ? 'bg-rose-50 text-rose-600' : 
                                'bg-orange-50 text-orange-600'
                              }\`}>
                                {initials}
                              </div>
                              
                              <div className="min-w-0 flex flex-col justify-center">
                                <h4 className="text-slate-800 font-bold text-sm truncate group-hover:text-emerald-600 transition-colors">{order.customerName}</h4>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[10px] font-mono text-slate-400 font-bold bg-slate-50 px-1.5 rounded">#{order.id}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                  <span className="text-[10px] text-slate-500 font-medium truncate max-w-[130px]">
                                    {order.items.map(it => it.name).join(', ')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end justify-center gap-1 shrink-0">
                              <span className="text-slate-900 font-black text-sm">৳{Number(order.total).toLocaleString('bn-BD')}</span>
                              <span className={\`px-2 py-0.5 rounded-md text-[9px] font-bold \${
                                isCompleted ? 'bg-emerald-50 text-emerald-700' : 
                                isCancelled ? 'bg-rose-50 text-rose-700' : 
                                'bg-orange-50 text-orange-700'
                              }\`}>
                                {isCompleted ? 'সম্পন্ন' : isCancelled ? 'বাতিল' : 'পেন্ডিং'}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>`;

const startIndex = content.indexOf(mobileOrdersStart);
const endIndex = content.indexOf(mobileOrdersEnd, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newMobileOrders + content.substring(endIndex + 29); // 29 is the length of "</div>\n                </div>"
} else {
  console.log("Could not find mobile orders bounds.");
}

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done redesigning mobile orders.");
