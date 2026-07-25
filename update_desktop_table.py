import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# Replace Desktop view: wide table section
pattern = re.compile(
    r'\{\/\* Desktop view: wide table \*\/\}\s*<div className="hidden md:block overflow-x-auto">.*?<\/table>\s*<\/div>',
    re.DOTALL
)

new_desktop_table = '''{/* Desktop view: Sleek 1-Screen Responsive Table */}
              <div className="hidden md:block w-full overflow-hidden">
                <table className="w-full text-left border-collapse text-xs font-medium table-fixed">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider select-none text-left font-semibold">
                      <th className="py-3.5 px-3 pl-4 w-[10%]">আইডি</th>
                      <th className="py-3.5 px-3 w-[18%]">গ্রাহক</th>
                      <th className="py-3.5 px-3 w-[22%]">ঠিকানা</th>
                      <th className="py-3.5 px-3 w-[22%]">আইটেম</th>
                      <th className="py-3.5 px-3 w-[10%]">মূল্য</th>
                      <th className="py-3.5 px-3 w-[10%] text-center">স্ট্যাটাস</th>
                      <th className="py-3.5 px-3 pr-4 w-[8%] text-center">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                    {filteredOrdersList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-10 text-center text-slate-400 font-medium">কোন সক্রিয় অর্ডার খুঁজে পাওয়া যায়নি।</td>
                      </tr>
                    ) : (
                      filteredOrdersList.map((order) => {
                        const isCompleted = order.status === 'Completed';
                        const isCancelled = order.status === 'Cancelled';
                        const isShipped = order.status === 'Shipped';
                        const isConfirmed = order.status === 'Confirmed';
                        const itemsSummary = order.items.map(it => `${it.name} (${it.quantity}x)`).join(', ');

                        return (
                          <tr key={order.id} className="hover:bg-slate-50/80 transition-colors h-14">
                            {/* Order ID */}
                            <td className="py-2.5 px-3 pl-4 align-middle">
                              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200/80 inline-block whitespace-nowrap">
                                #{order.id}
                              </span>
                            </td>

                            {/* Customer Info */}
                            <td className="py-2.5 px-3 align-middle">
                              <div className="min-w-0 pr-2">
                                <div className="font-bold text-slate-900 text-xs truncate" title={order.customerName}>
                                  {order.customerName || 'গ্রাহক'}
                                </div>
                                <div className="text-[11px] text-slate-500 font-mono tracking-wide mt-0.5 truncate">
                                  {order.phone}
                                </div>
                              </div>
                            </td>

                            {/* Delivery Address */}
                            <td className="py-2.5 px-3 align-middle">
                              <div className="text-xs text-slate-600 truncate pr-2 font-normal" title={order.address}>
                                {order.address || 'ঠিকানা দেওয়া হয়নি'}
                              </div>
                            </td>

                            {/* Ordered Items */}
                            <td className="py-2.5 px-3 align-middle">
                              <div className="text-xs text-slate-700 font-medium truncate pr-2" title={itemsSummary}>
                                {itemsSummary}
                              </div>
                            </td>

                            {/* Price */}
                            <td className="py-2.5 px-3 align-middle whitespace-nowrap">
                              <span className="text-xs font-bold text-slate-900">৳{order.total.toLocaleString('bn-BD')}</span>
                            </td>

                            {/* Status Selector */}
                            <td className="py-2.5 px-3 align-middle text-center select-none">
                              <select 
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                className={`px-2 py-1 rounded-full text-[11px] font-bold border cursor-pointer focus:outline-none transition-all text-center ${
                                  isCompleted ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                  isShipped ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                  isConfirmed ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                                  isCancelled ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                  'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                              >
                                <option value="Pending">পেন্ডিং</option>
                                <option value="Confirmed">প্রস্তুত</option>
                                <option value="Shipped">হস্তান্তরিত</option>
                                <option value="Completed">সম্পন্ন</option>
                                <option value="Cancelled">বাতিল</option>
                              </select>
                            </td>

                            {/* Quick Icon Actions */}
                            <td className="py-2.5 px-3 pr-4 align-middle text-center select-none">
                              <div className="flex items-center justify-center gap-1">
                                <button 
                                  onClick={() => setSelectedOrder(order)}
                                  className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100 cursor-pointer"
                                  title="অর্ডার বিবরণ দেখুন"
                                >
                                  <Eye size={14} />
                                </button>
                                
                                {!isCompleted && !isCancelled && (
                                  <button 
                                    onClick={() => setBookingOrder(order)}
                                    className="p-1.5 text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-all cursor-pointer"
                                    title="কুরিয়ার বুকিং করুন"
                                  >
                                    <Truck size={14} />
                                  </button>
                                )}

                                <button 
                                  onClick={() => { if(confirm('অর্ডার রেকর্ডটি মুছে ফেলতে চান?')) deleteOrder(order.id); }}
                                  className="p-1.5 text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer border border-rose-100"
                                  title="অর্ডার ডিলিট করুন"
                                >
                                  <Trash2 size={14} />
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

new_content, count = pattern.subn(new_desktop_table, content, count=1)
if count > 0:
    with open('src/pages/AdminDashboard.tsx', 'w') as f:
        f.write(new_content)
    print("Desktop orders table updated successfully!")
else:
    print("Pattern match failed!")
