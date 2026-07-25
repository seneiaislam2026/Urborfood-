import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

old_table_pattern = re.compile(
    r'\{\/\* Desktop view: wide table \*\/\}\s*<div className="hidden md:block overflow-x-auto">.*?<\/table>\s*<\/div>',
    re.DOTALL
)

new_table = '''{/* Desktop view: wide table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm font-medium min-w-[1050px]">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider select-none text-left font-semibold">
                      <th className="py-4 px-4 pl-6">অর্ডার আইডি</th>
                      <th className="py-4 px-4">গ্রাহকের বিবরণ</th>
                      <th className="py-4 px-4">ডেলিভারি ঠিকানা</th>
                      <th className="py-4 px-4">ক্রয়কৃত আইটেম</th>
                      <th className="py-4 px-4">মূল্য</th>
                      <th className="py-4 px-4 text-center">স্ট্যাটাস</th>
                      <th className="py-4 px-4 pr-6 text-center">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 text-slate-700 bg-white">
                    {filteredOrdersList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-slate-500 font-medium">কোন সক্রিয় অর্ডার খুঁজে পাওয়া যায়নি।</td>
                      </tr>
                    ) : (
                      filteredOrdersList.map((order) => {
                        const isCompleted = order.status === 'Completed';
                        const isCancelled = order.status === 'Cancelled';
                        const isShipped = order.status === 'Shipped';
                        const isConfirmed = order.status === 'Confirmed';
                        const initials = order.customerName ? order.customerName.charAt(0) : 'গ';
                        return (
                          <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-4 pl-6 align-middle">
                              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 inline-block whitespace-nowrap">
                                #{order.id}
                              </span>
                            </td>
                            <td className="py-4 px-4 align-middle">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                                  {initials}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 text-xs md:text-sm leading-tight">{order.customerName || 'গ্রাহক'}</div>
                                  <div className="text-[11px] text-slate-500 font-mono tracking-wide mt-0.5">{order.phone}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 align-middle">
                              <div className="max-w-[200px] text-xs font-normal text-slate-600 leading-relaxed truncate" title={order.address}>
                                {order.address}
                              </div>
                            </td>
                            <td className="py-4 px-4 align-middle">
                              <div className="max-w-[220px]">
                                <p className="text-xs font-medium text-slate-700 line-clamp-2 leading-relaxed">
                                  {order.items.map(it => `${it.name} (${it.quantity}x)`).join(', ')}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-4 align-middle whitespace-nowrap">
                              <span className="text-sm font-extrabold text-slate-900">৳{order.total.toLocaleString('bn-BD')}</span>
                            </td>
                            <td className="py-4 px-4 align-middle text-center select-none whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                                isCompleted ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' :
                                isShipped ? 'bg-blue-50 text-blue-700 border border-blue-200/80' :
                                isConfirmed ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80' :
                                isCancelled ? 'bg-rose-50 text-rose-700 border border-rose-200/80' :
                                'bg-amber-50 text-amber-700 border border-amber-200/80'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  isCompleted ? 'bg-emerald-500' :
                                  isShipped ? 'bg-blue-500' :
                                  isConfirmed ? 'bg-indigo-500' :
                                  isCancelled ? 'bg-rose-500' :
                                  'bg-amber-500'
                                }`} />
                                {isCompleted ? 'সম্পন্ন' : isCancelled ? 'বাতিল' : isShipped ? 'হস্তান্তরিত' : isConfirmed ? 'প্রস্তুত' : 'পেন্ডিং'}
                              </span>
                            </td>
                            <td className="py-4 px-4 pr-6 align-middle text-center select-none">
                              <div className="flex items-center justify-center gap-1.5">
                                <button 
                                  onClick={() => setSelectedOrder(order)}
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                                  title="অর্ডার বিবরণ"
                                >
                                  <Eye size={13} /> বিবরণ
                                </button>
                                
                                {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                                  <button 
                                    onClick={() => setBookingOrder(order)}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap"
                                    title="কুরিয়ার বুকিং করুন"
                                  >
                                    <Truck size={13} /> বুকিং
                                  </button>
                                )}

                                <select 
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                  className="bg-white border border-slate-200 text-slate-800 rounded-lg px-2 py-1.5 text-xs font-semibold hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer transition-all"
                                >
                                  <option value="Pending">পেন্ডিং</option>
                                  <option value="Confirmed">পণ্য প্রস্তুত</option>
                                  <option value="Shipped">হস্তান্তরিত</option>
                                  <option value="Completed">সম্পন্ন</option>
                                  <option value="Cancelled">বাতিল</option>
                                </select>
                                
                                <button 
                                  onClick={() => { if(confirm('অর্ডার রেকর্ডটি মুছে ফেলতে চান?')) deleteOrder(order.id); }}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="অর্ডার ডিলিট"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>'''

new_content, count = old_table_pattern.subn(new_table, content, count=1)
if count > 0:
    with open('src/pages/AdminDashboard.tsx', 'w') as f:
        f.write(new_content)
    print("Successfully updated desktop orders table!")
else:
    print("Pattern not matched.")
