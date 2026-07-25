import sys

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

target = """                  <div className="divide-y divide-slate-100">
                    {courierOrders.map((o) => {
                      const courierName = 'Steadfast Courier';
                      const trackingId = o.status === 'Shipped' ? 'STEADFAST-BOOKED' : '';

                      return (
                        <div key={o.id} className="p-4 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Order Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="font-bold text-slate-800 text-sm">#{o.id}</span>
                              <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100`}>
                                Steadfast
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-700 text-sm">{o.customerName}</h4>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{o.address}</p>
                            <p className="text-xs font-semibold text-slate-600 mt-0.5">{o.phone}</p>
                          </div>
                          
                          {/* Status and Action */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0 shrink-0 min-w-[140px]">
                            <div className="text-left sm:text-right">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold mb-1.5 ${
                                o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                o.status === 'Shipped' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                                'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {o.status === 'Pending' ? 'পেন্ডিং' : o.status === 'Completed' ? 'ডেলিভার্ড' : 'ইন ট্রানজিট 🚚'}
                              </span>
                              {o.status !== 'Pending' && (
                                <p className="text-[11px] font-medium text-slate-500">{trackingId}</p>
                              )}
                            </div>
                            
                            {o.status === 'Pending' ? (
                              <button
                                onClick={async () => {
                                  setLoadingBookings(prev => ({...prev, [o.id]: true}));
                                  try {
                                    const res = await fetch('/api/steadfast/create_order', {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Api-Key': 'sjg2zq4pzai6isaaolupaf1iaily32vk',
                                        'Secret-Key': 'd7od4knpcjhxycnnlmk3oe9r'
                                      },
                                      body: JSON.stringify({
                                        invoice: o.id,
                                        recipient_name: o.customerName,
                                        recipient_phone: o.phone,
                                        recipient_address: o.address,
                                        cod_amount: o.total
                                      })
                                    });
                                    const data = await res.json();
                                    if (data.status === 200) {
                                      updateOrderStatus(o.id, 'Shipped');
                                      addNotification('কুরিয়ারে বুক করা হয়েছে 🚚', `অর্ডার #${o.id} সফলভাবে Steadfast কুরিয়ারে বুক করা হয়েছে। ট্র্যাকিং আইডি: ${data.consignment.tracking_code}`);
                                    } else {
                                      alert('Error: ' + (data.message || 'Failed to create consignment'));
                                    }
                                  } catch (error) {
                                    console.error(error);
                                    alert('Error connecting to Courier API');
                                  } finally {
                                    setLoadingBookings(prev => ({...prev, [o.id]: false}));
                                  }
                                }}
                                disabled={loadingBookings[o.id]}
                                className="bg-[#0b3d18] hover:bg-[#0a3114] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {loadingBookings[o.id] ? 'বুকিং হচ্ছে...' : 'বুকিং করুন'}
                              </button>
                            ) : (
                              <span className="text-slate-400 font-bold text-xs px-2 py-1">বুকড</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>"""

replacement = """                  <div className="space-y-4 pt-2 pb-4">
                    {courierOrders.map((o) => {
                      const courierName = 'Steadfast Courier';
                      const trackingId = o.status === 'Shipped' ? 'STEADFAST-BOOKED' : '';

                      return (
                        <div key={o.id} className="group relative bg-white border border-slate-200 hover:border-[#0b3d18]/30 rounded-2xl p-5 shadow-sm hover:shadow-md hover:shadow-[#0b3d18]/5 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-5 overflow-hidden">
                          {/* Accent line on hover */}
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0b3d18] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Order Info */}
                          <div className="flex-1 pl-1">
                            <div className="flex items-center gap-3 mb-2.5">
                              <span className="font-bold text-slate-800 text-[15px]">#{o.id}</span>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                <Truck size={10} className="text-indigo-500" />
                                Steadfast
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-800 text-[15px] mb-1.5 flex items-center gap-2">
                              <User size={14} className="text-slate-400" />
                              {o.customerName}
                            </h4>
                            <p className="text-[12.5px] text-slate-600 leading-relaxed flex items-start gap-2 mb-1.5">
                              <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                              {o.address}
                            </p>
                            <p className="text-[12.5px] font-semibold text-slate-700 flex items-center gap-2">
                              <Phone size={14} className="text-slate-400" />
                              {o.phone}
                            </p>
                          </div>
                          
                          {/* Status and Action */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3.5 border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0 shrink-0 min-w-[140px]">
                            <div className="text-left sm:text-right">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold mb-1.5 ${
                                o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                o.status === 'Shipped' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                                'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm'
                              }`}>
                                {o.status === 'Pending' ? (
                                  <><Clock size={12} /> পেন্ডিং</>
                                ) : o.status === 'Completed' ? (
                                  <><CheckCircle size={12} /> ডেলিভার্ড</>
                                ) : (
                                  <><Truck size={12} /> ইন ট্রানজিট</>
                                )}
                              </span>
                              {o.status !== 'Pending' && (
                                <div className="mt-1">
                                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md inline-block border border-indigo-100">{trackingId}</span>
                                </div>
                              )}
                            </div>
                            
                            {o.status === 'Pending' ? (
                              <button
                                onClick={async () => {
                                  setLoadingBookings(prev => ({...prev, [o.id]: true}));
                                  try {
                                    const res = await fetch('/api/steadfast/create_order', {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Api-Key': 'sjg2zq4pzai6isaaolupaf1iaily32vk',
                                        'Secret-Key': 'd7od4knpcjhxycnnlmk3oe9r'
                                      },
                                      body: JSON.stringify({
                                        invoice: o.id,
                                        recipient_name: o.customerName,
                                        recipient_phone: o.phone,
                                        recipient_address: o.address,
                                        cod_amount: o.total
                                      })
                                    });
                                    const data = await res.json();
                                    if (data.status === 200) {
                                      updateOrderStatus(o.id, 'Shipped');
                                      addNotification('কুরিয়ারে বুক করা হয়েছে 🚚', `অর্ডার #${o.id} সফলভাবে Steadfast কুরিয়ারে বুক করা হয়েছে। ট্র্যাকিং আইডি: ${data.consignment.tracking_code}`);
                                    } else {
                                      alert('Error: ' + (data.message || 'Failed to create consignment'));
                                    }
                                  } catch (error) {
                                    console.error(error);
                                    alert('Error connecting to Courier API');
                                  } finally {
                                    setLoadingBookings(prev => ({...prev, [o.id]: false}));
                                  }
                                }}
                                disabled={loadingBookings[o.id]}
                                className="bg-[#0b3d18] hover:bg-[#0a3114] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm shadow-[#0b3d18]/20 hover:shadow-[#0b3d18]/40 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 w-full sm:w-auto"
                              >
                                {loadingBookings[o.id] ? (
                                  <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> বুকিং হচ্ছে...</>
                                ) : (
                                  <><Send size={14} /> বুকিং করুন</>
                                )}
                              </button>
                            ) : (
                              <button className="bg-slate-50 text-slate-400 border border-slate-200 text-xs font-bold py-2.5 px-5 rounded-xl cursor-not-allowed flex items-center justify-center gap-1.5 w-full sm:w-auto">
                                <Check size={14} /> বুক করা হয়েছে
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/pages/AdminDashboard.tsx', 'w') as f:
        f.write(content)
    print("Updated courier orders UI")
else:
    print("Target not found.")

