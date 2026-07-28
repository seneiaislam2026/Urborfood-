import { toBanglaNumber } from "../../utils/banglaHelpers";
import React, { useState } from 'react';
import { X, Search, Package, MapPin, AlertCircle, ShoppingBag, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';

export default function MyOrdersModal() {
  const { isMyOrdersOpen, setIsMyOrdersOpen } = useUI();
  const { orders } = useCart();
  const [phone, setPhone] = useState('');
  const [searched, setSearched] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);

  if (!isMyOrdersOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setSearched(true);
    const cleanPhone = phone.replace(/[\s-]/g, '');
    
    // Find all orders that match the phone number
    const found = orders.filter(o => o.phone.replace(/[\s-]/g, '') === cleanPhone);
    // Sort by date descending
    found.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setUserOrders(found);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-10">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsMyOrdersOpen(false)}
      />

      {/* Modal Container */}
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl flex flex-col relative z-10 animate-in zoom-in-95 duration-300 shadow-2xl overflow-hidden max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between gap-4 shrink-0 bg-emerald-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100/50 rounded-xl flex items-center justify-center text-emerald-600 font-bold border border-emerald-200">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight leading-tight">
                আমার অর্ডার সমূহ
              </h2>
              <p className="text-xs text-slate-500 font-bold mt-1">
                মোবাইল নম্বর দিয়ে আপনার পূর্বের সকল অর্ডার খুঁজুন
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsMyOrdersOpen(false)}
            className="w-10 h-10 bg-white shadow-sm ring-1 ring-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar container */}
        <div className="p-5 border-b border-gray-50 bg-slate-50/40 shrink-0">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="আপনার মোবাইল নম্বর দিন (যেমন: 01712345678)" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-emerald-600 font-bold text-gray-800 shadow-sm transition-all"
              />
              <Search size={16} className="absolute left-3.5 top-4 text-slate-400" />
            </div>
            <button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 rounded-2xl text-sm font-black tracking-wide shadow-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              খুঁজুন
            </button>
          </form>
        </div>

        {/* Result Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50/50">
          {!searched ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 border border-emerald-100 animate-bounce">
                <ShoppingBag size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-black text-slate-700">আপনার মোবাইল নম্বর দিন</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs font-bold leading-normal">
                নম্বর দিয়ে সার্চ করলে আপনার করা সকল অর্ডারের তালিকা দেখতে পাবেন।
              </p>
            </div>
          ) : userOrders.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-black text-slate-700">সর্বমোট {userOrders.length}টি অর্ডার পাওয়া গেছে</h3>
              </div>
              
              {userOrders.map((order, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">অর্ডার নম্বর</div>
                      <div className="text-sm font-black text-emerald-700">{order.id}</div>
                      <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1 mt-1">
                        <Calendar size={10} /> {new Date(order.date).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black ${
                        order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        order.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {order.status === 'Completed' && <CheckCircle size={10} />}
                        {order.status === 'Cancelled' && <AlertTriangle size={10} />}
                        {order.status !== 'Completed' && order.status !== 'Cancelled' && <Package size={10} />}
                        
                        {order.status === 'Completed' ? 'ডেলিভার্ড' :
                         order.status === 'Cancelled' ? 'বাতিল' :
                         order.status === 'Shipped' ? 'শিপমেন্ট হয়েছে' : 'পেন্ডিং'}
                      </div>
                      <div className="text-sm font-black text-slate-800 mt-2">&nbsp;৳{toBanglaNumber(order.total)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 font-bold">{item.name} <span className="text-slate-400 text-[10px]">x{item.quantity}</span></span>
                        <span className="text-slate-700 font-black">&nbsp;৳{toBanglaNumber(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertCircle size={28} />
              </div>
              <h3 className="text-sm font-black text-slate-700 mb-1">কোনো অর্ডার পাওয়া যায়নি</h3>
              <p className="text-xs text-slate-400 font-bold max-w-xs mx-auto">
                দুঃখিত, এই নম্বর দিয়ে কোনো অর্ডার রেকর্ড পাওয়া যায়নি। সঠিক নম্বর টাইপ করেছেন কিনা যাচাই করুন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
