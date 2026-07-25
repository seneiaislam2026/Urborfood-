import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === \'Completed\' ? \'bg-emerald-100 text-emerald-700\' : order.status === \'Cancelled\' ? \'bg-rose-100 text-rose-700\' : order.status === \'Shipped\' ? \'bg-indigo-100 text-indigo-700\' : order.status === \'Confirmed\' ? \'bg-blue-100 text-blue-700\' : \'bg-amber-100 text-amber-700\'}`}>\n                            {order.status === \'Completed\' ? \'ডেলিভারি সম্পন্ন\' : order.status === \'Cancelled\' ? \'বাতিল\' : order.status === \'Shipped\' ? \'ডেলিভারি পার্টনারের কাছে হস্তান্তরিত\' : order.status === \'Confirmed\' ? \'পণ্য প্রস্তুত করা হচ্ছে\' : \'পেন্ডিং\'}\n                          </span>', '<span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === \'Completed\' ? \'bg-emerald-100 text-emerald-700\' : order.status === \'Cancelled\' ? \'bg-rose-100 text-rose-700\' : order.status === \'Shipped\' ? \'bg-indigo-100 text-indigo-700\' : order.status === \'Confirmed\' ? \'bg-blue-100 text-blue-700\' : \'bg-amber-100 text-amber-700\'}`}>\n                            {order.status === \'Completed\' ? \'ডেলিভারি সম্পন্ন\' : order.status === \'Cancelled\' ? \'বাতিল\' : order.status === \'Shipped\' ? \'ডেলিভারি পার্টনারের কাছে হস্তান্তরিত\' : order.status === \'Confirmed\' ? \'পণ্য প্রস্তুত করা হচ্ছে\' : \'পেন্ডিং\'}</span>')

content = content.replace('<span className="text-[16px] font-black text-slate-900 whitespace-nowrap">&nbsp;৳{order.total}\n', '<span className="text-[16px] font-black text-slate-900 whitespace-nowrap">&nbsp;৳{order.total}</span>\n')
# Also line 2326 might have been:
# `<span className="font-bold text-slate-900">#{order.id}`
content = content.replace('<span className="font-bold text-slate-900">#{order.id}\n', '<span className="font-bold text-slate-900">#{order.id}</span>\n')

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
