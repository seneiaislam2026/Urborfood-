const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /\{\s*label: 'মোট বিক্রি', value: \`৳\$\{totalSales\.toLocaleString\('bn-BD'\)\}\`, countDesc: 'টাকা', colorBase: 'emerald', icon: BarChart3\s*\},/g,
  `{ label: 'মোট বিক্রি', value: \`৳\${totalSales.toLocaleString('bn-BD')}\`, countDesc: 'টাকা', colorBase: 'emerald', icon: BarChart3, onClick: () => setActiveTab('orders') },`
);

code = code.replace(
  /\{\s*label: 'নতুন অর্ডার', value: pendingOrdersCount\.toLocaleString\('bn-BD'\), countDesc: 'টি পেন্ডিং', colorBase: 'orange', icon: ShoppingBag\s*\},/g,
  `{ label: 'নতুন অর্ডার', value: pendingOrdersCount.toLocaleString('bn-BD'), countDesc: 'টি পেন্ডিং', colorBase: 'orange', icon: ShoppingBag, onClick: () => setActiveTab('orders') },`
);

code = code.replace(
  /\{\s*label: 'মোট পণ্য', value: products\.length\.toLocaleString\('bn-BD'\), countDesc: 'টি লাইভ', colorBase: 'blue', icon: Package\s*\},/g,
  `{ label: 'মোট পণ্য', value: products.length.toLocaleString('bn-BD'), countDesc: 'টি লাইভ', colorBase: 'blue', icon: Package, onClick: () => setActiveTab('product-prices') },`
);

code = code.replace(
  /\{\s*label: 'মোট কাস্টমার', value: totalCustomersCount\.toLocaleString\('bn-BD'\), countDesc: 'জন নিবন্ধিত', colorBase: 'purple', icon: Users\s*\},/g,
  `{ label: 'মোট কাস্টমার', value: totalCustomersCount.toLocaleString('bn-BD'), countDesc: 'জন নিবন্ধিত', colorBase: 'purple', icon: Users, onClick: () => setActiveTab('customers') },`
);

code = code.replace(
  /<div key=\{i\} className="bg-white rounded-\[16px\] p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500\/30 transition-all duration-300 flex items-center justify-between group">/g,
  `<div key={i} onClick={stat.onClick} className="bg-white rounded-[16px] p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-between group cursor-pointer">`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing stats grid click");
