const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// 1. Remove emojis
content = content.replace("createOrder: 'অর্ডার তৈরি করুন ➕'", "createOrder: 'অর্ডার তৈরি করুন'");
content = content.replace("inventoryControl: 'ইনভেন্টরি কন্ট্রোল 📦'", "inventoryControl: 'ইনভেন্টরি কন্ট্রোল'");
content = content.replace("courierDashboard: 'কুরিয়ার ড্যাশবোর্ড 🚚'", "courierDashboard: 'কুরিয়ার ড্যাশবোর্ড'");
content = content.replace("landingPage: 'ল্যান্ডিং পেইজ 🌐'", "landingPage: 'ল্যান্ডিং পেইজ'");

// 2. Change active tab styling to be more elegant (soft green)
// Desktop
content = content.replace(
  /'bg-slate-900 text-white font-medium shadow-sm'/g,
  "'bg-emerald-50 text-emerald-700 font-bold shadow-sm border border-emerald-100/50'"
);

// We need to fix the hardcoded icon colors in active tabs so they look good on emerald-50 or inherit.
// Let's remove the hardcoded text-emerald-600 when active.
// In the mobile and desktop sidebar we have things like:
// <PlusCircle size={18} className={activeTab === 'create-order' ? 'text-emerald-600' : 'text-emerald-500'} />
// We can change that to 'text-emerald-600' for active, which is fine on emerald-50!
// <Truck size={18} className={activeTab === 'courier' ? 'text-emerald-600' : 'text-sky-500'} />
// That is also fine on emerald-50.

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
console.log("Done");
