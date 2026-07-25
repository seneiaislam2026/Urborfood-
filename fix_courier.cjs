const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');
content = content.replace(
`                {/* Orders to Book Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden overflow-hidden">
                  <div className="p-5 border-b border-slate-200 bg-[#f8fafc]/30">
                    <h3 className="font-semibold text-[13px] text-slate-800">কুরিয়ারের জন্য বুকিং যোগ্য পার্সেল সমূহ</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-medium min-w-[700px]">
                      <thead>
                        <tr className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
                          <th className="p-4 pl-6">অর্ডার আইডি & কাস্টমার</th>
                          <th className="p-4">ঠিকানা & ফোন</th>
                          <th className="p-4 text-center">কুরিয়ার পার্টনার</th>
                          <th className="p-4 text-center">ট্র্যাকিং আইডি</th>
                          <th className="p-4 text-center">শিপিং স্ট্যাটাস</th>
                          <th className="p-4 text-center">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 text-slate-700">
                        {courierOrders.map((o) => {
                          // Generate simulated values so that it stays populated
                          const courierName = o.id.charCodeAt(0) % 3 === 0 ? 'Pathao Courier' : o.id.charCodeAt(0) % 3 === 1 ? 'RedX' : 'Steadfast';
                          const trackingId = \`TRK-\${o.id.replace('ord-', '').replace('ORD-', '')}-\${100 + o.id.charCodeAt(0)}\`;

                          return (
                            <tr key={o.id} className="hover:bg-[#f8fafc]/40 transition-colors">
                              <td className="p-4 pl-6">
                                <span className="block text-slate-500 font-mono font-bold">#{o.id}</span>
                                <span className="block text-slate-800 font-bold text-[12px]">{o.customerName}</span>
                              </td>
                              <td className="p-4">
                                <div className="text-slate-600 font-medium max-w-[200px] truncate" title={o.address}>{o.address}</div>
                                <div className="text-[10px] text-slate-500 font-medium">{o.phone}</div>
                              </td>
                              <td className="p-4 text-center">
                                <span className={\`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold \${
                                  courierName === 'Pathao Courier' ? 'bg-orange-50 text-orange-900' :
                                  courierName === 'RedX' ? 'bg-red-50 text-red-800' : 'bg-sky-50 text-sky-700'
                                }\`}>
                                  {courierName}
                                </span>
                              </td>
                              <td className="p-4 text-center text-slate-600 font-mono">
                                {o.status === 'Pending' ? (
                                  <span className="text-slate-500">Not Booked</span>
                                ) : (
                                  trackingId
                                )}
                              </td>
                              <td className="p-4 text-center">
                                <span className={\`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold \${
                                  o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50' :
                                  o.status === 'Shipped' ? 'bg-sky-50 text-sky-700 border border-sky-100/50' :
                                  'bg-amber-50 text-amber-700 border border-amber-100/50'
                                }\`}>
                                  {o.status === 'Pending' ? 'পেন্ডিং' : o.status === 'Completed' ? 'ডেলিভার্ড' : 'ইন ট্রানজিট 🚚'}
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                {o.status === 'Pending' ? (
                                  <button
                                    onClick={() => {
                                      updateOrderStatus(o.id, 'Shipped');
                                      addNotification('কুরিয়ারে বুক করা হয়েছে 🚚', \`অর্ডার #\${o.id} সফলভাবে \${courierName} কুরিয়ারে বুক করা হয়েছে। ট্র্যাকিং আইডি: \${trackingId}\`);
                                    }}
                                    className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm font-semibold text-[10px] px-2.5 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
                                  >
                                    বুকিং সম্পন্ন করুন
                                  </button>
                                ) : (
                                  <span className="text-slate-400 font-medium text-[11px]">Closed</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>`,
`                {/* Orders to Book List (Responsive) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 sm:p-5 border-b border-slate-200 bg-[#f8fafc]/50">
                    <h3 className="font-bold text-sm text-slate-800">কুরিয়ারের জন্য বুকিং যোগ্য পার্সেল সমূহ</h3>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {courierOrders.map((o) => {
                      const courierName = o.id.charCodeAt(0) % 3 === 0 ? 'Pathao Courier' : o.id.charCodeAt(0) % 3 === 1 ? 'RedX' : 'Steadfast';
                      const trackingId = \`TRK-\${o.id.replace('ord-', '').replace('ORD-', '')}-\${100 + o.id.charCodeAt(0)}\`;

                      return (
                        <div key={o.id} className="p-4 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Order Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="font-bold text-slate-800 text-sm">#{o.id}</span>
                              <span className={\`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold \${
                                courierName === 'Pathao Courier' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                                courierName === 'RedX' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-sky-50 text-sky-700 border border-sky-100'
                              }\`}>
                                {courierName}
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-700 text-sm">{o.customerName}</h4>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{o.address}</p>
                            <p className="text-xs font-semibold text-slate-600 mt-0.5">{o.phone}</p>
                          </div>
                          
                          {/* Status and Action */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 shrink-0 min-w-[140px]">
                            <div className="text-left sm:text-right">
                              <span className={\`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold mb-1.5 \${
                                o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                o.status === 'Shipped' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                                'bg-amber-50 text-amber-700 border border-amber-200'
                              }\`}>
                                {o.status === 'Pending' ? 'পেন্ডিং' : o.status === 'Completed' ? 'ডেলিভার্ড' : 'ইন ট্রানজিট 🚚'}
                              </span>
                              {o.status !== 'Pending' && (
                                <p className="text-[11px] font-mono font-medium text-slate-500">{trackingId}</p>
                              )}
                            </div>
                            
                            {o.status === 'Pending' ? (
                              <button
                                onClick={() => {
                                  updateOrderStatus(o.id, 'Shipped');
                                  addNotification('কুরিয়ারে বুক করা হয়েছে 🚚', \`অর্ডার #\${o.id} সফলভাবে \${courierName} কুরিয়ারে বুক করা হয়েছে। ট্র্যাকিং আইডি: \${trackingId}\`);
                                }}
                                className="bg-[#0b3d18] hover:bg-[#0a3114] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-95 whitespace-nowrap shadow-sm"
                              >
                                বুকিং করুন
                              </button>
                            ) : (
                              <span className="text-slate-400 font-bold text-xs px-2 py-1">বুকড</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>`
);
fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
