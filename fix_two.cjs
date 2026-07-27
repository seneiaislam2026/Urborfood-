const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf-8');

code = code.replace(
  /className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold outline-none bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900\/10 text-slate-800 transition-colors"/g,
  `className="w-full px-4 py-3 leading-relaxed rounded-xl border border-slate-200 text-sm font-semibold outline-none bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 text-slate-800 transition-colors"`
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
console.log("Done fixing two");
