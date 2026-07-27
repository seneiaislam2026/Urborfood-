const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

// Move columns order on mobile
code = code.replace(
  /<div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-8 flex flex-col min-w-0 overflow-hidden">/g,
  `<div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-8 flex flex-col min-w-0 overflow-hidden order-2 lg:order-1">`
);

code = code.replace(
  /<div className="lg:col-span-4 space-y-6">/g,
  `<div className="lg:col-span-4 space-y-6 order-1 lg:order-2">`
);

// Replace select with input
const selectRegex = /<select value=\{txCategory\}.*?<\/select>/s;
code = code.replace(
  selectRegex,
  `<input type="text" value={txCategory} onChange={(e) => setTxCategory(e.target.value)} placeholder={txType === 'income' ? 'যেমন: পণ্য বিক্রি, বিনিয়োগ' : 'যেমন: কাঁচামাল কেনা, ডেলিভারি চার্জ'} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 text-slate-800 transition-colors" required />`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Fixed finances form");
